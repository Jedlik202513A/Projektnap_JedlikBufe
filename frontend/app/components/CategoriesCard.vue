
<script setup lang="ts">
import type { Category } from '~/types/Category';


const props = defineProps<{
    category: Category
}>()
</script>

<template>
    <NuxtLink :to="`/menu/${category.name}`" class="flex items-center gap-5 p-5 bg-orange-100 rounded-2xl">
        <img :src="`images/categories/${category._id}.png`" class="size-14">
        <p class="text-lg">{{ category.name }}</p>
    </NuxtLink>
</template>


<style scoped>

</style>