import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
// 引入pinia持久化插件
import piniaPersist from 'pinia-plugin-persist'

import elementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
import './style.css'

const elementOptions = { locale: zhCn }
const app = createApp(App)
const pinia = createPinia()
// 使用该插件
pinia.use(piniaPersist)

app.use(router).use(pinia).use(elementPlus, elementOptions).mount('#app')
