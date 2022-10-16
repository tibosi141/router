import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  console.log(mode);
  console.log(loadEnv(mode, process.cwd()))

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://10.50.0.32:8080',
          changeOrigin: true,
        }
      }
    },
    plugins: [vue()]
  })
}