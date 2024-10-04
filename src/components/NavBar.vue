<template>
    <nav class="navbar">
        <div class="logo">🌍 Country Info</div>
        <div class="nav-links">
            <router-link to="/" class="nav-link">Home</router-link>
            <ThemeToggleButton />
        </div>
    </nav>
</template>

<script setup lang="ts">
import ThemeToggleButton from '@/components/ThemeToggleButton.vue';
</script>

<style scoped lang="scss">
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background-color: var(--navbar-background-color);
    color: var(--navbar-color);
    @include box-shadow;

    .logo {
        font-size: 24px;
        font-weight: bold;
        color: var(--navbar-logo-color);
        cursor: default;
    }

    .nav-links {
        display: flex;
        gap: 15px;

        .nav-link {
            color: var(--nav-link-color);
            text-decoration: none;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 4px;
            @include transition(background-color);

            &:hover {
                background-color: var(--secondary-color);
            }

            &.router-link-exact-active {
                background-color: var(--secondary-color);
                color: var(--router-link-exact-active-color);
            }
        }
    }
}
</style>
