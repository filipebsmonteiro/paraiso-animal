import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// eslint-disable-next-line no-undef
const Dir = __dirname;
const ENV = process.env.VITE_VERCEL_ENV && [`development`, `preview`].includes(process.env.VITE_VERCEL_ENV)
  ? `development`
  : process.env.NODE_ENV;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      ...process.env,
      __APP_ENV__: ENV,
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": `${resolve(Dir, `src`)}/`,
    },
  },
})
