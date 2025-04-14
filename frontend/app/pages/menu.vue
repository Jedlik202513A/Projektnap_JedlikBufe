<script setup lang="ts">
import type { Item } from '~/types/Item';
definePageMeta({
    layout: 'mobil',
})
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
    <div class="flex">
        <FoodCard v-for="item in MenuItems" :key="item.id" :item="item"/>
    </div>
</template>



<style scoped>

</style>