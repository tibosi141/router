import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // target: 'http://10.50.0.32:8080',
          target: 'http://localhost:8080/',
          changeOrigin: true,
          rewrite: (path) => {
            const reg = new RegExp('^' + env.VITE_APP_BASE_API)
            return path.replace(reg, '/api')
          }
        },
      }
    },
    plugins: [vue()]
  })
}