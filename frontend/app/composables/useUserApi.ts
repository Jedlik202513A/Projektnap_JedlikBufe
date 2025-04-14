import type { TokenResponse } from "~/types/Response";

export const useUserApi = () => {
    const runtimeConfig = useRuntimeConfig()
    const API_BASE_URL = runtimeConfig.public.apiBaseUrl

    const login = (name: string, password: string) => {
        return $fetch<TokenResponse>(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            body: {
                name, 
                password
            }
        })
    }
    return { login }
};
