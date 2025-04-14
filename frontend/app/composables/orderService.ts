import type { Item } from "~/types/Item";
import type { OrderResponse, TokenResponse } from "~/types/Response";

export const useOrderService = () => {
    const runtimeConfig = useRuntimeConfig()
    const API_BASE_URL = runtimeConfig.public.apiBaseUrl

    const postOrder = (items: Item[]) => {
        return $fetch<OrderResponse>(`${API_BASE_URL}/orders`, {
            method: "POST",
            body: [...items]
        })
    }
    return { postOrder }
};