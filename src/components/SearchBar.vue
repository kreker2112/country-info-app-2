<template>
    <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search Input" />
        <div class="country-list">
            <div
                v-for="country in filteredCountries"
                :key="country.countryCode"
                @click="navigateToCountry(country.countryCode)"
                class="country-item"
            >
                {{ country.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface Country {
    countryCode: string;
    name: string;
}

const store = useStore();
const router = useRouter();
const searchQuery = ref('');

const filteredCountries = computed<Country[]>(() => {
    return store.state.countries
        .filter((country: Country) => country.name)
        .filter((country: Country) =>
            country.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()),
        );
});

const navigateToCountry = (countryCode: string) => {
    if (countryCode) {
        router.push({ name: 'Country', params: { name: countryCode } });
    }
};
</script>

<style scoped lang="scss">
.search-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background-color: var(--background-color);
    border-radius: 8px;
    border: 1px solid var(--border-color);

    input {
        padding: 10px;
        width: 100%;
        max-width: 350px;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        font-size: var(--body-font-size);
        background-color: var(--input-background);
        color: var(--text-color);
        caret-color: var(--input-caret-color);
        @include transition(border-color);

        &:focus {
            border-color: var(--input-focus-color);
            outline: none;
        }
    }

    .country-list {
        width: 100%;
        max-width: 350px;
        margin-top: 10px;
        border-radius: 6px;
        max-height: 180px;
        overflow-y: auto;
        border: 1px solid var(--border-color);

        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-track {
            background: var(--background-color);
            border-radius: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background: linear-gradient(
                to bottom,
                var(--primary-color),
                var(--secondary-color)
            );
            border-radius: 6px;
            border: 2px solid var(--background-color);
        }

        &::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(
                to bottom,
                var(--button-hover-color),
                var(--secondary-color)
            );
        }

        .country-item {
            padding: 10px 15px;
            cursor: pointer;
            background-color: var(--country-item-background-color);
            border-bottom: 1px solid var(--border-color);
            color: var(--text-color);
            @include transition(background-color, color);

            &:hover {
                background-color: var(--hover-background);
                color: var(--heading-color);
            }

            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
