import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import Home from './views/Home.vue';
import EntrustPlan from './views/EntrustPlan.vue';
import { firstUpperCase } from '@/utils/utils';
import { componentsList } from '@/config/config';
Vue.use(Router);

// const componentsList = [
//   'home',
//   'bind',
//   'entrust',
//   'houseList',
//   'businessOpa',
//   'mainFlow',
//   'reportTopic'
// ];
let router!: any;

const loadView = (view: string) => {
  return () => import(/* webpackChunkName: "view-[request]" */ `./views/${view}.vue`);
};

const createRouters = (list: any) => {
  const routers = [];
  for (const item of list) {
    routers.push({
      path: `/${item.path}`,
      name: `${item.path}`,
      meta: `${item.title}`,
      component: loadView(firstUpperCase(`${item.path}`))
    });
  }

  return routers;
};

router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'index', component: Home, meta: '星空业主服务号' },
    { path: '/home', name: 'index', component: Home,  meta: '星空业主服务号' },
    { path: '/entrustPlan', name: 'entrustPlan', component: EntrustPlan,  meta: '星级房屋托管计划' },
    ...createRouters(componentsList)
  ]
});

router.beforeEach((to: any, from: any, next: any) => {
  /* 路由发生变化修改页面title */
  if (to.meta) {
    document.title = to.meta;
  }

  // 未匹配到任何页面, 跳转到404页面
  if (to.matched.length === 0) {
    router.push('/404');
  }
  if (to.path === '/404') {
    next();
    return;
  }

  const token: any = localStorage.getItem('siteToken');
  if (!token) {
    // 非登陆状态
    if (to.path !== '/bind' && to.path !== '/entrust' && to.path !== '/entrustPlan') {
      // 除了登录页 && 在线委托页 && 星级房屋托管计划，其他将跳转到登陆页
      router.push('/bind');
    }
    next();
  }
  next();
});

export default router;

