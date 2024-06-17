import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import VModel from '../components/VModel.vue';
import VModelNumber from '../components/VModelNumber.vue';
import InfiniteScroll from '../components/InfiniteScroll.vue';

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/v-model', component: VModel, meta: { title: 'v-model 예제' } },
    { path: '/v-model-number', component: VModelNumber, meta: { title: 'v-model.number 예제' } },
    { path: '/infinite-scroll', component: InfiniteScroll, meta: { title: '무한 스크롤 예제' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우트의 메타 데이터에서 제목을 설정
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } else {
        document.title = '메인 - Vue 라우터 예제';
    }
    next();
});

export default router;
