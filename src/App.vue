<template>
  <div>
    <header>
      <nav>
        <ul>
          <li :class="{ active: view === 'todos' }" @click="view = 'todos'">Todos</li>
          <li :class="{ active: view === 'posts' }" @click="view = 'posts'">Posts</li>
        </ul>
      </nav>
    </header>

    <div v-if="view === 'todos'" class="main-container">
      <div class="todo-app">
        <h1 class="todo-title">Todo List</h1>
        <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" class="todo-input">
        <ul class="todo-list">
          <li v-for="(todo, index) in filteredTodos" :key="index" :class="{ completed: todo.completed }" class="todo-item">
            <input type="checkbox" v-model="todo.completed" class="todo-checkbox">
            <span @click="toggleCompleted(index)" class="todo-text" :class="{ 'completed-text': todo.completed }">{{ todo.text }}</span>
            <button @click="removeTodo(index)" class="todo-remove">Remove</button>
          </li>
        </ul>
        <div class="filter-container">
          <input type="checkbox" id="showCompleted" v-model="showCompleted" class="show-completed" @change="filterTodos">
          <label for="showCompleted" class="show-completed-label">Show Completed</label>
        </div>
      </div>
    </div>
    <div v-else-if="view === 'posts'" class="posts-app">
      <h1 class="posts-title">User Posts</h1>
      <select v-model="selectedUser" @change="fetchPosts" class="user-select">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul class="post-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-body">{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: 'todos',
      newTodo: '',
      todos: [],
      showCompleted: true,
      users: [],
      selectedUser: null,
      posts: []
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
      return this.todos.filter(todo => this.showCompleted || !todo.completed);
    },
    async fetchUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await response.json();
    },
    async fetchPosts() {
      if (this.selectedUser) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.posts = await response.json();
      }
    }
  },
  computed: {
    filteredTodos() {
      return this.filterTodos();
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

header {
  background-color: rgba(0, 123, 255, 0.8); 
  padding: 10px 0;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
  margin: 0;
}

nav ul li {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  color: #fff;
}

nav ul li.active {
  background-color: rgba(0, 86, 179, 0.8); 
}

.main-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(0, 123, 255, 0.8); 
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
  list-style: none;
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

.posts-title {
  margin: 20px auto;
  font-size: 24px;
  text-align: center;
}

.user-select {
  width: calc(100% - 40px);
  padding: 12px;
  margin: 0 auto 20px auto;
  display: block;
  border: 1px solid #4e1d1d;
  border-radius: 4px;
  background-color: aqua;
}

.post-list {
  padding: 0;
  overflow-y: auto;
  list-style: none;
  margin: 0 20px;
  background-color: rgba(0, 123, 255, 0.8); 
  color: whitesmoke;
}

.post-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-item h2 {
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #333;
}

.post-item p {
  margin: 0;
  font-size: 16px;
  color: #666;
}
</style>
