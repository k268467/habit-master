import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<{ id: number; text: string }[]>([])

  function addTodo(newText: string) {
    todos.value.push({ id: Date.now(), text: newText })
  }

  function updateTodo(id: number, newText: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.text = newText
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  return { todos, addTodo, updateTodo, deleteTodo }
}, {
  persist: true
})