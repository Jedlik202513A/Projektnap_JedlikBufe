import type { Item } from "./Item";

export interface Order {
    id: string;
    sumPrice: number;
    status: string;
    items: Item[];
    orderNumber: number;
}