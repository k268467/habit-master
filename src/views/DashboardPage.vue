<script setup>
import { useRouter } from 'vue-router'
import { useHabitStore } from '../stores/habit'

const router = useRouter()
const habitStore = useHabitStore()
const streakDays = 18
</script>

<template>
  <div class="habit-app">
    <section class="habit-summary">
      <div class="summary-card highlight">
        <span class="label">継続日数</span>
        <strong class="value">{{ streakDays }}日</strong>
        <small>この調子で続けています</small>
      </div>
    </section>

    <div class="habit-header-row">
      <h1>習慣一覧</h1>
      <button class="add-btn" @click="router.push({ name: 'HabitCreate' })">新しい習慣を追加</button>
    </div>

    <ul class="habit-list">
      <li v-for="habit in habitStore.habits" :key="habit.id" class="habit-item">
        <div class="habit-main">
          <span class="habit-name">{{ habit.name }}</span>
          <span class="habit-time">{{ habit.time }}</span>
        </div>

        <div class="habit-actions">
          <button class="edit-btn" @click="router.push({ name: 'HabitEdit', params: { id: habit.id } })">編集</button>
          <button @click="habitStore.deleteHabit(habit.id)" class="delete-btn">削除</button>
        </div>
      </li>
    </ul>

    <p v-if="habitStore.habits.length === 0" class="empty-state">習慣はまだありません。</p>
  </div>
</template>

<style scoped>
.habit-app {
  max-width: 440px;
  margin: 50px auto;
  font-family: sans-serif;
  color: #1f2937;
}

.habit-summary {
  margin-bottom: 28px;
  display: flex;
  justify-content: center;
}

.summary-card {
  width: 72%;
  max-width: 340px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 18px;
  padding: 24px 20px;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.12);
}

.label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 10px;
  letter-spacing: 0.04em;
}

.value {
  display: block;
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.06em;
}

small {
  display: block;
  margin-top: 10px;
  font-size: 0.82rem;
  opacity: 0.9;
}

.habit-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.habit-header-row h1 {
  margin: 0;
  font-size: 1.4rem;
}

.add-btn,
.edit-btn,
.delete-btn {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.add-btn {
  background: #4f46e5;
  color: white;
  padding: 10px 12px;
  font-weight: 700;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25);
}

.add-btn:hover {
  background: #4338ca;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.3);
}

.habit-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.habit-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px 12px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

.habit-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
}

.habit-name {
  font-size: 1rem;
  font-weight: 700;
}

.habit-time {
  font-size: 0.85rem;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 6px 10px;
}

.habit-actions {
  display: flex;
  gap: 8px;
}

.edit-btn {
  background: #eef2ff;
  color: #4338ca;
  padding: 7px 10px;
}

.delete-btn {
  background: #fee2e2;
  color: #b91c1c;
  padding: 7px 10px;
}

.empty-state {
  margin-top: 18px;
  color: #6b7280;
}
</style>

