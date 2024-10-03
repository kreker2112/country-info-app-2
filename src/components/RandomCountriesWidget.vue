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
        font-size: 24px;
        margin-bottom: 20px;
        color: #2c3e50;
    }

    .country-card {
        background: linear-gradient(135deg, #42b983 0%, #2c3e50 100%);
        color: white;
        border-radius: 10px;
        padding: 20px;
        margin: 10px 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        h3 {
            margin-bottom: 10px;
            font-size: 20px;
            color: #fff;
        }

        p {
            font-size: 16px;
            margin: 5px 0;
            color: #f9f9f9;

            &:nth-of-type(2) {
                font-size: 14px;
                color: #d3e4e8;
            }
        }
    }
}
</style>
