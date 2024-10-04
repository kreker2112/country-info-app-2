<template>
    <div class="random-countries-widget">
        <h2>Random Countries Widget</h2>
        <div
            v-for="country in randomCountries"
            :key="country.alpha2Code"
            class="country-card"
        >
            <h3>{{ country.name }}</h3>
            <p>
                Next Holiday:
                {{ getNextHoliday(country.holidays)?.name || 'N/A' }}
            </p>
            <p>
                Date:
                {{ getNextHoliday(country.holidays)?.date || 'N/A' }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

interface Holiday {
    name: string;
    date: string;
}

interface Country {
    alpha2Code: string;
    name: string;
    holidays: Holiday[];
}

const store = useStore();

const randomCountries = computed<Country[]>(() => {
    return store.state.randomCountries;
});

const getNextHoliday = (holidays: Holiday[]): Holiday | undefined => {
    const today = new Date();
    return holidays
        ?.filter((holiday) => new Date(holiday.date) > today)
        ?.sort(
            (a: Holiday, b: Holiday) =>
                new Date(a.date).getTime() - new Date(b.date).getTime(),
        )[0];
};
</script>

<style scoped lang="scss">
.random-countries-widget {
    margin-top: 20px;
    text-align: left;

    h2 {
        font-size: var(--heading-font-size);
        margin-bottom: 20px;
        color: var(--heading-color);
        cursor: default;
    }

    .country-card {
        background: var(--country-card-background);
        color: var(--country-card-color);
        border-radius: 10px;
        padding: 20px;
        margin: 10px 0;
        @include transition(transform, box-shadow);
        cursor: pointer;

        &:hover {
            transform: translateY(-5px);
            @include hover-effect;
        }

        h3 {
            margin-bottom: 10px;
            font-size: 20px;
            color: var(--country-card-h3);
        }

        p {
            font-size: var(--body-font-size);
            margin: 5px 0;
            color: var(--light-gray);

            &:nth-of-type(2) {
                font-size: var(--small-font-size);
                color: var(--light-gray);
            }
        }
    }
}
</style>
