<script setup lang="ts">
import type { Category } from '~/types/Category';
import type { Item } from '~/types/Item';
definePageMeta({
    layout: 'mobil',
})

const { getCategories } = useMenuApi()
const authStore = useAuthStore()

const categories = ref<Category[]>([])

const loadMenu = async () => {
    try {
        const response = await getCategories()
        categories.value = response || []
    } catch (error) {
        console.error("Error loading menu:", error)
    }
}

onMounted(() => {
    loadMenu()
})
</script>

<template>
    <div class="p-5">
        <h1 class="text-3xl font-semibold">Szia {{ authStore.user?.name}}!</h1>
        <p class="text-gray-500 font-medium">Rendelj valami finomat!</p>
    </div>
    <div class="flex flex-col gap-2.5">
        <CategoriesCard v-for="category in categories" :key="category._id" :category="category" />
    </div>
</template>

<style scoped>

</style>