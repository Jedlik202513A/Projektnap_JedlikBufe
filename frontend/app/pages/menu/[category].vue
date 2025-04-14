<script setup lang="ts">
import type { Item } from '~/types/Item'

definePageMeta({
    layout: 'mobil',
})

const route = useRoute()
const { category } = route.params as { category: string }
const { getMenuByCategory } = useMenuApi()

const menuItems = ref<Item[]>([])

const loadMenu = async () => {
    try {
        const response = await getMenuByCategory(category as string)
        menuItems.value = response || [];
    } catch (error) {
        console.error("Error loading menu:", error)
    }
}

onMounted(() => {
    loadMenu()
})
</script>

<template>
    <div class="flex flex-col gap-5 p-2.5">
        <NuxtLink to="/menu" class="flex items-center hover:underline">
            <Icon name="lucide:arrow-left" size="1.5rem"/>
        </NuxtLink>
        <div>
            <h1 class="text-xl font-bold">{{ menuItems[0]?.category_id.name }}</h1> 
        </div>
        <div class="grid grid-cols-1 gap-4 rounded-lg md:grid-rows-2 lg:grid-rows-3 ">
            <FoodCard v-for="item in menuItems" :key="item._id" :item="item"/>
            <Cart/>
        </div>
    </div>
</template>

<style scoped>

</style>