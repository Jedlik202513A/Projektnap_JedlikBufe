<script setup lang="ts">
import { ref, onMounted } from 'vue';
import OrderList from '../components/OrderList.vue';
import OrderAlert from '../components/OrderAlert.vue';

// Mock data for orders - updated to use only Pending and Ready statuses
const orders = ref([
  {
    id: 1,
    customer: 'John Doe',
    items: ['Hamburger', 'Fries', 'Cola'],
    totalPrice: 1890,
    status: 'pending',
    timestamp: '2023-05-15T10:30:00'
  },
  {
    id: 2,
    customer: 'Jane Smith',
    items: ['Chicken Sandwich', 'Salad'],
    totalPrice: 1590,
    status: 'pending',
    timestamp: '2023-05-15T10:45:00'
  },
  {
    id: 3,
    customer: 'Bob Johnson',
    items: ['Pizza', 'Water'],
    totalPrice: 2090,
    status: 'ready',
    timestamp: '2023-05-15T11:00:00'
  },
  {
    id: 4,
    customer: 'Alice Brown',
    items: ['Pasta', 'Garlic Bread', 'Soda'],
    totalPrice: 2390,
    status: 'ready',
    timestamp: '2023-05-15T09:15:00'
  }
]);

// Order alert state
const showAlert = ref(false);
const newOrder = ref(null);

// Function to update order status
const updateOrderStatus = (orderId: number, newStatus: string) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
  }
};

// New function to handle order pickup
const handleOrderPickup = (orderId: number) => {
  const orderIndex = orders.value.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    orders.value.splice(orderIndex, 1);
  }
};

// Function to simulate receiving a new order
const simulateNewOrder = () => {
  // Generate a new order with a random ID
  const orderId = Math.floor(Math.random() * 1000) + 5; // Start from 5 to avoid conflicts with existing orders
  const customers = ['Michael Scott', 'Dwight Schrute', 'Jim Halpert', 'Pam Beesly', 'Ryan Howard'];
  const menuItems = [
    ['Cheeseburger', 'Fries', 'Milkshake'],
    ['Veggie Burger', 'Sweet Potato Fries'],
    ['Chicken Wings', 'Coleslaw', 'Beer'],
    ['Fish & Chips', 'Soda'],
    ['Pizza', 'Garlic Bread', 'Soda']
  ];
  
  // Pick random customer and order items
  const customerIndex = Math.floor(Math.random() * customers.length);
  const itemsIndex = Math.floor(Math.random() * menuItems.length);
  
  // Create new order object
  const order = {
    id: orderId,
    customer: customers[customerIndex],
    items: menuItems[itemsIndex],
    totalPrice: Math.floor(Math.random() * 2000) + 1000, // Random price between 1000-3000
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  
  // Add to orders list
  orders.value.push(order);
  
  // Show alert - ensure newOrder is set before showAlert
  newOrder.value = order;
  
  // Small delay to ensure the reference is updated before showing
  setTimeout(() => {
    showAlert.value = true;
  }, 10);
};

// Handle alert close
const handleAlertClose = () => {
  showAlert.value = false;
};

onMounted(() => {
  // Ensure we have a small delay before showing the first alert
  setTimeout(() => {
    simulateNewOrder();
  }, 2000);
  
  // Set up interval to periodically show new orders
  setInterval(() => {
    simulateNewOrder();
  }, 30000); // Show a new order every 30 seconds
});

// Simplified to only two statuses
const statusColumns = ['pending', 'ready'];
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

.status-column[data-status="ready"] {
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
