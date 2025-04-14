import type { TokenResponse } from "~/types/Response";

export const useUserApi = () => {
    const runtimeConfig = useRuntimeConfig()
    const API_BASE_URL = runtimeConfig.public.apiBaseUrl

    const login = (username: string, password: string) => {
        return $fetch<TokenResponse>(`${API_BASE_URL}/login`, {
            method: "POST",
            body: {
                username, 
                password
            }
        })
    }
    return { login }
};
