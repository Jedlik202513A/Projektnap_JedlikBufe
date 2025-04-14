<script setup lang="ts">

import type { Item } from '~/types/Item.ts';

const props = defineProps<{
    item: Item
}>()

const cartStore = useCartStore()

const cart = computed(() => cartStore.getItems)

const quantity = computed(() => {
    const item = cart.value.find((i) => i.item.id === props.item.id)
    return item ? item.quantity : 0
})

const addQuantity = () => {
    cartStore.addOneToItem(props.item)
}

const subtractQuantity = () => {
    cartStore.removeOneFromItem(props.item.id)
}
</script>
<template>
    <div class="flex justify-between gap-5 p-5 rounded-3xl bg-orange-100">
        <div>
            <h1 class="font-medium">{{ item.name }}</h1>
            <p class="text-gray-600">{{ item.price }} Ft</p>
        </div>
        <div class="flex items-center gap-2.5">
            <button class="size-8 rounded-full flex items-center justify-center cursor-pointer bg-orange-500" @click="subtractQuantity()">&#8722;</button>
            <span>
                {{ quantity }}
            </span>
            <button class="size-8 rounded-full flex items-center justify-center cursor-pointer bg-orange-500" @click="addQuantity()">&#65291;</button>
        </div>
    </div>
  </template>

