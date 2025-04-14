<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const { login } = useUserApi()
const authStore = useAuthStore()

const router = useRouter();

const username = ref("")
const password = ref("")


const handleLogin = async () => {
    try {
        const response = await login(username.value, password.value)
        authStore.setToken(response.token)
        router.push('/')
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="h-full flex items-center justify-center bg-white rounded-2xl">
        <form @submit.prevent="handleLogin"
            class="max-w-4xl flex flex-col items-center gap-7 border w-100 border-white p-8">
            <div class="w-35 h-35 bg-orange-400 rounded-3xl mb-20 flex justify-center items-center">
                <img src="/images/fast-food-icon.png" alt="fast-food" class="size-22">
            </div>
            <input type="text" v-model="username" placeholder="Név"
                class="w-full h-12 border bg-white text-amber-950 rounded-2xl p-4">
            <input type="password" v-model="password" placeholder="Jelszó"
                class="w-full h-12 border bg-white text-amber-950 rounded-2xl p-4">
            <button type="submit" class="bg-orange-400 w-full text-stone-950 p-3 rounded-xl cursor-pointer">Bejelentkezés</button>
        </form>
    </div>
</template>


<style scoped></style>