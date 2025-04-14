<script lang="ts" setup>
import {ref , onMounted } from 'vue';

const isMobilDevice = ref(false);

onMounted(() => {
    isMobilDevice.value = /Android|WebOS|iPhone/i.test(navigator.userAgent) || window.innerWidth < 768;
    window.addEventListener('resize', () => {
        isMobilDevice.value = window.innerWidth < 768;
    });
});


</script>


<template>
    <div class="app-container bg-gray-950">
        <div class="mobile-frame" v-if="!isMobilDevice">
            <div class="mobile-frame-content text-red-500 bg-gray-950 relative">
                <slot/>
            </div>
        </div>
        <div class="mobile-only" v-else>
            <slot/>
        </div>
    </div>

</template>

<style scoped>
/* @import 'asserts/css/main.css'; */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}

.app-container{
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
}
.mobile-frame {
  width: 375px;
  height: 667px;
  background-color: gray;
  border-radius: 36px;
  padding: 10px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
}

.mobile-frame-content {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  padding: 10px;

}

.mobile-only {
  width: 100%;
  height: 100vh;
  /* background-color: white; */
}

/* Media query to ensure frame never appears on small screens */
@media (max-width: 767px) {
  .mobile-frame {
    display: none;
  }
  
  .mobile-only {
    display: block;
  }
}

</style>