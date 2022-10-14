import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { getCookie } from '@/utils/auth'

// 路由白名单
const whiteRoute: Array<string> = ['/', '/root', '/home', '/layout', '/index', '/login']
// 业务路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index/index.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    components: {
      default: () => import('@/views/detail/index.vue'),
      details: () => import('@/components/details.vue'),
      question: () => import('@/components/question.vue'),
      comments: () => import('@/components/comments.vue'),
    }
  },
  {
    path: '/draw',
    name: 'Draw',
    component: () => import('@/views/draw/index.vue')
  }
]
// 系统默认路由
const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: { name: 'Index' },
    alias: ['/root', '/home', '/layout'],
    children: routes
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes
})

router.beforeEach((to, from, next) => {
  const userInfo = getCookie('userInfo')

  if (to.name === 'Login' && userInfo) {
    next(from)
  } else if (whiteRoute.includes(to.path) || userInfo) {
    next()
  } else {
    next({
      name: 'Login',
      query: {
        fromPath: to.path
      }
    })
  }
})

export default router