<template>
  <div>
    <q-page>
      <h1 class="album-title">Albums</h1>
      <div class="album-list">
        <q-card
          v-for="album in albums"
          :key="album.id"
          class="album-item"
          flat
          bordered
        >
          <q-card-section>
            <router-link :to="'/albums/' + album.id" class="album-link">{{ album.title }}</router-link>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  data() {
    return {
      albums: [],
    };
  },
  created() {
    this.fetchAlbums();
  },
  methods: {
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Error fetching albums'
        });
      }
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

.album-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.album-item {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.album-link {
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
}

.album-link:hover {
  text-decoration: underline;
}
</style>
