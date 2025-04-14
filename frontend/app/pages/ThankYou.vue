<script lang="ts" setup>
definePageMeta({
  layout: 'mobil',
});
</script>

<template>
  <div class="thank-you-page bg-white p-6 flex items-center justify-center">
    <div class="thank-you-container max-w-md w-full bg-[#FBEBD0] p-8 rounded-lg shadow-md text-center border border-gray-200">
      <div class="success-icon mb-5">
        <!-- Using a simpler, theme-consistent checkmark -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold mb-3 text-[#57390F]">Köszönjük a rendelésed!</h1>

      <p class="mb-6 text-[#57390F]/90">A rendelésed sikeresen rögzítettük és hamarosan elkészítjük.</p>
      <!-- Optional: Add link to status tracking -->
      <p class="mb-8 text-sm text-[#57390F]/70">
          Kövesd nyomon a rendelésed állapotát <nuxt-link to="/StatusTrack" class="text-[#FBA518] hover:underline font-semibold">itt</nuxt-link>.
      </p>


      <div class="mt-8">
        <nuxt-link
          to="/menu"
          class="back-to-menu-btn bg-[#FBA518] text-white py-2 px-6 rounded-lg text-base font-semibold hover:bg-opacity-90 transition duration-200 inline-block"
        >
          Új rendelés leadása
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thank-you-page {
  /* Ensures the background covers the whole page and centers content */
  /* Styles moved to template for Tailwind */
}

.thank-you-container {
  /* Styling similar to OrderItem */
   /* border: 1px solid #FBEBD0; /* Subtle border matching the page bg */
   /* Updated border for white background */
   border: 1px solid #e5e7eb; /* Light gray border */
   font-family: sans-serif; /* Or your project's default font */
}

.success-icon svg {
  /* Optional: Add subtle animation */
   animation: pop 0.5s ease-out forwards;
}

@keyframes pop {
    0% { transform: scale(0.5); opacity: 0; }
    80% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}


.back-to-menu-btn {
  /* Ensures consistent button styling */
}
</style>