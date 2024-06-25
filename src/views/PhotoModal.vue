<template>
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <img :src="photo.url" :alt="photo.title" class="photo-full" />
        <p class="photo-title">{{ photo.title }}</p>
        <button @click="close" class="close-button">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      },
      photo: {
        type: Object,
        required: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    position: relative;
  }
  
  .photo-full {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 8px;
  }
  
  .photo-title {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    background: #ff5a5f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .close-button:hover {
    background: #d00004;
  }
  </style>
  