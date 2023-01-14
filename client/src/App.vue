<script setup lang="ts">
import Navbar from './shared/components/NavbarComponent.vue';

</script>

<template>
    <Navbar />
    <RouterView class="router-data" />
</template>
<style lang="postcss" scoped>
    .router-data {
        @apply h-[calc(100vh-4rem)];
    }
</style>

