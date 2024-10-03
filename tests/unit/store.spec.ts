import store from '@/store';
import axios from 'axios';

jest.mock('axios');

describe('Vuex Store', () => {
    it('fetches countries and commits them', async () => {
        const countries = [{ countryCode: 'US', name: 'United States' }];
        (axios.get as jest.Mock).mockResolvedValue({ data: countries });

        await store.dispatch('fetchCountries');
        expect(store.state.countries).toEqual(countries);
    });

    it('fetches random countries and commits them', async () => {
        const countries = [
            { countryCode: 'US', name: 'United States', holidays: [] },
        ];
        (axios.get as jest.Mock).mockResolvedValue({ data: countries });

        await store.dispatch('fetchRandomCountries');
        expect(store.state.randomCountries.length).toBe(1);
    });
});
