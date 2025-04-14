import type { Category } from "./Category";

export interface Item {
    _id: string;
    name: string;
    category_id: Category;
    price: number;
    stock: number;
    quantity: number;
}