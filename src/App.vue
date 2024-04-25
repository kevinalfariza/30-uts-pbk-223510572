<template>
  <div class="todo-app">
    <h1 class="todo-title">Cucian gile mas kevin dan danu</h1>
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Tambahkan nama" class="todo-input">
    <ul class="todo-list">
      <li v-for="(todo, index) in filteredTodos" :key="index" :class="{ completed: todo.completed }" class="todo-item">
        <input type="checkbox" v-model="todo.completed" class="todo-checkbox">
        <span @click="toggleCompleted(index)" class="todo-text" :class="{ 'completed-text': todo.completed }">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="todo-remove">Hapus</button>
      </li>
    </ul>
    <div class="filter-container">
      <input type="checkbox" id="showCompleted" v-model="showCompleted" class="show-completed" @change="filterTodos">
      <label for="showCompleted" class="show-completed-label">yang belum dicuci</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      showCompleted: false
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleCompleted(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
    filterTodos() {
      if (this.showCompleted) {
        this.todos = this.todos.filter(todo => !todo.completed);
      }
    }
  },
  computed: {
    filteredTodos() {
      return this.todos;
    }
  }
}
</script>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.todo-title {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.todo-input {
  width: calc(100% - 40px);
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-list {
  padding: 0;
}

.todo-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.todo-text {
  cursor: pointer;
}

.completed-text {
  text-decoration: line-through;
  color: #999;
}

.todo-remove {
  padding: 8px 16px;
  background-color: #ff5a5f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.todo-remove:hover {
  background-color: #d00004;
}

.todo-checkbox {
  margin-right: 10px;
}

.show-completed-label {
  margin-left: 5px;
}
</style>
