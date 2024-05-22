<template>
    <div class="todo-app">
      <h1 class="todo-title">Todo List</h1>
      <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" class="todo-input">
      <ul class="todo-list">
        <li v-for="(todo, index) in filteredTodos" :key="index" :class="{ completed: todo.completed }" class="todo-item">
          <input type="checkbox" v-model="todo.completed" class="todo-checkbox">
          <span @click="toggleCompleted(index)" class="todo-text" :class="{ 'completed-text': todo.completed }">{{ todo.text }}</span>
          <button @click="removeTodo(index)" class="todo-remove">hapus</button>
        </li>
      </ul>
      <div class="filter-container">
        <input type="checkbox" id="showCompleted" v-model="showCompleted" class="show-completed" @change="filterTodos">
        <label for="showCompleted" class="show-completed-label">lihat yang sudah selesai</label>
      </div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    props: ['initialTodos'],
    data() {
      return {
        newTodo: '',
        todos: this.initialTodos,
        showCompleted: true
      };
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim() !== '') {
          this.todos.push({ text: this.newTodo, completed: false });
          this.newTodo = '';
          this.$emit('update-todos', this.todos);
        }
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
        this.$emit('update-todos', this.todos);
      },
      toggleCompleted(index) {
        this.todos[index].completed = !this.todos[index].completed;
        this.$emit('update-todos', this.todos);
      },
      filterTodos() {
        return this.todos.filter(todo => this.showCompleted || !todo.completed);
      }
    },
    computed: {
      filteredTodos() {
        return this.filterTodos();
      }
    }
  }
  </script>
  