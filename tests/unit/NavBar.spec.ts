import { shallowMount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';

describe('NavBar.vue', () => {
    it('renders logo and home link', () => {
        const wrapper = shallowMount(NavBar, {
            global: {
                stubs: {
                    'router-link': {
                        template: '<a class="nav-link">Home</a>',
                    },
                },
            },
        });

        expect(wrapper.text()).toContain('🌍 Country Info');

        const link = wrapper.find('.nav-link');
        expect(link.exists()).toBe(true);
        expect(link.text()).toBe('Home');
    });
});
