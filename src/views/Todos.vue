<template>
    <div class="q-pa-md q-gutter-md">
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">CUCIAN MOTOR</div>
        </q-card-section>
  
        <q-card-section>
          <q-input filled v-model="newTodo" label="Masukkan data" @keyup.enter="addTodo" />
        </q-card-section>
  
        <q-card-section>
          <q-btn toggle round unelevated color="primary" @click="toggleShowCompleted">
            {{ showCompleted ? 'Lihat semua' : 'Lihat yang sudah' }}
          </q-btn>
        </q-card-section>
  
        <q-card-section>
          <q-list>
            <q-item v-for="todo in filteredTodos" :key="todo.id" clickable v-ripple>
              <q-item-section avatar>
                <q-checkbox v-model="todo.completed" @change="updateTodoStatus(todo)" />
              </q-item-section>
              <q-item-section>
                <q-item-label :class="{ 'completed-text': todo.completed }">{{ todo.text }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn dense flat round icon="delete" color="negative" @click="removeTodo(todo.id)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
  
        <q-card-section class="q-mt-md">
          <div class="text-subtitle1">Total motor yang belum dicuci: {{ todosPending }}</div>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useTodosStore } from '../stores/todoStore';
  
  export default {
    setup() {
      const store = useTodosStore();
      const newTodo = ref('');
      const showCompleted = ref(false);
  
      const addTodo = () => {
        if (newTodo.value.trim() !== '') {
          store.addTodo(newTodo.value);
          newTodo.value = '';
        }
      };
  
      const removeTodo = (id) => {
        store.removeTodoById(id);
      };
  
      const updateTodoStatus = (todo) => {
        store.updateTodoStatus(todo);
      };
  
      const toggleShowCompleted = () => {
        showCompleted.value = !showCompleted.value;
      };
  
      const todos = computed(() => store.todos);
      const filteredTodos = computed(() =>
        showCompleted.value ? todos.value.filter((todo) => todo.completed) : todos.value
      );
      const todosPending = computed(() => store.todosPending);
  
      return {
        newTodo,
        showCompleted,
        addTodo,
        removeTodo,
        updateTodoStatus,
        toggleShowCompleted,
        filteredTodos,
        todosPending,
      };
    },
  };
  </script>
  
  <style scoped>
  .my-card {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .completed-text {
    text-decoration: line-through;
    color: #999;
  }
  </style>
  