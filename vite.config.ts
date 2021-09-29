import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import  {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import styleImport from 'vite-plugin-style-import'
import postcss from 'rollup-plugin-postcss'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'packages/index.ts',
      name: 'Vue3Cron'
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue','ant-design-vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    cssCodeSplit:true
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss:{
      
    }
  },
  plugins: [
    vue(),
    Components({resolvers:[AntDesignVueResolver()]}),
    styleImport({
      libs:[
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          },
        },
      ]
    })
  ]
})
