<template>
    <div id="app">
        <NavBar />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss">
main {
    padding: 20px;
    background-color: var(--background-color);
    color: var(--text-color);
}
</style>
