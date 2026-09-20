<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'

const route = useRoute()

const headerTitle = computed(() => {
  if (route.name === 'Auth') return 'ログイン'
  return 'ダッシュボード'
})

const showBackButton = computed(() => route.name === 'Auth')
</script>

<template>
  <div class="app-shell">
    <AppHeader
      :title="headerTitle"
      :show-back-button="showBackButton"
    />

    <router-view />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f8fafc;
}
</style>