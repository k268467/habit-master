<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHabitStore } from '../stores/habit'

const route = useRoute()
const router = useRouter()
const habitStore = useHabitStore()

const selectedHabitId = ref<number | null>(habitStore.habits[0]?.id ?? null)
const isCelebrating = ref(false)

const selectedHabit = computed(() =>
  habitStore.habits.find(habit => habit.id === selectedHabitId.value) ?? null
)

watch(
  () => habitStore.habits,
  (habits) => {
    if (habits.length === 0) {
      selectedHabitId.value = null
      return
    }

    if (!habits.some(habit => habit.id === selectedHabitId.value)) {
      selectedHabitId.value = habits[0].id
    }
  },
  { immediate: true }
)

watch(
  () => route.query.celebrate,
  (value) => {
    if (value === '1') {
      isCelebrating.value = true

      window.setTimeout(() => {
        isCelebrating.value = false
        router.replace({ name: 'Dashboard' })
      }, 1000)
    }
  },
  { immediate: true }
)

function selectHabit(habitId: number) {
  selectedHabitId.value = habitId
}
</script>

<template>
  <div class="habit-app">
    <section class="habit-summary">
      <div class="summary-card highlight">
        <div class="summary-card-content">
          <div v-if="isCelebrating" class="streak-celebration" aria-hidden="true">
            <span v-for="n in 20" :key="n" class="spark" :style="{ '--x': (Math.random() * 180 - 90) + 'px', '--y': (Math.random() * 180 - 90) + 'px', '--delay': (Math.random() * 0.4) + 's', '--color': ['#fbbf24', '#a78bfa', '#34d399', '#f472b6', '#f97316'][n % 5] }" />
          </div>

          <span class="label">継続日数</span>
          <strong class="value">{{ selectedHabit?.streakDays ?? 0 }}日</strong>
          <small>{{ selectedHabit ? selectedHabit.name : '習慣を選択してください' }}</small>
        </div>

        <button
          v-if="selectedHabit"
          class="run-btn"
          @click="router.push({ name: 'HabitRun', params: { id: selectedHabit.id } })"
        >
          実行
        </button>
      </div>
    </section>

    <div class="habit-header-row">
      <h1>習慣一覧</h1>
      <button class="add-btn" @click="router.push({ name: 'HabitCreate' })">新しい習慣を追加</button>
    </div>

    <ul class="habit-list">
      <li
        v-for="habit in habitStore.habits"
        :key="habit.id"
        class="habit-item"
        :class="{ selected: selectedHabitId === habit.id }"
        @click="selectHabit(habit.id)"
      >
        <div class="habit-main">
          <span class="habit-name">{{ habit.name }}</span>
          <span class="habit-time">{{ habit.time }}</span>
        </div>

        <div class="habit-actions">
          <button class="edit-btn" @click.stop="router.push({ name: 'HabitEdit', params: { id: habit.id } })">編集</button>
          <button @click.stop="habitStore.deleteHabit(habit.id)" class="delete-btn">削除</button>
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
  width: 62%;
  max-width: 300px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 18px;
  padding: 22px 20px 20px;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.12);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.summary-card-content {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.streak-celebration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.spark {
  position: absolute;
  left: 50%;
  top: 55%;
  width: 14px;
  height: 22px;
  border-radius: 999px;
  background: var(--color);
  opacity: 0;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.45);
  animation: streak-burst 1.1s ease-out forwards;
  animation-delay: var(--delay);
}

@keyframes streak-burst {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--x) * 1.8), calc(-50% + var(--y) * 1.8)) scale(1.7) rotate(180deg);
  }
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

.run-btn,
.add-btn,
.edit-btn,
.delete-btn {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
}

.run-btn {
  background: #c7f27a;
  color: #1f2937;
  padding: 8px 16px;
  font-weight: 700;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 6px 14px rgba(168, 230, 80, 0.25);
  width: fit-content;
  align-self: center;
}

.run-btn:hover {
  background: #9adf41;
  box-shadow: 0 8px 18px rgba(122, 214, 52, 0.28);
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
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.habit-item.selected {
  background: #eef2ff;
  border-color: #6366f1;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.12);
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

