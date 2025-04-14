import type { Item } from "./Item";

export interface Order {
    _id: string;
    sumPrice: number;
    status: string;
    items: Item[];
    orderNumber: number;
}