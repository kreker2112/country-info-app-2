import { shallowMount } from '@vue/test-utils';
import SearchBar from '@/components/SearchBar.vue';
import { createStore } from 'vuex';

describe('SearchBar.vue', () => {
    let store: any;

    beforeEach(() => {
        store = createStore({
            state: {
                countries: [
                    { countryCode: 'US', name: 'United States' },
                    { countryCode: 'GB', name: 'United Kingdom' },
                ],
            },
        });
    });

    it('filters countries by search query', async () => {
        const wrapper = shallowMount(SearchBar, {
            global: {
                plugins: [store],
            },
        });
        const input = wrapper.find('input');
        await input.setValue('United');
        expect(wrapper.text()).toContain('United States');
        expect(wrapper.text()).toContain('United Kingdom');
    });
});
