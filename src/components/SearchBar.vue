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
    background-color: #f5f7fa;
    border-radius: 8px;
    border: 1px solid #e6e6e6;

    input {
        padding: 10px;
        width: 100%;
        max-width: 350px;
        border: 1px solid #ddd;
        border-radius: 20px;
        font-size: 15px;
        background-color: #fff;
        color: #2c3e50;
        transition: border-color 0.2s ease;

        &:focus {
            border-color: #4caf50;
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
        border: 1px solid #ddd;

        .country-item {
            padding: 10px 15px;
            cursor: pointer;
            background-color: #fff;
            border-bottom: 1px solid #e6e6e6;
            color: #333;
            transition:
                background-color 0.2s ease,
                color 0.2s ease;

            &:hover {
                background-color: #eaf2e3;
                color: #2c3e50;
            }

            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
