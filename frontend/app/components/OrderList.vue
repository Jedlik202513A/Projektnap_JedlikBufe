<script setup lang="ts">
import { ref } from 'vue';
import OrderItem from './OrderItem.vue';

const props = defineProps({
  orders: {
    type: Array,
    required: true
  },
  targetStatus: {
    type: String,
    required: true
  },
  allStatuses: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update-status']);

const handleStatusChange = (orderId: number, newStatus: string) => {
  emit('update-status', orderId, newStatus);
};

// Drag and drop functionality
const onDragStart = (event: DragEvent, orderId: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('orderId', orderId.toString());
    event.dataTransfer.effectAllowed = 'move';
  }
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const onDrop = (event: DragEvent, newStatus: string) => {
  event.preventDefault();
  if (event.dataTransfer) {
    const orderId = parseInt(event.dataTransfer.getData('orderId'));
    emit('update-status', orderId, newStatus);
  }
};

// Current order being dragged via touch
const touchDraggedOrderId = ref<number | null>(null);
const touchTargetColumn = ref<string | null>(null);

// Track if we're currently dragging
const isDraggingTouch = ref(false);

// Handle touch start on an order item
const handleTouchStart = (event: TouchEvent, orderId: number) => {
  touchDraggedOrderId.value = orderId;
  isDraggingTouch.value = true;
  
  // Create a visual ghost element for feedback
  const ghostElement = document.createElement('div');
  ghostElement.id = 'touch-drag-ghost';
  ghostElement.style.position = 'fixed';
  ghostElement.style.pointerEvents = 'none';
  ghostElement.style.opacity = '0.7';
  ghostElement.style.zIndex = '9999';
  
  // Position it at touch point
  ghostElement.style.top = `${event.touches[0].clientY - 30}px`;
  ghostElement.style.left = `${event.touches[0].clientX - 30}px`;
  
  // Add a simple visual
  ghostElement.style.width = '60px';
  ghostElement.style.height = '60px';
  ghostElement.style.background = '#FFFFFF';
  ghostElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  ghostElement.style.borderRadius = '5px';
  ghostElement.textContent = `Order #${orderId}`;
  ghostElement.style.display = 'flex';
  ghostElement.style.alignItems = 'center';
  ghostElement.style.justifyContent = 'center';
  
  document.body.appendChild(ghostElement);
};

// Handle touch move
const handleTouchMove = (event: TouchEvent, orderId: number, offset: {x: number, y: number}) => {
  if (!isDraggingTouch.value) return;
  
  const ghostElement = document.getElementById('touch-drag-ghost');
  if (ghostElement) {
    // Move the ghost element with the touch
    ghostElement.style.top = `${event.touches[0].clientY - 30}px`;
    ghostElement.style.left = `${event.touches[0].clientX - 30}px`;
  }
  
  // Determine which column we're over
  const columns = document.querySelectorAll('.status-column');
  columns.forEach((column) => {
    const rect = column.getBoundingClientRect();
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    
    if (
      touchX >= rect.left &&
      touchX <= rect.right &&
      touchY >= rect.top &&
      touchY <= rect.bottom
    ) {
      const status = column.getAttribute('data-status');
      if (status) {
        touchTargetColumn.value = status;
      }
    }
  });
};

// Handle touch end
const handleTouchEnd = (event: TouchEvent, orderId: number) => {
  // Remove ghost element
  const ghostElement = document.getElementById('touch-drag-ghost');
  if (ghostElement) {
    document.body.removeChild(ghostElement);
  }
  
  // If we have a valid drag operation and target column
  if (
    isDraggingTouch.value && 
    touchDraggedOrderId.value !== null && 
    touchTargetColumn.value !== null
  ) {
    // Find the order
    const order = props.orders.find(o => o.id === touchDraggedOrderId.value);
    
    // Only update if moving to a different status
    if (order && order.status !== touchTargetColumn.value) {
      emit('update-status', touchDraggedOrderId.value, touchTargetColumn.value);
    }
  }
  
  // Reset state
  touchDraggedOrderId.value = null;
  touchTargetColumn.value = null;
  isDraggingTouch.value = false;
};
</script>

<template>
  <div 
    class="order-list min-h-[200px]" 
    @dragover="onDragOver"
    @drop="(event) => onDrop(event, targetStatus)"
  >
    <div v-if="orders.length === 0" class="py-4 text-center text-gray-500 italic">
      No orders in this status
    </div>
    <div v-for="order in orders" :key="order.id" class="mb-4"> <!-- Increased spacing for touch -->
      <OrderItem 
        :order="order"
        :allStatuses="allStatuses"
        :targetStatus="targetStatus"
        @change-status="handleStatusChange"
        @drag-start="onDragStart"
        @touch-start="handleTouchStart"
        @touch-move="handleTouchMove"
        @touch-end="handleTouchEnd"
      />
    </div>
  </div>
</template>

<style scoped>
/* Improved touch spacing */
.order-list {
  padding: 0.5rem;
}
</style>
