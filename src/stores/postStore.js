// stores/postStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [],
    users: [],
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  },
  getters: {
    getPostsByUser: (state) => (userId) => {
      if (!userId) {
        return state.posts;
      }
      return state.posts.filter(post => post.userId === parseInt(userId));
    },
    getAuthorName: (state) => (userId) => {
      const user = state.users.find(user => user.id === userId);
      return user ? user.name : 'Unknown';
    }
  }
});
