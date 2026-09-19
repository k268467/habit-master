<script setup>
import { ref } from 'vue'
// 1. 作成した todo.ts のストアをインポートする
import { useTodoStore } from '../stores/habit'

// 2. ストアを使えるように初期化する
const todoStore = useTodoStore()

// 入力フォームの文字を保持する変数
const newTodoText = ref('')

// 【追加ボタン】が押された時の処理
const handleAdd = () => {
  if (newTodoText.value.trim() === '') return // 空っぽなら何もしない
  
  // ストアの追加アクションを呼び出す
  todoStore.addTodo(newTodoText.value)
  
  newTodoText.value = '' // 入力欄を空にする
}
</script>

<template>
  <div class="todo-app">
    <h1>📝 タスク管理（リロードしても消えない）</h1>

    <!-- タスク入力欄 -->
    <div class="input-area">
      <input 
        v-model="newTodoText" 
        type="text" 
        placeholder="新しいタスクを入力..."
        @keyup.enter="handleAdd"
      />
      <button @click="handleAdd">追加</button>
    </div>

    <!-- タスク一覧表示 -->
    <ul>
      <!-- ストアのデータ（todos）をループして表示 -->
      <li v-for="item in todoStore.todos" :key="item.id">
        <span>{{ item.text }}</span>
        <!-- ストアの削除アクションを呼び出す -->
        <button @click="todoStore.deleteTodo(item.id)" class="delete-btn">削除</button>
      </li>
    </ul>
    
    <p v-if="todoStore.todos.length === 0">タスクはありません。上のフォームから追加してください！</p>
  </div>
</template>

<style scoped>
/* 簡単な見た目の調整（お好みで変更してください） */
.todo-app {
  max-width: 400px;
  margin: 50px auto;
  font-family: sans-serif;
}
.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
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
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
