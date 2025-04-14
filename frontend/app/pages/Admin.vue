<script setup lang="ts">
import { ref } from 'vue';
import OrderList from '../components/OrderList.vue';

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

// Function to update order status
const updateOrderStatus = (orderId: number, newStatus: string) => {
  const order = orders.value.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
  }
};

// Simplified to only two statuses
const statusColumns = ['pending', 'ready'];
</script>

<template>
    <div class="p-4 sm:p-6 max-w-7xl mx-auto">
        <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Restaurant Admin - Order Management</h1>
        <div class="text-sm mb-4 text-gray-600">Drag orders between columns or use buttons to change status</div>
        
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
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* No custom styles needed as we're using Tailwind */
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
  /* Ensure columns are visually distinct on mobile */
  .status-column {
    margin-bottom: 1rem;
  }
}
</style>