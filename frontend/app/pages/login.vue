<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'blank'
})

const { login } = useUserApi()
const authStore = useAuthStore() 

const router = useRouter();

const username = ref("")
const password = ref("")


const handleLogin = async () => {
    try {
        // const response = await login(username.value, password.value)
        // authStore.setToken(response.token)
        router.push('/')
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="h-screen flex items-center justify-center">
        <form @submit.prevent="handleLogin"
            class=" max-w-5xl flex flex-col items-center gap-5 border mx-auto border-white rounded-2xl p-10 bg-neutral-200/20">
            <input type="text" v-model="username" placeholder="Felhasználónév"
                class="w-full h-10 border bg-amber-50 text-amber-950 rounded-2xl p-4">
            <input type="password" v-model="password" placeholder="Jelszó"
                class="w-full h-10 border bg-amber-50 text-amber-950 rounded-2xl p-4">
            <button type="submit" class="bg-sky-500 text-stone-950 p-3 rounded-2xl">Bejelentkezés</button>
        </form>
    </div>
</template>


<style scoped></style>