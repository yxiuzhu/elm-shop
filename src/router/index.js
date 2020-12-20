import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Goods from '../components/goods/Goods.vue';
import Ratings from '../components/ratings/Ratings.vue';
import Seller from '../components/seller/Seller.vue';
import Header from '../components/header/Header.vue';

// 1.安装插件
Vue.use(VueRouter);
Vue.use(VueResource);

// 2.创建router
const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  },
  {
    path: '/header',
    component: Header
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

export default router;
