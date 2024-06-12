import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/Main.vue';
import About from '../components/About.vue';
import Info from '../components/Info.vue';
import Search from '../components/Search.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/about', component: About, meta: { title: 'About - Vue 라우터 예제' } },
  { path: '/about/:name', name: 'AboutName', component: About, meta: { title: 'About name - Vue 라우터 예제' } },
  { path: '/info', component: Info, meta: { title: 'Info - Vue 라우터 예제' } },
  { path: '/search', component: Search, meta: { title: 'Search - Vue 라우터 예제' } }
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
