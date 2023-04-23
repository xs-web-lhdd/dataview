// 使用createWebHashHistory的好处：在上线的时候不需要negix的配置
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../view/home/index.vue'

// 引入路径
const importPath = {
  'PreviewEnum.CHART_PREVIEW_NAME': () => import('@/views/preview/wrapper.vue')
}

const routes = [
    {
        name: 'Home',
        path: '/',
        meta: {
            title: '首页'
        },
        component:Home,
    },
    {
        name: 'Login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component:() => import('../view/login/index.vue')
    },
    {
      name: 'Register',
      path: '/register',
      meta: {
          title: '注册'
      },
      component:() => import('../view/register/index.vue')
    },
    {
      name: 'Project',
      path: '/project',
      meta: {
          title: '项目'
      },
      component:() => import('../view/project/index.vue'),
      children: [
        {
          name: 'Welcome',
          path: '/project/welcome',
          meta: {
            title: '欢迎页'
          },
          component: () => import('../view/project/components/welcome/index.vue')
        },
        {
          name: 'Hello',
          path: '/project/hello',
          meta: {
            title: 'hello页'
          },
          component: () => import('../view/project/components/hello/index.vue')
        },
        {
          name: 'Item',
          path: '/project/items',
          meta: {
            title: '全部项目'
          },
          component: () => import('../view/project/components/item/index.vue')
        },
        {
          name: 'published',
          path: '/project/published',
          meta: {
            title: '已发布项目'
          },
          component: () => import('../view/project/components/item/index.vue')
        },
        {
          name: 'unpublish',
          path: '/project/unpublish',
          meta: {
            title: '未发布项目'
          },
          component: () => import('../view/project/components/item/index.vue')
        },
        {
          name: 'TemplateMarket',
          path: '/project/template',
          meta: {
              title: '模板市场'
          },
          component:() => import('../view/templateMarket/index.vue')
        },
      ]
    },
    {
      name: 'WorkBench',
      path: '/workbench',
      meta: {
          title: '工作台页面'
      },
      component:() => import('../view/workbench/index.vue')
    },
    {
      name: 'teach',
      path: '/teach',
      meta: {
        title: '使用教学'
      },
      component: () => import('../view/teach/index.vue')
    },
    {
      path: '/chart/preview/:id(.*)*',
      name: 'ChartPreview',
      // component: importPath['PreviewEnum.CHART_PREVIEW_NAME'],
      component: () => import('@/view/preview/wrapper.vue'),
      meta: {
        title: '预览',
        isRoot: true
      }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// function checkPermission(path) {
//     let hasPermission = router.getRoutes().filter(route => route.path == path).length;
//     if (hasPermission) {
//         return true;
//     } else {
//         return false;
//     }
// }

// // 导航守卫
// router.beforeEach((to, from, next) => {
//     if (checkPermission(to.path)) {
//         document.title = to.meta.title;
//         next()
//     } else {
//         next('/404')
//     }
// })
export default router