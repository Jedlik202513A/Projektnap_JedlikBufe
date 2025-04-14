import type { Category } from "./Category";

export interface Item {
    id: string;
    name: string;
    category_id: Category;
    price: number;
    stock: number;
}