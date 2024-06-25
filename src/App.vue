<template>
  <q-layout view="hHh LpR lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar color="primary">
        <q-toolbar-title>
          UAS KEVIN ALFARIZA
        </q-toolbar-title>
        <q-space />
        <q-btn
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          flat
          dense
          color="white"
          :label="link.label"
          class="text-primary"
        />
      </q-toolbar>
    </q-header>

<<<<<<< HEAD
    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
=======
    <div v-if="view === 'todos'" class="main-container">
      <TodoComponent :initialTodos="todos" @update-todos="updateTodos">
        <!-- Custom content passed to the TodoComponent's slot -->
        <div class="extra-content">
          <p>Additional Content Below the Todo List</p>
        </div>
      </TodoComponent>
    </div>
>>>>>>> 5bfd40b8faae6d9e94c6545b4edca1f5a6b4536a

    <!-- Footer (optional) -->
    <q-footer app>
      <q-toolbar>
        <q-space />
        <span class="text-white">© 2024 Kevin Alfariza</span>
        <q-space />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      links: [
        { to: '/', label: 'Todos' },
        { to: '/posts', label: 'Posts' },
        { to: '/albums', label: 'Albums' }
      ]
    };
  }
};
</script>

<style>
/* Global CSS can be added here */
</style>
