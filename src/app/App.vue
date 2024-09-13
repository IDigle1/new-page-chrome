<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import ru from 'element-plus/es/locale/lang/ru'
import { RouterView } from 'vue-router';
</script>

<template>
  <ElConfigProvider :locale="ru">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
