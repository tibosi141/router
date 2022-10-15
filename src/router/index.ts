import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import Cookies from 'js-cookie'
import Layout from '@/layout/index.vue'

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
  const token = Cookies.get('password')

  if (to.name === 'Login' && token) {
    next(from)
  } else if (whiteRoute.includes(to.path) || token) {
    next()
  } else {
    ElMessageBox.confirm(
      '您还未登录，请先登录再进行访问！',
      '网页提示',
      {
        confirmButtonText: '登录',
        cancelButtonText: '取消',
        type: 'info',
        draggable: true
      }
    )
      .then(() => {
        next({
          name: 'Login',
          query: {
            redirect: to.path
          }
        })
      })
      .catch(() => {
        ElMessage.info('您取消了登录！')
      })
  }
})

export default router