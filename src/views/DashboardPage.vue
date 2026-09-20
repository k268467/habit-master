<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/habit'

const todoStore = useTodoStore()
const newTodoText = ref('')
const streakDays = ref(18)

const handleAdd = () => {
  if (newTodoText.value.trim() === '') return

  todoStore.addTodo(newTodoText.value)
  newTodoText.value = ''
}
</script>

<template>
  <div class="todo-app">
    <section class="habit-summary">
      <div class="summary-card highlight">
        <span class="label">継続日数</span>
        <strong class="value">{{ streakDays }}日</strong>
        <small>この調子で続けています</small>
      </div>
    </section>

    <h1>📝 タスク管理（リロードしても消えない）</h1>

    <div class="input-area">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="新しいタスクを入力..."
        @keyup.enter="handleAdd"
      />
      <button @click="handleAdd">追加</button>
    </div>

    <ul>
      <li v-for="item in todoStore.todos" :key="item.id">
        <span>{{ item.text }}</span>
        <button @click="todoStore.deleteTodo(item.id)" class="delete-btn">削除</button>
      </li>
    </ul>

    <p v-if="todoStore.todos.length === 0">タスクはありません。上のフォームから追加してください！</p>
  </div>
</template>

<style scoped>
.todo-app {
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

.summary-card.highlight {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
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

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
}

button {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
}

button:nth-of-type(1) {
  background: #4f46e5;
  color: white;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>

