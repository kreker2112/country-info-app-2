import { shallowMount } from '@vue/test-utils';
import Country from '@/views/Country.vue';
import flushPromises from 'flush-promises';
import { createStore } from 'vuex';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Country.vue', () => {
    let mockAxios: MockAdapter;
    let store: any;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);

        mockAxios
            .onGet('https://date.nager.at/api/v3/PublicHolidays/2023/US')
            .reply(200, [
                {
                    date: '2023-01-02',
                    localName: "New Year's Day",
                    name: "New Year's Day",
                    countryCode: 'US',
                    fixed: false,
                    global: true,
                    counties: null,
                    launchYear: null,
                    types: ['Public'],
                },
                {
                    date: '2023-01-16',
                    localName: 'Martin Luther King, Jr. Day',
                    name: 'Martin Luther King, Jr. Day',
                    countryCode: 'US',
                    fixed: false,
                    global: true,
                    counties: null,
                    launchYear: null,
                    types: ['Public'],
                },
            ]);

        store = createStore({
            state: {
                countries: [{ countryCode: 'US', name: 'United States' }],
                holidays: [],
                selectedYear: 2023,
            },
            mutations: {
                SET_HOLIDAYS(state, holidays) {
                    state.holidays = holidays;
                },
                SET_COUNTRIES(state, countries) {
                    state.countries = countries;
                },
                SET_SELECTED_YEAR(state, year) {
                    state.selectedYear = year;
                },
            },
            actions: {
                async fetchHolidays({ commit }, { countryCode, year }) {
                    const response = await axios.get(
                        `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
                    );
                    commit('SET_HOLIDAYS', response.data);
                },
                async fetchCountries({ commit }) {
                    commit('SET_COUNTRIES', [
                        { countryCode: 'US', name: 'United States' },
                    ]);
                },
            },
        });
    });

    afterEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    it('fetches holidays on mount and displays country name', async () => {
        const wrapper = shallowMount(Country, {
            global: {
                plugins: [store],
            },
            props: {
                countryCode: 'US',
            },
        });

        await flushPromises();

        const countryNameElement = wrapper.find('h1');
        expect(countryNameElement.exists()).toBe(true);
        expect(countryNameElement.text()).toBe('United States');

        expect(store.state.holidays).toEqual([
            {
                date: '2023-01-02',
                localName: "New Year's Day",
                name: "New Year's Day",
                countryCode: 'US',
                fixed: false,
                global: true,
                counties: null,
                launchYear: null,
                types: ['Public'],
            },
            {
                date: '2023-01-16',
                localName: 'Martin Luther King, Jr. Day',
                name: 'Martin Luther King, Jr. Day',
                countryCode: 'US',
                fixed: false,
                global: true,
                counties: null,
                launchYear: null,
                types: ['Public'],
            },
        ]);
    });
});
