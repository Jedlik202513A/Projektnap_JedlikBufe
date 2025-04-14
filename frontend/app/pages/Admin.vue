<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import OrderList from '../components/OrderList.vue';
import OrderAlert from '../components/OrderAlert.vue';
import { useOrderApi } from '~/composables/useOrderApi';
import type { Order } from '~/types/Order';

// Use the API composable
const { getAllOrders, createOrder, confirmOrder, markOrderReady } = useOrderApi();

// Reactive ref for orders
const orders = ref([]);

// Order alert state
const showAlert = ref(false);
const newOrder = ref(null);

// Load orders from API
const loadOrders = async () => {
  try {
    const apiOrders = await getAllOrders();
    // Map API orders to the format expected by the component
    orders.value = apiOrders.map(order => ({
      id: order._id || order.id, // Use _id from MongoDB response
      customer: `Order #${order.orderNumber}`, // Use order number as customer name
      items: order.items.map(item => item.name), // Extract item names
      totalPrice: order.sumPrice,
      status: typeof order.status === 'string' ? mapApiStatusToUiStatus(order.status) : mapStatusNumberToString(order.status),
      timestamp: new Date().toISOString(), // Assuming the API doesn't provide timestamp
      originalStatus: order.status // Keep the original API status for reference
    }));
  } catch (error) {
    console.error('Failed to load orders:', error);
  }
};

// Map API string status to UI status
const mapApiStatusToUiStatus = (apiStatus: string): string => {
  switch(apiStatus) {
    case 'In progress': return 'pending';
    case 'Confirmed': return 'Confirmed';
    case 'Ready': return 'ready';
    default: return 'pending';
  }
};

// Convert API status number to string status (legacy support)
const mapStatusNumberToString = (statusNumber: number): string => {
  switch(statusNumber) {
    case 0: return 'pending';
    case 1: return 'Confirmed';
    case 2: return 'ready';
    default: return 'pending';
  }
};

// Function to update order status
const updateOrderStatus = async (orderId: number | string, newStatus: string) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    try {
      // Different API calls based on target status
      if (newStatus === 'Confirmed') {
        // Call the API to confirm the order (from pending/In progress to Confirmed)
        await confirmOrder(orderId.toString());
      } else if (newStatus === 'ready') {
        // Call the API to mark the order as ready (from Confirmed to Ready)
        await markOrderReady(orderId.toString());
      }
      
      // Update local status after successful API call
      order.status = newStatus;
      
      // Refresh orders after a status change to ensure consistency
      setTimeout(() => loadOrders(), 1000);
      
    } catch (error) {
      console.error(`Failed to update order ${orderId} status to ${newStatus}:`, error);
      // Optionally show an error notification to the user
    }
  }
};

// Function to handle order pickup
const handleOrderPickup = async (orderId: number | string) => {
  const orderIndex = orders.value.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    orders.value.splice(orderIndex, 1);
    // Here you would call an API endpoint to mark the order as picked up/completed
    // Example: await completeOrder(orderId);
  }
};

// Handle alert close
const handleAlertClose = () => {
  showAlert.value = false;
};

onMounted(() => {
  // Load orders when component mounts
  loadOrders();
  
  // Optional: Set up polling to refresh orders periodically
  const interval = setInterval(() => {
    loadOrders();
  }, 30000); // Refresh every 30 seconds
  
  // Clean up interval on component unmount
  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});

// Use status columns that match our mapped statuses
const statusColumns = ['pending', 'Confirmed'];
</script>

<template>
    <div class="text-black text-center font-bold"><h1 class="text-2xl">Rendelések:</h1></div>
    <div class="p-4 sm:p-6 max-w-7xl mx-auto bg-white">
        <!-- Pass order as an object, not a ref -->
        <OrderAlert 
          :show="showAlert" 
          :order="newOrder" 
          :duration="5000"
          @close="handleAlertClose"
        />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
                v-for="status in statusColumns" 
                :key="status" 
                class="bg-[#FBEBD0] p-4 rounded-lg status-column"
                :data-status="status"
            >
                <h2 class="text-lg font-semibold mb-3 capitalize text-[#57390F]">{{ status }}</h2>
                <OrderList 
                    :orders="orders.filter(order => order.status === status)" 
                    :targetStatus="status"
                    :allStatuses="statusColumns"
                    @update-status="updateOrderStatus"
                    @order-pickup="handleOrderPickup"
                    class="order-list"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.status-column {
  transition: background-color 0.2s ease;
}

.status-column[data-status="pending"] {
  border-left: 4px solid #FCD34D;
}

.status-column[data-status="Confirmed"] {
  border-left: 4px solid #6EE7B7;
}

.order-list :deep(.order-item) {
  background-color: #57390F;
  color: white;
}

@media (max-width: 768px) {
  .status-column {
    margin-bottom: 1rem;
  }
}
</style>
