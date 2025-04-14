import type { Category } from "./Category";

export interface Item {
    id: string;
    name: string;
    category: Category;
    price: number;
    stock: number;
}