<script setup lang="ts">
import type { Item } from '~/types/Item';
definePageMeta({
    layout: 'mobil',
})

const { getMenu } = useMenuApi()

const loadMenu = async () => {
    try {
        const response = await getMenu()
        console.log(response)
    } catch (error) {
        console.error("Error loading menu:", error)
    }
}

const MenuItems: Item[] = [
    {
        id: "0",
        name: "Mr. Big szendvics",
        price: 1000,
        stock: 12,
        category: {
            id: "0",
            name: "Szendvics"
        }
    },
    {
        id: '1',
        name: 'Fehér zsemlés szendvics',
        category: {
             id:"0",
             name: "Szendvics"
        },
        price: 350,
        stock: 20
    },
    {
        id: '2',
        name: 'Classic Burger',
        category: {
            id:"1",
            name:"Hamburger"
        },
        price: 800,
        stock: 4
    }
]
</script>

<template>
    <div>
        <h1>Szia Lajos!</h1>
        <p>Rendelj valami finomat!</p>
    </div>
    <div class="grid grid-cols-1 gap-4 rounded-3xl p-4 md:grid-rows-2 lg:grid-rows-3">
        <FoodCard v-for="item in MenuItems" :key="item.id" :item="item"/>
        <Cart/>
    </div>
</template>



<style scoped>

</style>