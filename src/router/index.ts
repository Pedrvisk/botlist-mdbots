import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from './middlewares/isAuthenticated';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/privacy-terms',
    name: 'privacy-terms',
    component: () => import('../views/Privacy&Terms.vue')
  },
  {
    path: '/bots/add',
    name: 'bots-add',
    component: () => import('../views/bots/BotsAdd.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: () => import('../views/auth/Callback.vue')
  },
  {
    path: '/:notFound(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0, behavior: 'smooth' };
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) isAuthenticated(to, from, next);
  else next();
});

export default router;
