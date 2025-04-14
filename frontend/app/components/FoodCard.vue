<script setup lang="ts">

import type { Item } from '~/types/Item.ts';

const AddToCart = (item: Item)=>{
    console.log(item);
    console.log(item.stock);

}

const props = defineProps<{
    item: Item
}>()

</script>
<template>
    <div class="border-4 border-amber-100 h-70 m-7 p-4 rounded-3xl md:w-xl lg:w-xl">
        <h1 class="font-bold text-4xl text-center">{{ item.name }}</h1>
        <p class="m-6">Kategória: {{ item.category.name }}</p>
        <p class="m-6">Ár: {{ item.price }} -Ft</p>
        
        <div class="flex">
            <!-- <button>&#65291</button> -->
        </div>
        <button class="bg-red-700 w-50 h-10 border rounded-4xl" v-on:click="AddToCart(item)">Hozzáadás</button>
    </div>
  </template>

