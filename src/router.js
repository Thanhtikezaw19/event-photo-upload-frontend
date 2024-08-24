import { createRouter, createWebHistory } from 'vue-router';


import Login from './components/UserLogin.vue';
import Register from './components/UserRegister.vue';
import Homepage from './components/HomePage.vue';
import AdminDashboard from './components/AdminDashboard.vue';
import MemberDashboard from './components/MemberDashboard.vue';
import EventDetail from './components/EventDetail.vue';
import EditEvent from './components/EditEvent.vue';
import NotFound from './components/NotFound.vue';
import CreateEvent from './components/CreateEvent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'admin' },
    },
    {
      path: '/member',
      name: 'MemberDashboard',
      component: MemberDashboard,
      meta: { requiresAuth: true, role: 'member' },
    },
    {
      path: '/event/create',
      name: 'CreateEvent',
      component: CreateEvent,
      meta: { requiresAuth: true },
    },
    {
      path: '/events/:id/edit',
      name: 'EditEvent',
      component: EditEvent,
      meta: { requiresAuth: true, role: 'member' },
    },
    {
      path: '/events/:id',
      name: 'EventDetail',
      component: EventDetail,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { guest: true },
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user.role

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.guest && isAuthenticated) {
    next('/');
  } else if (to.meta.role && to.meta.role !== userRole) {
    next('/');
  } else {
    next();
  }
});

export default router;
