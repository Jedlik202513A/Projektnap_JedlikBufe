<script setup lang="ts">

import type { Item } from '~/types/Item.ts';

const props = defineProps<{
    item: Item
}>()

const cartStore = useCartStore()

const quantity = ref(0)

const AddToCart = (item: Item, quantity: number)=>{
    cartStore.addItem(item, quantity)
    console.log(cartStore.getItems)
}

const addQuantity = () => {
    if (quantity.value < props.item.stock) {
        quantity.value++
    }
}

const subtractQuantity = () => {
    if (quantity.value > 0) {
        quantity.value--
    }
}
</script>
<template>
    <div class="border-4 border-amber-100 h-70 m-7 p-4 rounded-3xl md:w-xl lg:w-xl">
        <h1 class="font-bold text-4xl text-center">{{ item.name }}</h1>
        <p class="m-6">Kategória: {{ item.category.name }}</p>
        <p class="m-6">Ár: {{ item.price }} -Ft</p>
        <div class="flex items-center space-x-4">
            <button class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" @click="subtractQuantity()">&#8722;</button>
            <input type="number" v-model="quantity" class="w-16 text-center border rounded-md" min="0" :max="item.stock"/>
            <button class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" @click="addQuantity()">&#65291;</button>
        </div>
        <button class="bg-red-700 w-50 h-10 border rounded-4xl" @click="AddToCart(item, quantity)">Hozzáadás</button>
    </div>
  </template>

