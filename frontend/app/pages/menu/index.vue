<script setup lang="ts">
import type { Category } from '~/types/Category';
import type { Item } from '~/types/Item';
definePageMeta({
    layout: 'mobil',
})

const { getMenu } = useMenuApi()

// const loadMenu = async () => {
//     try {
//         const response = await getMenu()
//         console.log(response)
//     } catch (error) {
//         console.error("Error loading menu:", error)
//     }
// }

// onMounted(() => {
//     loadMenu()
// })

const categories = ref<Category[]>([
    {
        id: "1",
        name: 'Pizza'
    },
    {
        id: "2",
        name: 'Tészta'
    },
    {
        id: "3",
        name: 'Saláta'
    },
    {
        id: "4",
        name: 'Desszert'
    },
    {
        id: "5",
        name: 'Ital'
    },
    {
        id: "6",
        name: 'Kávé'
    }
])
</script>

<template>
    <div class="p-5">
        <h1 class="text-3xl font-semibold">Szia Lajos!</h1>
        <p class="text-gray-500 font-medium">Rendelj valami finomat!</p>
    </div>
    <div class="flex flex-col gap-2.5">
        <CategoriesCard v-for="category in categories" :key="category.id" :category="category" />
    </div>
</template>

<style scoped>

</style>