<template>
    <nav class="navbar">
        <div class="logo">🌍 Country Info</div>
        <div class="nav-links">
            <router-link to="/" class="nav-link">Home</router-link>
        </div>
    </nav>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background-color: #2c3e50;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .logo {
        font-size: 24px;
        font-weight: bold;
    }

    .nav-links {
        display: flex;
        gap: 15px;

        .nav-link {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 16px;
            border-radius: 4px;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #42b983;
            }

            &.router-link-exact-active {
                background-color: #42b983;
                color: white;
            }
        }
    }
}
</style>
