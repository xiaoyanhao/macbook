import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Desktop from '@/components/Desktop';

Vue.use(Router);

const routes = [{
  path: '/',
  name: 'Hello',
  component: Hello
}, {
  path: '/desktop',
  name: 'Desktop',
  component: Desktop
}];

const router = new Router({
  routes
});

export default router;
