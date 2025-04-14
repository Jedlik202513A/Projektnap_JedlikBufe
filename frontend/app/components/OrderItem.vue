<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  order: {
    type: Object,
    required: true
  },
  allStatuses: {
    type: Array,
    required: true
  },
  targetStatus: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['change-status', 'drag-start', 'touch-start', 'touch-move', 'touch-end', 'order-pickup']);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const updateStatus = (newStatus: string) => {
  emit('change-status', props.order.id, newStatus);
};

// For desktop drag functionality
const onDragStart = (event: DragEvent) => {
  emit('drag-start', event, props.order.id);
};

// For mobile touch functionality
const touchStartY = ref(0);
const touchStartX = ref(0);
const isTouching = ref(false);

const onTouchStart = (event: TouchEvent) => {
  isTouching.value = true;
  touchStartY.value = event.touches[0].clientY;
  touchStartX.value = event.touches[0].clientX;
  emit('touch-start', event, props.order.id);
  
  // Add visual feedback for touch start
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.classList.add('touch-active');
  }
};

const onTouchMove = (event: TouchEvent) => {
  if (isTouching.value) {
    emit('touch-move', event, props.order.id, {
      x: event.touches[0].clientX - touchStartX.value,
      y: event.touches[0].clientY - touchStartY.value
    });
  }
  
  // Prevent scrolling while dragging
  event.preventDefault();
};

const onTouchEnd = (event: TouchEvent) => {
  isTouching.value = false;
  emit('touch-end', event, props.order.id);
  
  // Remove visual feedback
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.classList.remove('touch-active');
  }
};
const getStatusColor = (status: string) => {
  if (status === 'pending') {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  } else if (status === 'ready') {
    return 'bg-green-100 text-green-800 border-green-200';
  }
  return '';
};


const getOtherStatus = () => {
  return props.order.status === 'pending' ? 'ready' : 'pending';
};

// Handle order pickup
const handlePickup = () => {
  emit('order-pickup', props.order.id);
};

// Check if this order is in the Ready column
const isInReadyColumn = () => {
  return props.order.status === 'ready';
};
</script>

<template>
  <div 
    class="p-4 rounded-lg shadow-sm bg-white mb-4"
    draggable="true"
    @dragstart="onDragStart"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-lg font-bold text-[#57390F]">{{ order.customer }}</h3>
      <button 
        v-if="isInReadyColumn()"
        class="bg-[#FBA518] text-white px-4 py-1 rounded-md"
        @click="handlePickup"
      >
        Felvett
      </button>
      <button 
        v-else
        class="bg-[#FBA518] text-white px-4 py-1 rounded-md"
        @click="updateStatus(getOtherStatus())"
      >
        Kész
      </button>
    </div>
    
    <div class="text-sm text-[#57390F]">
      <div v-for="(item, index) in order.items" :key="index" class="flex justify-between mb-1">
        <span>{{ item }}</span>
        <span>{{ Math.round(order.totalPrice / order.items.length) }} Ft</span>
      </div>
      <div class="border-t border-[#57390F] border-opacity-20 mt-2 pt-2 flex justify-between font-bold">
        <span>Összeg:</span>
        <span>{{ order.totalPrice }} Ft</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Touch feedback styles */
.touch-active {
  opacity: 0.8;
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease;
}

button {
  min-height: 36px;
  font-weight: bold;
}
</style>
