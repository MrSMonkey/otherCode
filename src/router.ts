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
  const viewArr: any[] = view.split('/');
  viewArr[viewArr.length - 1] = firstUpperCase(viewArr[viewArr.length - 1]);
  view = viewArr.join('/');
  return () => import(/* webpackChunkName: "view-[request]" */ `./views${view}.vue`);
};

const createRouters = (list: any, dirname?: string) => {
  const routers = [];
  for (const item of list) {
    let childrenRoutes: any[] = [];
    if (item.children && item.children.length > 0 ) {
      childrenRoutes = createRouters(item.children, `${dirname}/${item.path}`);
    }
    routers.push({
      path: dirname !== '' ? item.path : `/${item.path}`,
      name: `${item.path}`,
      meta: `${item.title}`,
      component: loadView(`${dirname}/${item.path}`),
      children: childrenRoutes
    });
  }
  return routers;
};

router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'index', component: Home, meta: '星空业主服务号' },
    ...createRouters(componentsList, '')
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

  // const token: any = localStorage.getItem('siteToken');
  // if (!token) {
  //   // 非登陆状态
  //   if (to.path !== '/bind' && to.path !== '/entrust' && to.path !== '/entrustPlan' && to.path !== '/') {
  //     // 除了登录页 && 在线委托页 && 星级房屋托管计划，其他将跳转到登陆页
  //     router.push('/bind');
  //   }
  //   next();
  // }
  next();
});

export default router;

