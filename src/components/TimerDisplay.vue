<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHabitStore } from '../stores/habit'

const route = useRoute()
const router = useRouter()
const habitStore = useHabitStore()

const selectedHabit = computed(() => {
  const habitId = Number(route.params.id)
  return habitStore.getHabitById(habitId) ?? null
})

const habitName = computed(() => selectedHabit.value?.name ?? '朝の散歩')

const durationSeconds = computed(() => {
  const timeText = selectedHabit.value?.time ?? '00:10'
  const [minutes, seconds] = timeText.split(':').map(Number)

  if (Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return 10
  }

  return Math.max(minutes * 60 + seconds, 0)
})

const totalSeconds = computed(() => Math.max(durationSeconds.value, 0))
const remainingSeconds = ref(totalSeconds.value)
const isRunning = ref(false)
const isPaused = ref(false)

let timerId: number | null = null

function stopTimer() {
  isRunning.value = false
  isPaused.value = false
  if (timerId) {
    window.clearInterval(timerId)
    timerId = null
  }
  remainingSeconds.value = totalSeconds.value
}

function pauseTimer() {
  if (!isRunning.value) return
  isRunning.value = false
  isPaused.value = true
  if (timerId) {
    window.clearInterval(timerId)
    timerId = null
  }
}

function completeHabitSession() {
  const habitId = Number(route.params.id)
  const habit = habitStore.getHabitById(habitId)

  if (habit) {
    habitStore.updateHabit(habitId, {
      name: habit.name,
      time: habit.time,
      streakDays: habit.streakDays + 1
    })
  }

  router.push({ name: 'Dashboard', query: { celebrate: '1' } })
}

function startTimer() {
  if (isRunning.value) return

  isRunning.value = true
  isPaused.value = false

  if (timerId) {
    window.clearInterval(timerId)
  }

  timerId = window.setInterval(() => {
    if (remainingSeconds.value > 0) {
      remainingSeconds.value -= 1
      return
    }

    window.clearInterval(timerId ?? undefined)
    timerId = null
    isRunning.value = false
    isPaused.value = false
    completeHabitSession()
  }, 1000)
}

watch(
  () => durationSeconds.value,
  () => {
    stopTimer()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (timerId) {
    window.clearInterval(timerId)
  }
})

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const progress = computed(() => {
  if (totalSeconds.value === 0) return 0
  return ((totalSeconds.value - remainingSeconds.value) / totalSeconds.value) * 100
})
</script>

<template>
  <div class="timer-page">
    <div class="timer-card">
      <p class="label">実行中の習慣</p>
      <h1>{{ habitName }}</h1>

      <div class="circle-wrap">
        <div class="timer-ring" :style="{ '--progress': progress }">
          <div class="timer-inner">
            <div class="timer-time">{{ formattedTime }}</div>
            <div class="timer-status">
              {{ isRunning ? '実行中' : isPaused ? '一時停止' : '待機中' }}
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button class="primary" @click="startTimer">開始</button>
        <button class="secondary" @click="pauseTimer">中断</button>
        <button class="ghost" @click="stopTimer">停止</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #f5f3ff 0%, #f8fafc 100%);
  padding: 24px;
}

.timer-card {
  width: min(100%, 420px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(79, 70, 229, 0.12);
  padding: 32px 24px;
}

.label {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
  text-align: center;
}

h1 {
  margin: 12px 0 24px;
  text-align: center;
  font-size: 2rem;
  color: #111827;
}

.circle-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.timer-ring {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: conic-gradient(#4f46e5 calc(var(--progress) * 1%), #e5e7eb 0);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.timer-ring::before {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  background: white;
}

.timer-inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.timer-time {
  font-size: 2.7rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #111827;
}

.timer-status {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #6b7280;
}

.controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

button {
  border: none;
  border-radius: 12px;
  padding: 12px 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
}

.primary {
  background: #4f46e5;
  color: white;
}

.secondary {
  background: #f3f4f6;
  color: #374151;
}

.ghost {
  background: #fee2e2;
  color: #b91c1c;
}

</style>
