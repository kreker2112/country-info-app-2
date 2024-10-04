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
    background-color: var(--background-color);
    border-radius: 8px;
    @include box-shadow;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        margin-bottom: 20px;
        font-size: var(--heading-font-size);
        color: var(--heading-color);
        text-align: center;
        cursor: default;
    }

    .holiday-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        max-width: 500px;
        background-color: var(--holiday-item-background);
        margin: 10px 0;
        padding: 15px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        cursor: default;
        @include box-shadow;
        @include transition(all);

        p {
            margin: 0;
            font-size: var(--body-font-size);
            color: var(--text-color);
        }

        &:hover {
            background-color: var(--hover-background);
            @include hover-effect;
        }
    }

    .year-switcher {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid var(--border-color);

        button {
            margin: 0 5px;
            padding: 10px 20px;
            border: none;
            border-radius: 20px;
            background-color: var(--primary-color);
            color: var(--year-switcher-button-color);
            font-size: var(--small-font-size);
            cursor: pointer;
            @include transition(background-color, transform);

            &:hover {
                background-color: var(--button-hover-color);
                transform: scale(1.05);
            }

            &.active {
                background-color: var(--button-active-color);
                transform: scale(1.1);
            }
        }
    }
}
</style>
