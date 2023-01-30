import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 8866,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://127.0.0.1:3000/',
          changeOrigin: true,
          rewrite: path => {
            const reg = new RegExp('^' + env.VITE_APP_BASE_API)
            return path.replace(reg, '')
          },
        },
      },
    },
    plugins: [vue(), ElementPlus()],
  })
}
