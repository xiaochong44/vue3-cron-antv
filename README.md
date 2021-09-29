# vue3-cron-antv
> 基于vue-cron-generator修改而来的Cron表达式生成器

## 安装
``` bash
# 安装ant-design-vue
npm install ant-design-vue@next

# 安装vue3-cron-antv
npm install vue3-cron-antv

```
## 使用(例子代码)
> main.ts
``` typescript
import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import  Vue3Cron  from 'vue3-cron-antv'
import 'vue3-cron-antv/dist/index.css'

createApp(App).use(Vue3Cron).mount('#app')

```
> Vue文件

``` vue
<script setup lang="ts">
import { ref } from 'vue';
let cronstr=ref('3-7 0 12 * * ? *')

</script>

<template>
  <vue-cron v-model:value="cronstr"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>

```
