<template>
    <div class="home">
        <div class="content">
            <div class="left-panel">
                <SearchBar />
            </div>
            <div class="right-panel">
                <RandomCountriesWidget />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';
import RandomCountriesWidget from '@/components/RandomCountriesWidget.vue';

const store = useStore();

onMounted(async () => {
    await store.dispatch('fetchCountries');
    await store.dispatch('fetchRandomCountries');
});
</script>

<style scoped lang="scss">
.home {
    padding: 30px;
    background-color: var(--background-color);
    min-height: 100vh;

    .content {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: flex-start;
    }

    .left-panel,
    .right-panel {
        background-color: var(--panel-background);
        border-radius: 8px;
        @include box-shadow;
        padding: 20px;
        width: 48%;
        @include transition(all);

        &:hover {
            @include hover-effect;
        }
    }
}
</style>
