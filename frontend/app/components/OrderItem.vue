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

const emit = defineEmits(['change-status', 'drag-start', 'touch-start', 'touch-move', 'touch-end']);

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

// Simplified status colors for just Pending and Ready
const getStatusColor = (status: string) => {
  if (status === 'pending') {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  } else if (status === 'ready') {
    return 'bg-green-100 text-green-800 border-green-200';
  }
  return '';
};

// Get the other status (toggle between Pending and Ready)
const getOtherStatus = () => {
  return props.order.status === 'pending' ? 'ready' : 'pending';
};
</script>

<template>
  <div 
    class="p-4 rounded-md shadow-sm border border-gray-200 cursor-move"
    draggable="true"
    @dragstart="onDragStart"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-medium">Order #{{ order.id }}</h3>
      <span class="text-xs text-gray-500">{{ formatDate(order.timestamp) }}</span>
    </div>
    
    <div class="mb-3 text-sm">
      <p class="mb-1"><span class="font-medium">Customer:</span> {{ order.customer }}</p>
      <p class="mb-1"><span class="font-medium">Items:</span> {{ order.items.join(', ') }}</p>
      <p class="mb-1"><span class="font-medium">Total:</span> {{ order.totalPrice }} Ft</p>
      <p class="flex items-center">
        <span class="font-medium mr-2">Status:</span> 
        <span :class="['px-2 py-1 rounded text-xs capitalize', getStatusColor(order.status)]">
          {{ order.status }}
        </span>
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
      <button 
        :class="[
          'px-3 py-2 text-sm rounded-full transition-colors', // Increased touch target size
          'bg-gray-100 hover:bg-gray-200 text-gray-700'
        ]"
        @click="updateStatus(getOtherStatus())"
      >
        Move to {{ getOtherStatus() }}
      </button>
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

/* Ensure touch targets are large enough */
button {
  min-height: 44px;
  min-width: 44px;
}
</style>
