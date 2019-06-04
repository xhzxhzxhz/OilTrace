import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);


const router = new Router({
 // mode: 'history',
  routes: [
    {
      path: "/home",
      name: "index",
      meta: {
        requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
      },
      redirect:'/manageWork',
      component: ()=>import('./views/Pipeconvey/index.vue'),
      children:[
        {
          path: "/manageWork",
          name: "manageWork",
          meta: {
            requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
          },
          component: ()=>import('./views/manageWork/Home.vue')
        },
        {
          path: "/historyWork",
          name: "historyWork",
          meta: {
            requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
          },
          component: ()=>import('./views/historyWork/historyWork.vue')
        },
        {
          path: "/runData",
          name: "runData",
          meta: {
            requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
          },
          component: ()=>import('./views/runData/runData.vue')
        },
        {
          path: "/analysis",
          name: "analysis",
          meta: {
            requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
          },
          component: ()=>import('./views/analysis/analysis.vue')
        },
        {
          path: "/technics",
          name: "technics",
          meta: {
            requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
          },
          component: ()=>import('./views/technics/technics.vue')
        },
        {
          path: "/sysManage",
          name: "sysManage",
          meta: {
            requireAuth: true,// 添加该字段，表示进入这个路由是需要登录的
          },
          component: ()=>import('./views/sysManage/sysManage.vue')
        },
      ]
    },
    {
      path: "/",
      name: "login",
      component: ()=>import('./views/login/login.vue')
    },
  ]
});
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (sessionStorage.getItem('uid')) {  // 通过vuex state获取当前的token是否存在
//         next();
//       }
//       else {
//           next({
//               path: '/',
//               query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })
export default router;
