import type { Item } from "~/types/Item";
import type { TokenResponse } from "~/types/Response";

export const useOrderService = () => {
    const runtimeConfig = useRuntimeConfig()
    const API_BASE_URL = runtimeConfig.public.apiBaseUrl

    const postOrder = (items: Item[]) => {
        return $fetch<{orderNumber: string}>(`http://10.0.22.31:5000/api/orders`, {
            method: "POST",
            body: [...items]
        })
    }
    return { postOrder }
};