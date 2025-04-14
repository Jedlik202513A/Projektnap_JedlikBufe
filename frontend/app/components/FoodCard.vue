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
    <div class="h-30 p-4 rounded-3xl w-full md:w-md lg:w-md">
        <h1 class="font-bold text-lg text-center">{{ item.name }}</h1>
        <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <button class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" @click="subtractQuantity()">&#8722;</button>
            <input type="number" v-model="quantity" class="w-16 text-center border rounded-md" min="0" :max="item.stock"/>
            <button class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" @click="addQuantity()">&#65291;</button>
        </div>
        <button class="bg-red-700 w-full md:w-50 h-10 border rounded-4xl mt-4" @click="AddToCart(item, quantity)">Hozzáadás</button>
    </div>
  </template>

