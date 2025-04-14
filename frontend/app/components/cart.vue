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

const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
};
</script>

<template>
    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300"
         :class="{ 'translate-y-0': isCartOpen, 'translate-y-[calc(100%-4rem)]': !isCartOpen }">
        
        <!-- Top Bar -->
        <div @click="toggleCart" 
             class="h-16 px-6 flex items-center justify-between cursor-pointer hover:bg-gray-50">
            <div class="flex items-center gap-4">
                <span class="font-semibold text-black">Your Cart</span>
                <span class="text-gray-600">({{ cart?.length ?? 0 }} items)</span>
            </div>
            <span class="font-bold text-black">{{ cartStore.getTotalPrice() }} Ft</span>
        </div>

        <!-- Expandable Content -->
        <div class="max-h-[70vh] overflow-y-auto px-6 pb-6">
            <div class="space-y-4 mb-6">
                <div v-for="item in cart" 
                     :key="item.item.id" 
                     class="flex items-center justify-between p-4 border rounded-lg">
                    <div class="flex flex-col">
                        <span class="font-semibold text-lg text-black">{{ item.item.name }}</span>
                        <span class="text-gray-600">{{ item.item.price }} Ft</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="cartStore.removeOneFromItem(item.item.id)" 
                                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                        <span class="w-8 text-center text-black">{{ item.quantity }}</span>
                        <button @click="cartStore.addOneToItem(item.item.id)" 
                                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                    </div>
                </div>
            </div>

            <button @click="placeOrder"
                    class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                Place Order
            </button>
        </div>
    </div>
</template>

<style></style>