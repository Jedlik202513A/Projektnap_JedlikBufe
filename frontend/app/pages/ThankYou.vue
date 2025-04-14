<script lang="ts" setup>
definePageMeta({
  layout: 'mobil',
});
</script>

<template>
  <div class="thank-you-container">
    <div class="success-icon mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    
    <h1 class="text-2xl font-bold mb-4">Köszönjük a rendelésed!</h1>
    
    <p class="mb-2">A rendelésed sikeresen előkészítve</p>

    
    <div class="mt-8">
      <nuxt-link to="/menu" class="back-to-menu-btn bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700">
        Rendelj újra
      </nuxt-link>
    </div>
  </div>
</template>

<style>
.thank-you-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.success-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
}

.back-to-menu-btn {
  display: inline-block;
  transition: all 0.3s ease;
}
</style>