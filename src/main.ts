import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 引入pinia持久化插件
import piniaPersist from 'pinia-plugin-persist'

import './style.css'

const app = createApp(App)
const pinia = createPinia()
// 使用该插件
pinia.use(piniaPersist)

app.use(router).use(pinia).mount('#app')
