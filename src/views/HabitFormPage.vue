<script setup>
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHabitStore } from '../stores/habit'

const route = useRoute()
const router = useRouter()
const habitStore = useHabitStore()

const isEditMode = computed(() => route.name === 'HabitEdit')

const form = reactive({
  name: '',
  time: '09:00',
  streakDays: 0
})

function fillFormFromHabit() {
  if (!isEditMode.value) {
    form.name = ''
    form.time = '09:00'
    form.streakDays = 0
    return
  }

  const habitId = Number(route.params.id)
  const habit = habitStore.getHabitById(habitId)

  if (!habit) {
    router.push({ name: 'Dashboard' })
    return
  }

  form.name = habit.name
  form.time = habit.time
  form.streakDays = habit.streakDays
}

watch(
  () => route.name,
  () => {
    fillFormFromHabit()
  },
  { immediate: true }
)

watch(
  () => route.params.id,
  () => {
    fillFormFromHabit()
  }
)

function handleSubmit() {
  const name = form.name.trim()

  if (!name) return

  const payload = {
    name,
    time: form.time,
    streakDays: Number(form.streakDays) || 0
  }

  if (isEditMode.value) {
    const habitId = Number(route.params.id)
    habitStore.updateHabit(habitId, payload)
  } else {
    habitStore.addHabit(payload)
  }

  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="habit-form-page">
    <div class="form-card">
      <h1>{{ isEditMode ? '習慣を編集' : '新しい習慣を作成' }}</h1>

      <form class="habit-form" @submit.prevent="handleSubmit">
        <label class="field">
          <span>習慣名</span>
          <input v-model="form.name" type="text" placeholder="例: 朝の散歩" />
        </label>

        <label class="field">
          <span>実行時間</span>
          <input v-model="form.time" type="time" />
        </label>

        <div class="actions">
          <button type="button" class="secondary-btn" @click="router.push('/')">
            キャンセル
          </button>
          <button type="submit" class="primary-btn">{{ isEditMode ? '更新' : '登録' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.habit-form-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f8fafc;
}

.form-card {
  width: min(100%, 440px);
  background: white;
  border-radius: 18px;
  padding: 28px 22px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

h1 {
  margin: 0 0 24px;
  font-size: 1.6rem;
  font-weight: 800;
  color: #111827;
  text-align: center;
}

.habit-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
}

input {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

button {
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
}

.primary-btn {
  flex: 1;
  background: #4f46e5;
  color: white;
}

.secondary-btn {
  flex: 1;
  background: #e5e7eb;
  color: #374151;
}
</style>
