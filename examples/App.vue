<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
let cronstr=ref('3-7 0 12 * * ? *')
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div style="width: 600px;margin: auto;">
    <vue-cron v-model:value="cronstr"/>
  </div>
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
