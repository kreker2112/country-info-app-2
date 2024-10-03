import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        countries: [],
        randomCountries: [],
        holidays: [],
        selectedYear: new Date().getFullYear(),
    },
    mutations: {
        SET_COUNTRIES(state, countries) {
            state.countries = countries;
        },
        SET_RANDOM_COUNTRIES(state, countries) {
            state.randomCountries = countries;
        },
        SET_HOLIDAYS(state, holidays) {
            state.holidays = holidays;
        },
        SET_SELECTED_YEAR(state, year) {
            state.selectedYear = year;
        },
    },
    actions: {
        async fetchCountries({ commit }) {
            try {
                const response = await axios.get(
                    `${process.env.VUE_APP_API_BASE_URL}/AvailableCountries`,
                );
                commit('SET_COUNTRIES', response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        },
        async fetchRandomCountries({ commit, state }) {
            try {
                const response = await axios.get(
                    `${process.env.VUE_APP_API_BASE_URL}/AvailableCountries`,
                );

                const randomCountries = response.data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                for (const country of randomCountries) {
                    const holidaysResponse = await axios.get(
                        `${process.env.VUE_APP_PUBLIC_HOLIDAYS_URL}/${state.selectedYear}/${country.countryCode}`,
                    );
                    country.holidays = holidaysResponse.data;
                }

                commit('SET_RANDOM_COUNTRIES', randomCountries);
            } catch (error) {
                console.error(
                    'Error fetching random countries and holidays:',
                    error,
                );
            }
        },
        async fetchHolidays({ commit, state }, { countryCode }) {
            try {
                const response = await axios.get(
                    `${process.env.VUE_APP_PUBLIC_HOLIDAYS_URL}/${state.selectedYear}/${countryCode}`,
                );
                commit('SET_HOLIDAYS', response.data);
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        },
    },
});

export default store;
