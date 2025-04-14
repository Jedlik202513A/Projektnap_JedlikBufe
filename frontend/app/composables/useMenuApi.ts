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

    return { getMenu, getMenuByCategory }
};
