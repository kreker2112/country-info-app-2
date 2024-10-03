import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import { createStore } from 'vuex';
import flushPromises from 'flush-promises';

describe('Home.vue', () => {
    let store: any;
    let dispatchMock: jest.Mock;

    beforeEach(() => {
        dispatchMock = jest.fn().mockResolvedValue(undefined);

        store = createStore({
            actions: {
                fetchCountries: jest.fn(),
                fetchRandomCountries: jest.fn(),
            },
        });

        jest.spyOn(store, 'dispatch').mockImplementation(dispatchMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('dispatches fetchCountries on mount', async () => {
        shallowMount(Home, {
            global: {
                plugins: [store],
            },
        });

        await flushPromises();

        expect(dispatchMock).toHaveBeenCalledWith('fetchCountries');
    });

    it('dispatches fetchRandomCountries on mount', async () => {
        shallowMount(Home, {
            global: {
                plugins: [store],
            },
        });

        await flushPromises();

        expect(dispatchMock).toHaveBeenCalledWith('fetchRandomCountries');
    });

    it('dispatches both actions on mount', async () => {
        shallowMount(Home, {
            global: {
                plugins: [store],
            },
        });

        await flushPromises();

        expect(dispatchMock).toHaveBeenCalledTimes(2);

        expect(dispatchMock).toHaveBeenCalledWith('fetchCountries');
        expect(dispatchMock).toHaveBeenCalledWith('fetchRandomCountries');
    });
});
