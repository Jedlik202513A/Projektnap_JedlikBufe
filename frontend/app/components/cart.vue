<script lang="ts" setup>
import type { Item } from '~/types/Item';
import type { Order } from '~/types/Order';
import type { CartItem } from '~/types/Cart';


//   const { useCartStore } = await import('@/stores/cart'); !!
const cartStore = useCartStore();

const cart = computed(() => cartStore.getItems);

const placeOrder = () => {
    console.log('Order placed:');

    // Add order submission logic here
};
const isCartOpen = ref(false);

watch(() => cart.value?.length, (newLength) => {
    if (newLength === 0) {
        isCartOpen.value = false;
    }
});

const toggleCart = () => {
    if (cart.value?.length > 0) {
        isCartOpen.value = !isCartOpen.value;
    }
};
</script>

<template>

<div class="absolute bottom-0 max-h-180 left-0 right-0 bg-orange-500 shadow-lg transform transition-transform duration-300"
        :class="{ 'translate-y-0': isCartOpen, 'translate-y-[calc(100%-4rem)]': !isCartOpen }">

        <!-- Top Bar -->
        <div @click="toggleCart" 
             class="h-16 px-6 flex items-center justify-between hover:bg-orange-200"
             :class="{'cursor-pointer': cart?.length > 0, 'cursor-not-allowed opacity-50': !cart?.length}">
            <div class="flex items-center gap-4">
                <Icon name="hugeicons:shopping-basket-03" class="w-6 h-6 text-black" size="2rem" />
                <span class="text-gray-600">({{ cart?.length ?? 0 }})</span>
            </div>
            <div class="text-xl font-semibold text-black" :class="{ 'hidden': isCartOpen }">
                {{ cartStore.getTotalPrice() }} Ft
            </div>
        </div>
        <!-- Expandable Content -->
        <div class="max-h-[70vh] overflow-y-auto px-6 pb-6">

            <div class="space-y-4 mb-6">
                <div v-for="item in cart" :key="item.item.id" class="flex items-center justify-between p-4 rounded-lg">
                    <div class="flex flex-col">
                        <span class="font-semibold text-lg text-black">{{ item.item.name }}</span>
                        <span class="text-gray-600">{{ item.item.price }} Ft</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="cartStore.removeOneFromItem(item.item.id)"
                            class="px-3 py-1 bg-gray-200 rounded-2xl hover:bg-gray-300">-</button>
                        <span class="w-8 text-center text-black">{{ item.quantity }}</span>
                        <button @click="cartStore.addOneToItem(item.item.id)"
                            class="px-3 py-1 bg-gray-200 rounded-2xl hover:bg-gray-300 ">+</button>
                    </div>
                </div>
            </div>


            <div class="flex justify-between items-center">
                <button @click="placeOrder" v-if="cart.length > 0" :disabled="cart.length === 0"
                    class="w-1/2 bg-orange-100 text-black py-3 rounded-lg hover:bg-orange-200 transition">
                    Megrendelés
                </button>
                <div class="text-xl font-semibold text-black" :class="{'hidden': !isCartOpen }">
                    {{ cartStore.getTotalPrice() }} Ft
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>