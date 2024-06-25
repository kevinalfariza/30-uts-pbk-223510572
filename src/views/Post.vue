<template>
    <div>
      <h1 class="post-title">Posts</h1>
      <div class="filter-container">
        <label for="user-filter">Filter by User:</label>
        <select id="user-filter" v-model="selectedUser">
          <option value="">All Users</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <ul class="post-list">
        <li v-for="post in filteredPosts" :key="post.id" class="post-item">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-body">{{ post.body }}</p>
          <p class="post-author">Author: {{ getAuthorName(post.userId) }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { usePostStore } from '../stores/postStore';
  import { mapState, mapActions, mapGetters } from 'pinia';
  import { onMounted } from 'vue';
  
  export default {
    data() {
      return {
        selectedUser: '',
      };
    },
    computed: {
      ...mapState(usePostStore, ['posts', 'users']),
      ...mapGetters(usePostStore, ['getPostsByUser', 'getAuthorName']),
      filteredPosts() {
        return this.getPostsByUser(this.selectedUser);
      }
    },
    methods: {
      ...mapActions(usePostStore, ['fetchPosts', 'fetchUsers']),
    },
    mounted() {
      this.fetchPosts();
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .post-title {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
    color: #007bff;
  }
  
  .filter-container {
    margin-bottom: 20px;
    text-align: center;
  }
  
  #user-filter {
    padding: 8px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-left: 10px;
  }
  
  .post-list {
    padding: 0;
    list-style: none;
    margin: 0;
  }
  
  .post-item {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .post-body {
    font-size: 16px;
    color: #333;
  }
  
  .post-author {
    font-size: 14px;
    color: #666;
  }
  </style>
  