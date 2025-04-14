import type { Item } from "./Item";

export interface Order {
    id: string;
    sumPrice: number;
    status: number;
    items: Item[];
    orderNumber: number;
}