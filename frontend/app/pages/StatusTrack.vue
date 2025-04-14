<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'mobil',
});

const router = useRouter();
// Simulate fetching order details - replace with actual data fetching
const order = ref({
  id: '#12345',
  status: 'Preparing', // Possible values: 'Preparing', 'Ready', 'Picked Up'
  items: ['Hamburger', 'Fries'], // Example items
  totalPrice: 1890 // Example price
});

// Reactive status based on the order object
const orderStatus = computed(() => order.value.status);
const orderNumber = computed(() => order.value.id);

const statusSteps = [
  { name: 'Preparing', color: 'bg-yellow-500', progress: '25%' },
  { name: 'Ready', color: 'bg-green-500', progress: '75%' },
  { name: 'Picked Up', color: 'bg-blue-500', progress: '100%' }
];

const currentStatusInfo = computed(() => {
  return statusSteps.find(s => s.name === orderStatus.value) || statusSteps[0];
});

const progressWidth = computed(() => {
    switch (orderStatus.value) {
        case 'Preparing': return '25%';
        case 'Ready': return '75%';
        case 'Picked Up': return '100%';
        default: return '0%';
    }
});


const markAsPickedUp = () => {
  // In a real app, this would likely involve an API call
  order.value.status = 'Picked Up';
  // Redirect after a short delay to show the status change
  setTimeout(() => {
    router.push('/ThankYou'); // Assuming ThankYou page is appropriate after pickup
  }, 1500);
};

// Simulate status updates (for demonstration)
// In a real app, this would come from a backend or WebSocket
/*
setTimeout(() => {
    if (order.value.status === 'Preparing') order.value.status = 'Ready';
}, 5000); // Example: move to Ready after 5 seconds
*/
</script>

<template>
  <div class="status-track-page bg-white p-4 sm:p-6">
    <div class="status-track-container max-w-md mx-auto bg-[#FBEBD0] p-6 rounded-lg shadow-md border border-gray-200">
      <h1 class="text-2xl font-bold text-center mb-6 text-[#57390F]">Rendelés állapota</h1>

      <div class="order-info mb-8 text-[#57390F]">
        <p class="text-lg text-center font-semibold mb-4">Rendelés: {{ orderNumber }}</p>

        <!-- Redesigned Order Items Display -->
         <div class="mt-4 border-t border-[#57390F]/20 pt-4 px-2">
            <h3 class="font-semibold mb-3 text-center text-md">Rendelt termékek</h3>
            <div class="space-y-1 text-sm">
                <div v-for="(item, index) in order.items" :key="index" class="flex justify-between items-center">
                    <span>{{ item }}</span>
                    <!-- Example price per item - adjust logic if needed -->
                    <span class="text-[#57390F]/80">{{ Math.round(order.totalPrice / order.items.length) }} Ft</span>
                </div>
            </div>
            <div class="border-t border-[#57390F]/20 mt-3 pt-3 flex justify-between font-bold text-md">
                <span>Végösszeg:</span>
                <span>{{ order.totalPrice }} Ft</span>
            </div>
         </div>


        <div class="status-display mt-8 text-center">
          <h2 class="text-md mb-2 font-semibold">Aktuális státusz:</h2>
          <div class="flex justify-center">
            <div
              class="status-pill px-4 py-1 rounded-full text-white font-semibold text-sm"
              :class="currentStatusInfo.color"
            >
              {{ orderStatus }}
            </div>
          </div>
        </div>

        <!-- <div class="status-timeline mt-8">
          <div class="flex justify-between mb-1 text-xs text-[#57390F]/80 px-1">
            <span>Előkészítés</span>
            <span>Kész</span>
            <span>Átvéve</span>
          </div>
          <div class="progress-bar bg-gray-200">
            <div
              class="progress-indicator"
              :class="currentStatusInfo.color.replace('bg-', 'bg-theme-')"
              :style="{ width: progressWidth }"
            ></div>
          </div>

           <div class="flex justify-between mt-1 text-xs text-[#57390F]/80 px-1">
             <span :class="{ 'font-bold': orderStatus === 'Preparing' }">Előkészítés alatt</span>
             <span :class="{ 'font-bold': orderStatus === 'Ready' }">Átvételre kész</span>
             <span :class="{ 'font-bold': orderStatus === 'Picked Up' }">Átvéve</span>
           </div>
        </div> -->
      </div>

      <div class="actions mt-10 text-center">
        <!-- Show button only if status is 'Ready' -->
        <button
          class="pickup-btn bg-[#FBA518] text-white py-2 px-6 rounded-lg text-base font-semibold hover:bg-opacity-90 transition duration-200"
        >
          <NuxtLink
            to="/ThankYou"
            class="text-white">Átvettem</NuxtLink>
        </button>
         
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reusing theme colors with Tailwind JIT */
.bg-theme-yellow-500 { background-color: #F59E0B; }
.bg-theme-green-500 { background-color: #10B981; }
.bg-theme-blue-500 { background-color: #3B82F6; }

.status-track-page {
  /* Ensures the background covers the whole page */
}

.status-track-container {
  /* Styling similar to OrderItem */
  /* border: 1px solid #FBEBD0; /* Subtle border matching the page bg */
  /* Updated border for white background */
   border: 1px solid #e5e7eb; /* Light gray border */
}

.progress-bar {
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-indicator {
  height: 100%;
  transition: width 0.5s ease-in-out, background-color 0.5s ease;
  border-radius: 4px;
}

.status-pill {
  min-width: 100px; /* Adjusted min-width */
  text-align: center;
}

.pickup-btn:disabled {
  background-color: #a0aec0; /* Standard disabled style */
  cursor: not-allowed;
}

/* Ensure consistent font */
.status-track-container {
    font-family: sans-serif; /* Or your project's default font */
}
</style>