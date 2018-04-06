import get from 'lodash/get';
import Router from 'vue-router';
import store from './store';
import Vue from 'vue';

import Auth from '@/common/components/auth/index';
import ForgotPassword from '@/common/components/auth/ForgotPassword';
import Home from '@/admin/components/Home';
import Login from '@/common/components/auth/Login';
import NotFound from '@/admin/components/common/NotFound';
import ResetPassword from '@/common/components/auth/ResetPassword';
import Users from '@/admin/components/users/Index';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    meta: { auth: true }
  }, {
    path: '/',
    name: 'auth',
    component: Auth,
    children: [{
      path: 'login',
      name: 'login',
      component: Login
    }, {
      path: 'forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    }, {
      path: 'reset-password/:token',
      name: 'reset-password',
      component: ResetPassword
    }]
  }, {
    path: '/users',
    name: 'users',
    component: Users
  }, {
    // handle 404
    path: '*',
    component: NotFound
  }]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(it => it.meta.auth) && !get(store.state, 'auth.user')) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
