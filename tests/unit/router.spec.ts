import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Country from '@/views/Country.vue';

describe('Vue Router', () => {
    const routes = [
        { path: '/', component: Home },
        { path: '/country/:name', component: Country },
    ];

    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    });

    it('routes to Home view', async () => {
        router.push('/');
        await router.isReady();
        expect(router.currentRoute.value.path).toBe('/');
    });

    it('routes to Country view with param', async () => {
        await router.push('/country/US');
        await router.isReady();
        expect(router.currentRoute.value.params.name).toBe('US');
    });
});
