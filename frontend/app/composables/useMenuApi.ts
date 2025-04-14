import type { Category } from "~/types/Category";
import type { Item } from "~/types/Item";

export const useMenuApi = () => {
    const runtimeConfig = useRuntimeConfig()
    const API_BASE_URL = runtimeConfig.public.apiBaseUrl

    const getMenu = () => {
        return $fetch<Item[]>(`${API_BASE_URL}/items`, {
            method: "GET",
        })
    }
    
    const getMenuByCategory = (categoryId: string) => {
        return $fetch<Item[]>(`${API_BASE_URL}/items/${categoryId}`, {
            method: "GET",
        })
    }

    const getCategories = () => {
        return $fetch<Category[]>(`${API_BASE_URL}/categories`, {
            method: "GET",
        })
    }

    return { getMenu, getCategories, getMenuByCategory }
};
