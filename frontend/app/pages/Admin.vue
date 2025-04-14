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
  
  // Show alert
  newOrder.value = order;
  showAlert.value = true;
};

// Handle alert close
const handleAlertClose = () => {
  showAlert.value = false;
};
onMounted(() => {
  setTimeout(simulateNewOrder, 10000);
  
  setInterval(() => {
    const randomDelay = Math.floor(Math.random() * 30000) + 15000; 
    setTimeout(simulateNewOrder, 10000);
  }, 60000);
});

// Simplified to only two statuses
const statusColumns = ['pending', 'ready'];
</script>

<template>
    <div class="p-4 sm:p-6 max-w-7xl mx-auto">
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
                class="bg-gray-800 p-4 rounded-lg status-column"
                :data-status="status"
            >
                <h2 class="text-lg font-semibold mb-3 capitalize text-white">{{ status }}</h2>
                <OrderList 
                    :orders="orders.filter(order => order.status === status)" 
                    :targetStatus="status"
                    :allStatuses="statusColumns"
                    @update-status="updateOrderStatus"
                    @order-pickup="handleOrderPickup"
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

@media (max-width: 768px) {
  .status-column {
    margin-bottom: 1rem;
  }
}
</style>