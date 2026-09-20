<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    showBackButton?: boolean
  }>(),
  {
    title: 'Habit Master',
    showBackButton: false
  }
)
</script>

<template>
  <header class="app-header">
    <div class="left">
      <button v-if="showBackButton" class="nav-btn">←</button>
      <div class="brand">Habit Master</div>
    </div>

    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 150px;
}

.brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: #111827;
}

.title {
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  color: #6b7280;
  letter-spacing: 0.04em;
}

.nav-btn {
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  background: #f3f4f6;
  color: #374151;
}
</style>
