import type { Item } from "./Item";

export interface Order {
    id?: string;
    _id?: string; // MongoDB ID format
    sumPrice: number;
    status: number | string; // Allow for both number and string statuses
    items: Item[];
    orderNumber: number | string; // Allow for both number and string orderNumbers
}