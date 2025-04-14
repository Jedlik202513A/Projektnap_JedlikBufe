<script setup lang="ts">
definePageMeta({
    layout: 'blank'
})


</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <form @submit.prevent=""
            class="w-1/4 max-w-5xl flex flex-col items-center gap-5 border mx-auto border-white rounded-2xl p-10 bg-neutral-200/20">
            <input type="text" placeholder="Felhasználónév"
                class="w-full h-10 border bg-amber-50 text-amber-950 rounded-2xl p-4">
            <input type="password" placeholder="Jelszó"
                class="w-full h-10 border bg-amber-50 text-amber-950 rounded-2xl p-4">
            <button type="form" class="bg-sky-500 text-stone-950 p-3 rounded-2xl">Bejelentkezés</button>
        </form>
    </div>
</template>


<style scoped></style>