import { defineStore } from 'pinia';

export const useTodosStore = defineStore({
  id: 'todos',
  state: () => ({
    todos: [],
  }),
  getters: {
    totalTodos() {
      return this.todos.length;
    },
    todosPending() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  actions: {
    addTodo(newTodo) {
      this.todos.push({ id: Date.now(), text: newTodo, completed: false });
    },
    removeTodoById(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    updateTodoStatus(todo) {
      todo.completed = !todo.completed;
    },
    toggleShowCompleted(state) {
      state.showCompleted = !state.showCompleted;
    },
    setTodos(todos) {
      this.todos = todos;
    }
  }
});
