import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Habit = {
  id: number
  name: string
  time: string
  streakDays: number
}

const initialHabits: Habit[] = [
  {
    id: 1,
    name: '早朝ランニング',
    time: '06:30',
    streakDays: 18
  },
  {
    id: 2,
    name: '英単語学習',
    time: '20:00',
    streakDays: 11
  }
]

export const useHabitStore = defineStore('habit', () => {
  const habits = ref<Habit[]>(initialHabits)

  function addHabit(newHabit: { name: string; time: string; streakDays: number }) {
    habits.value.push({
      id: Date.now(),
      ...newHabit
    })
  }

  function updateHabit(
    id: number,
    updatedHabit: { name: string; time: string; streakDays: number }
  ) {
    const target = habits.value.find(habit => habit.id === id)
    if (!target) return

    target.name = updatedHabit.name
    target.time = updatedHabit.time
    target.streakDays = updatedHabit.streakDays
  }

  function deleteHabit(id: number) {
    habits.value = habits.value.filter(habit => habit.id !== id)
  }

  function getHabitById(id: number) {
    return habits.value.find(habit => habit.id === id)
  }

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitById
  }
}, {
  persist: true
})
