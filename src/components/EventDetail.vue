<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">{{ event.name }}</h2>
    <p class="text-gray-700 mb-6">{{ event.description }}</p>

    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-2">Upload Photo</h3>
      <form @submit.prevent="uploadPhoto" class="bg-gray-100 p-4 rounded-md">
        <div class="mb-4">
          <input 
            type="file" 
            @change="onFileChange" 
            required 
            class="w-full text-gray-700 bg-white border border-gray-300 rounded-md p-2"
          />
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-4">Photos</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="photo in photos" :key="photo.id" class="relative">
          <img :src="fullPhotoUrl(photo.photo_url)" alt="Event Photo" class="w-full h-48 object-cover rounded-lg" />
          <p class="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-sm p-2">{{ photo.status }}</p>
        </div>
      </div>
    </div>

    <button 
      @click="goBack" 
      class="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      Back to Events
    </button>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      event: {},
      photos: [],
      photoFile: null,
    };
  },
  async created() {
    const eventId = this.$route.params.id;
    try {
      const response = await axios.get(`/events/${eventId}`);
      this.event = response.data;
      const photosResponse = await axios.get(`/events/${eventId}/photos`);
      this.photos = photosResponse.data;
    } catch (error) {
      alert('Failed to load event details');
    }
  },
  methods: {
    fullPhotoUrl(photoUrl) {
      return `${photoUrl}`;
    },
    onFileChange(event) {
      this.photoFile = event.target.files[0];
    },
    async uploadPhoto() {
      const formData = new FormData();
      formData.append('photo_url', this.photoFile);

      try {
        const response = await axios.post(`/events/${this.event.id}/photos`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.photos.push(response.data.photo);
        this.photoFile = null;
      } catch (error) {
        alert('Failed to upload photo');
      }
    },
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>
