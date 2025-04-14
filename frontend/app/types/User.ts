import type { Order } from "./Order";

export interface User {
    id: string;
    name: string;
    orders: Order[];
    role: number;
}