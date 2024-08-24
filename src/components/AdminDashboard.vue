<template>
  <div class="p-6">
    <LogoutButton />
    <h2 class="text-2xl font-bold mb-4">Admin Dashboard</h2>

    <div v-for="event in events" :key="event.id" class="mb-8">
      <div class="border mb-4 rounded pt-4">
        <h3 class="text-xl font-semibold mb-4">{{ event.name }}</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="photo in event.photos" :key="photo.id" class="p-4 border border-gray-200 rounded shadow-sm">
          <img :src="getPhotoUrl(photo.photo_url)" alt="Event Photo" class="w-full h-48 object-cover rounded mb-2" />
          <p class="text-sm text-gray-600 mb-2">Status: {{ photo.status }}</p>
          <div class="flex justify-center space-x-2">
            <button @click="approvePhoto(photo.id)" class="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600">Approve</button>
            <button @click="rejectPhoto(photo.id)" class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Reject</button>
            <button @click="deletePhoto(photo.id)" class="bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600">Delete</button>
          </div>
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
import LogoutButton from './LogoutButton.vue';

export default {
  components: { LogoutButton },
  data() {
    return {
      events: [],
      backendUrl: process.env.VUE_APP_BACKEND_URL ? process.env.VUE_APP_BACKEND_URL : '',
    };
  },
  async created() {
    try {
      const response = await axios.get('/events');
      this.events = response.data;
    } catch (error) {
      alert('Failed to load events');
    }
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    getPhotoUrl(photoUrl) {
      return `${this.backendUrl}${photoUrl}`;
    },
    async approvePhoto(photoId) {
      try {
        await axios.patch(`/photos/${photoId}/approve`);
        this.$router.go();
      } catch (error) {
        alert('Failed to approve photo');
      }
    },
    async rejectPhoto(photoId) {
      try {
        await axios.patch(`/photos/${photoId}/reject`);
        this.$router.go();
      } catch (error) {
        alert('Failed to reject photo');
      }
    },
    async deletePhoto(photoId) {
      try {
        await axios.delete(`/photos/${photoId}`);
        this.$router.go();
      } catch (error) {
        alert('Failed to delete photo');
      }
    },
  },
};
</script>
