import { createApp } from 'vue'
import './style.css'
import '@/assets/css/reset.css'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
// 引入pinia持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'

import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const elementOptions = { locale: zhCn }
const app = createApp(App)
const store = createPinia()
// 使用该插件
store.use(piniaPluginPersist)

app.use(router).use(store).use(elementPlus, elementOptions).mount('#app')
