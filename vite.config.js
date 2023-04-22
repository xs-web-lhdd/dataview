import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types')
      },
      {
        find: '@',
        replacement: pathResolve('src')
      },
    ],
    dedupe: ['vue']
  },
  plugins: [vue()],
  server: {
    host: true,
    open: true,
    // 开发服务器端口
    port: 4000,
    // proxy: {
    //   [axiosPre]: {
    //     // @ts-ignore
    //     // target: loadEnv(mode, process.cwd()).VITE_DEV_PATH,
    //     target: loadEnv(mode, process.cwd()).VITE_SERVER_PATH,
    //     changeOrigin: true,
    //     // ws: true,
    //     // secure: true,
    //   }
    // }
  },
})
