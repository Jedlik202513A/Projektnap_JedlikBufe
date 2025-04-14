import type { Order } from "./Order";

export interface User {
    _id: string;
    name: string;
    orders: Order[];
    role: number;
}