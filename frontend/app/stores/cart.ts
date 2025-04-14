import type { CartItem } from "~/types/Cart";
import type { Item } from "~/types/Item";

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
    }),
    actions: {
        addItem: function (item: Item, quantity: number = 1) {
            const existingItem = this.items.find(i => i.item.id === item.id)
            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                this.items.push({ item, quantity })
            }
        },
        removeItem: function (itemId: string) {
            const index = this.items.findIndex(i => i.item.id === itemId)
            if (index !== -1) {
                this.items.splice(index, 1)
            }
        },
        clearCart: function () {
            this.items = []
        },
        getTotalPrice: function () {
            return this.items.reduce((total, item) => total + (item.item.price * item.quantity), 0)
        },
        removeOneFromItem: function (itemId: string) {
            const item = this.items.find(i => i.item.id === itemId)
            if (item && item.quantity > 1) {
                item.quantity -= 1
            } else {
                this.removeItem(itemId)
            }
        },
        addOneToItem: function (item: Item) {
            const existingItem = this.items.find(i => i.item.id === item.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                this.items.push({ item, quantity: 1 })
            }
        },
    },
    getters: {
        getItems: (state) => state.items,
        getItemById: (state) => (itemId: string) => {
            const item = state.items.find(i => i.item.id === itemId)
            return item ? item.item : null
        }
    }
})