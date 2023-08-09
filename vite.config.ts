import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// eslint-disable-next-line no-undef
const Dir = __dirname;
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      ...process.env,
      __APP_ENV__: process.env.VITE_VERCEL_ENV || process.env.NODE_ENV,
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": `${resolve(Dir, `src`)}/`,
    },
  },
})
