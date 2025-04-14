import type { Order } from '~/types/Order';
import type { Item } from '~/types/Item'; 

export const useOrderApi = () => {
    const runtimeConfig = useRuntimeConfig();
    const API_BASE_URL = runtimeConfig.public.apiBaseUrl;
    const token = useCookie('token'); 

    const getAllOrders = () => {
        return $fetch<Order[]>(`${API_BASE_URL}/orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.value}` 
            }
        });
    };

    const getOrderById = (orderId: string) => {
        console.log(`Fetching order with ID: ${orderId}`);
        return $fetch<Order>(`${API_BASE_URL}/orders/${orderId}`, {
            method: "GET",
            headers: {
                // Only include Authorization header if token exists
                ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
            }
        })
        .then(response => {
            console.log('Order API response:', response);
            return response;
        })
        .catch(error => {
            console.error(`Error fetching order ${orderId}:`, error);
            throw error;
        });
    };

    const createOrder = (orderData: { items: { itemId: string, quantity: number }[] }) => {
        return $fetch<Order>(`${API_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.value}`
            },
            body: orderData
        });
    };

    const confirmOrder = (orderId: string) => {
        console.log(`Confirming order with ID: ${orderId}`);
        return $fetch<Order>(`${API_BASE_URL}/orders/confirm/${orderId}`, {
            method: "POST", // POST request to change from "In progress" to "Confirmed"
            headers: {
                ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
            }
        })
        .then(response => {
            console.log('Order confirmation response:', response);
            return response;
        })
        .catch(error => {
            console.error(`Error confirming order ${orderId}:`, error);
            throw error;
        });
    };

    const markOrderReady = (orderId: string) => {
        console.log(`Marking order ready with ID: ${orderId}`);
        return $fetch<Order>(`${API_BASE_URL}/orders/confirm/${orderId}`, {
            method: "PATCH", // PATCH request to change from "Confirmed" to "Ready"
            headers: {
                ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
            },
            body: {
                status: "Ready"  // Send the new status in the request body
            }
        })
        .then(response => {
            console.log('Order marked as ready response:', response);
            return response;
        })
        .catch(error => {
            console.error(`Error marking order ${orderId} as ready:`, error);
            throw error;
        });
    };

    return { getAllOrders, getOrderById, createOrder, confirmOrder, markOrderReady };
};
