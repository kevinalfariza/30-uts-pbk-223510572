import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../views/Todos.vue';
import Post from '../views/Post.vue';
import AlbumList from '../views/AlbumList.vue';
import AlbumPhotos from '../views/AlbumPhotos.vue';

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos,
    props: { initialTodos: [] } // You can set your initial todos here
  },
  {
    path: '/posts',
    name: 'Post',
    component: Post
  },
  {
    path: '/albums',
    name: 'AlbumList',
    component: AlbumList
  },
  {
    path: '/albums/:id',
    name: 'AlbumPhotos',
    component: AlbumPhotos
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
