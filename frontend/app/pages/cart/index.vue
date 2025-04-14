<script lang="ts" setup>
import type { Item } from '~/types/Item';
import type { Order } from '~/types/Order';

//   const { useCartStore } = await import('@/stores/cart'); !!
const order = ref<Order[]>([
    {
        id: "1",
        sumPrice: 0,
        status: "pending",
        items: [{
            id: "1",
            name: 'Sonkás meleg$zendó',
            category: {
                id: "1",
                name: 'Melegszendics',
            },
            price: 900,
            stock: 5

        },
        {
            id: "2",
            name: 'Kakaós csiga',
            category: {
                id: "2",
                name: 'Pékáru',
            },
            price: 250,
            stock: 10
        }],
        orderNumber: 1
    },
]);

const computedSumPrice = computed(() => {
    const sum = order.value[0]?.items.reduce((total, item) => {
        const itemTotal = item.price * item.stock;
        // console.log(`Item: ${item.name}, Price: ${item.price}, Stock: ${item.stock}, Total: ${itemTotal}`);
        return total + itemTotal;
    }, 0);
    console.log('Total sum:', sum);
    return sum;
});

watch(computedSumPrice, (newValue) => {
    // console.log('Updating sumPrice to:', newValue);
    if (order.value[0]) {
        order.value[0].sumPrice = newValue ?? 0;
    }
}, { immediate: true });

const updateStock = (itemId: string, change: number) => {
    if (!order.value[0]) return;

    const itemIndex = order.value[0].items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;

    const item = order.value[0].items[itemIndex];
    if (!item) return;

    const newStock = item.stock + change;

    if (newStock < 1) {
        order.value[0].items.splice(itemIndex, 1);
    } else {
        item.stock = newStock;
    }
};

const placeOrder = () => {
    console.log('Order placed:', order.value[0]);
    // Add order submission logic here
};

</script>

<template>
    <div class="container mx-auto p-4">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-2xl font-bold mb-6 text-black">Order Summary #{{ order[0]?.orderNumber }}</h2>
            
            <!-- Items List -->
            <div class="space-y-4 mb-6">
                <div v-for="item in (order[0]?.items ?? [])" 
                     :key="item.id" 
                     class="flex items-center justify-between p-4 border rounded-lg">
                    <div class="flex flex-col">
                        <span class="font-semibold text-lg text-black">{{ item.name }}</span>
                        <span class="text-gray-600">{{ item.price }} Ft</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button @click="updateStock(item.id, -1)" 
                                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                            -
                        </button>
                        <span class="w-8 text-center text-black">{{ item.stock }}</span>
                        <button @click="updateStock(item.id, 1)" 
                                class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                            +
                        </button>
                    </div>
                </div>
            </div>

            <!-- Total Section -->
            <div class="border-t pt-4">
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-black">Total:</span>
                    <span class="text-xl text-black">{{ order[0]?.sumPrice }} Ft</span>
                </div>
            </div>


            <div class="mt-6">
            <button @click="placeOrder"
                        class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                    Place Order
            </button>
            </div>
        </div>
    </div>
</template>

<style></style>