<script setup lang="ts">
definePageMeta({
    layout: 'mobil',
})

const route = useRoute()
const { category } = route.params as { category: string }


</script>

<template>
    <div>
        {{ category }}
    </div>
</template>

<style scoped>

</style>