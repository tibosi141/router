import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import Layout from '@/layout/index.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    transition?: string
  }
}

// 路由白名单
const whiteRoute: Array<string> = ['/', '/root', '/home', '/layout', '/index', '/login', '/covid19', '/draw']
// 业务路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/detail/index.vue'),
    meta: {
      title: '商品详情页',
    },
  },
  {
    path: '/draw',
    name: 'Draw',
    component: () => import('@/views/draw/index.vue'),
    meta: {
      title: '词云页',
    },
  },
]
// 系统默认路由
const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: { name: 'Index' },
    alias: ['/root', '/home', '/layout'],
    children: routes,
    meta: {
      title: '家',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页',
    },
  },
  {
    path: '/covid19',
    name: 'Covid19',
    component: () => import('@/views/covid19/index.vue'),
    meta: {
      title: '实时更新：全国新冠疫情',
    },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getToken()

  if (to.name === 'Login' && token) {
    next(from)
  } else if (whiteRoute.includes(to.path) || token) {
    next()
  } else {
    ElMessageBox.confirm('请先登录再进行访问！', '网页提示', {
      confirmButtonText: '登录',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(() => {
        next({
          name: 'Login',
          query: {
            redirect: to.path,
          },
        })
      })
      .catch(() => {
        ElMessage.info('您取消了登录！')
        next({ name: 'Home' })
      })
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
  NProgress.done()
})

export default router
