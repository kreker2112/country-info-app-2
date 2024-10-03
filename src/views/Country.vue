<template>
    <div class="country">
        <h1 v-if="countryName">{{ countryName }}</h1>
        <div v-else>
            <p>Loading country data...</p>
        </div>
        <div
            v-if="holidays.length"
            v-for="holiday in holidays"
            :key="holiday.date"
            class="holiday-item"
        >
            <p>
                <strong>{{ holiday.name }}</strong>
            </p>
            <p>{{ holiday.date }}</p>
        </div>
        <div v-if="holidays.length" class="year-switcher">
            <button
                v-for="year in years"
                :key="year"
                @click="switchYear(year)"
                :class="{ active: year === selectedYear }"
            >
                {{ year }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const props = defineProps<{
    countryCode: string;
}>();

const store = useStore();

const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
const holidays = computed(() => store.state.holidays);
const selectedYear = computed(() => store.state.selectedYear);

const countryName = computed(() => {
    const country = store.state.countries.find(
        (country: { countryCode: string }) =>
            country.countryCode === props.countryCode,
    );
    return country ? country.name : props.countryCode;
});

const ensureCountriesLoaded = async () => {
    if (!store.state.countries.length) {
        console.log('Fetching countries...');
        await store.dispatch('fetchCountries');
        console.log('Countries loaded:', store.state.countries);
    }
};

onMounted(async () => {
    await ensureCountriesLoaded();

    if (props.countryCode) {
        store.dispatch('fetchHolidays', {
            countryCode: props.countryCode,
            year: selectedYear.value,
        });
    } else {
        console.error(
            `Country code is undefined or incorrect: ${props.countryCode}`,
        );
    }
});

const switchYear = (year: number) => {
    store.commit('SET_SELECTED_YEAR', year);
    store.dispatch('fetchHolidays', {
        countryCode: props.countryCode,
        year,
    });
};
</script>

<style scoped lang="scss">
.country {
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        margin-bottom: 20px;
        font-size: 26px;
        color: #2c3e50;
        text-align: center;
    }

    .holiday-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 500px;
        background-color: #fff;
        margin: 10px 0;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        transition:
            background-color 0.2s ease,
            box-shadow 0.2s ease;

        p {
            margin: 0;
            font-size: 16px;
            color: #333;
        }

        &:hover {
            background-color: #eaf2e3;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }

    .year-switcher {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid #e6e6e6;

        button {
            margin: 0 5px;
            padding: 10px 20px;
            border: none;
            border-radius: 20px;
            background-color: #007bff;
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition:
                background-color 0.2s ease,
                transform 0.2s ease;

            &:hover {
                background-color: #0056b3;
                transform: scale(1.05);
            }

            &.active {
                background-color: #28a745;
                transform: scale(1.1);
            }
        }
    }
}
</style>
