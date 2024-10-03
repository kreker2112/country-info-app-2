import {
    createRouter,
    createWebHashHistory,
    RouteLocationNormalized,
} from 'vue-router';
import Home from '@/views/Home.vue';
import Country from '@/views/Country.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/country/:name',
        name: 'Country',
        component: Country,
        props: (route: RouteLocationNormalized) => ({
            countryCode: route.params.name,
        }),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
