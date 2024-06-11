import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/Main.vue';
import About from '../components/About.vue';
import Info from '../components/Info.vue';
import Search from '../components/Search.vue';

const routes = [
    { path: '/', component: Main },
    { path: '/about', component: About },
    { path: '/about/:name', component: About },
    { path: '/info', component: Info },
    { path: '/search', component: Search }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
