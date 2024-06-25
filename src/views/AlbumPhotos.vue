<template>
  <div>
    <q-page>
      <h1 class="album-title">Photos in Album {{ albumId }}</h1>
      <div class="photo-list">
        <q-card
          v-for="photo in photos"
          :key="photo.id"
          class="photo-item"
          @click="openModal(photo)"
          flat
          bordered
        >
          <q-img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-thumbnail" />
          <q-card-section class="photo-title">{{ photo.title }}</q-card-section>
        </q-card>
      </div>
      <PhotoModal v-if="selectedPhoto" :show="showModal" :photo="selectedPhoto" @close="closeModal" />
    </q-page>
  </div>
</template>

<script>
import axios from 'axios';
import PhotoModal from '../views/PhotoModal.vue';
import { useQuasar } from 'quasar';

export default {
  components: {
    PhotoModal
  },
  data() {
    return {
      photos: [],
      albumId: this.$route.params.id,
      showModal: false,
      selectedPhoto: null
    };
  },
  created() {
    this.fetchPhotos();
  },
  methods: {
    async fetchPhotos() {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${this.albumId}/photos`);
        this.photos = response.data;
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Error fetching photos'
        });
      }
    },
    openModal(photo) {
      this.selectedPhoto = photo;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedPhoto = null;
    }
  },
  watch: {
    '$route.params.id': function(newId) {
      this.albumId = newId;
      this.fetchPhotos();
    }
  }
};
</script>

<style scoped>
.album-title {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #007bff;
}

.photo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.photo-item {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
}

.photo-thumbnail {
  max-width: 150px;
  border-radius: 4px;
}

.photo-title {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
}
</style>
