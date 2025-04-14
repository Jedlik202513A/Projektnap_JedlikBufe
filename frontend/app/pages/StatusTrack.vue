<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'mobil',
});

const router = useRouter();
const orderStatus = ref('Preparing');
const orderNumber = ref('#12345'); 

const statusOptions = [
  { name: 'Preparing', color: 'bg-yellow-500' },
  { name: 'Ready', color: 'bg-green-500' },
  { name: 'Picked Up', color: 'bg-blue-500' }
];

const markAsPickedUp = () => {
  orderStatus.value = 'Picked Up';
  setTimeout(() => {
    router.push('/ThankYou');
  }, 1000);
};
</script>

<template>
  <div class="status-track-container">
    <h1 class="text-2xl font-bold text-center mb-6">Rendelés állapota</h1>
    
    <div class="order-info mb-8">
      <p class="text-lg">Rendelés száma: <span class="font-semibold">{{ orderNumber }}</span></p>
      
      <div class="status-display mt-4">
        <h2 class="text-md mb-2">Aktuális státusz: </h2>
        <div class="flex justify-center">
          <div 
            class="status-pill px-4 py-2 rounded-full text-white font-semibold"
            :class="statusOptions.find(s => s.name === orderStatus)?.color"
          >
            {{ orderStatus }}
          </div>
        </div>
      </div>

      <div class="status-timeline mt-8">
        <div class="flex justify-between mb-2">
          <div class="step">Ordered</div>
          <div class="step">Preparing</div>
          <div class="step">Ready</div>
          <div class="step">Picked Up</div>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-indicator"
            :style="{
              width: orderStatus === 'Preparing' ? '25%' : 
                     orderStatus === 'Ready' ? '75%' : 
                     orderStatus === 'Picked Up' ? '100%' : '0%'
            }"
          ></div>
        </div>
      </div>
    </div>

    <div class="actions mt-10 text-center">
      <button 
        @click="markAsPickedUp" 
        class="pickup-btn bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700"
        :disabled="orderStatus === 'Picked Up'"
      >
        Megjelölve átvettként
      </button>
    </div>
  </div>
</template>

<style>
.status-track-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.progress-bar {
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-indicator {
  height: 100%;
  background-color: #4299e1;
  transition: width 0.5s ease;
}

.status-pill {
  display: inline-block;
  min-width: 120px;
  text-align: center;
}

.pickup-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}
</style>