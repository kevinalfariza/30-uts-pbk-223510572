import { defineStore } from 'pinia';
import axios from 'axios';

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    photos: [],
  }),
  actions: {
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    async fetchPhotos(albumId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
        this.photos = response.data;
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    },
  },
  getters: {
    getAlbumById: (state) => (id) => {
      return state.albums.find(album => album.id === id);
    },
    getPhotoCountByAlbumId: (state) => (albumId) => {
      return state.photos.filter(photo => photo.albumId === albumId).length;
    },
  },
});
