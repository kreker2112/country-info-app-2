import { shallowMount } from '@vue/test-utils';
import RandomCountriesWidget from '@/components/RandomCountriesWidget.vue';
import { createStore } from 'vuex';

describe('RandomCountriesWidget.vue', () => {
    let store: any;

    beforeEach(() => {
        store = createStore({
            state: {
                randomCountries: [
                    { alpha2Code: 'US', name: 'United States', holidays: [] },
                ],
            },
        });
    });

    it('renders random countries from store', () => {
        const wrapper = shallowMount(RandomCountriesWidget, {
            global: {
                plugins: [store],
            },
        });
        expect(wrapper.text()).toContain('United States');
    });
});
