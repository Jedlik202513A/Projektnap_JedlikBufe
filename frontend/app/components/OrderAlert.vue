<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  order: {
    type: Object,
    default: null
  },
  duration: {
    type: Number,
    default: 5000 // 5 seconds
  }
});

const emit = defineEmits(['close']);

const isVisible = ref(props.show);
const timeRemaining = ref(props.duration);
let timer = null;
let progressInterval = null;

// Calculate progress percentage
const progressPercentage = computed(() => {
  return (timeRemaining.value / props.duration) * 100;
});

// Start the auto-dismiss timer and progress timer
const startTimer = () => {
  // Clear any existing timers
  if (timer) clearTimeout(timer);
  if (progressInterval) clearInterval(progressInterval);
  
  // Reset time remaining
  timeRemaining.value = props.duration;
  
  // Set the main timer to close the alert
  timer = setTimeout(() => {
    isVisible.value = false;
    emit('close');
  }, props.duration);
  
  // Set an interval to update the progress bar
  const updateFrequency = 100; // Update every 100ms for smooth animation
  progressInterval = setInterval(() => {
    timeRemaining.value = Math.max(0, timeRemaining.value - updateFrequency);
    
    // If time's up, clear the interval
    if (timeRemaining.value <= 0 && progressInterval) {
      clearInterval(progressInterval);
    }
  }, updateFrequency);
};

// Watch for changes to the show prop
watch(() => props.show, (newValue) => {
  isVisible.value = newValue;
  if (newValue) {
    startTimer();
  } else {
    // Clear timers when hiding
    if (timer) clearTimeout(timer);
    if (progressInterval) clearInterval(progressInterval);
  }
});

// Close the alert manually
const closeAlert = () => {
  isVisible.value = false;
  if (timer) clearTimeout(timer);
  if (progressInterval) clearInterval(progressInterval);
  emit('close');
};

// When mounted, start the timer if the alert is visible
onMounted(() => {
  if (props.show) {
    startTimer();
  }
});

// Clean up timers when component is unmounted
onUnmounted(() => {
  if (timer) clearTimeout(timer);
  if (progressInterval) clearInterval(progressInterval);
});
</script>

<template>
  <transition
    enter-active-class="transform transition duration-300 ease-out"
    enter-from-class="translate-y-[-100%] opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-[-100%] opacity-0"
  >
    <div 
      v-if="isVisible && order" 
      class="fixed top-0 left-0 right-0 z-50 mx-auto p-4 bg-[#FEF6E4] text-[#57390F] shadow-lg max-w-md rounded-b-lg"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div class="font-bold">New Order #{{ order.id }}</div>
            <div class="text-sm">{{ order.customer }} - {{ order.totalPrice }} Ft</div>
          </div>
        </div>
        <button @click="closeAlert" class="text-[#57390F] hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <!-- Timer progress bar -->
      <div class="w-full h-1 mt-3 bg-gray-300 rounded-full overflow-hidden">
        <div 
          class="h-full bg-[#FBA518] transition-all duration-100 ease-linear"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      
      <!-- Timer indicator text -->
      <div class="text-xs text-gray-700 text-right mt-1">
        {{ Math.ceil(timeRemaining / 1000) }}s
      </div>
    </div>
  </transition>
</template>
