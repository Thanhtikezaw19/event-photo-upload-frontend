<template>
  <div class="p-6">
    <LogoutButton />
    <h2 class="text-2xl font-bold mb-4">Member Dashboard</h2>
    <div v-for="event in events" :key="event.id" class="mb-4 p-4 border border-gray-300 rounded">
      <h3 class="text-xl font-semibold">{{ event.name }}</h3>
      <router-link :to="`/events/${event.id}/upload`" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Upload Photo</router-link>
      <div v-if="event.photos.length > 0">
        <h4 class="text-lg font-semibold mt-4">Your Photos</h4>
        <div v-for="photo in event.photos" :key="photo.id" class="mb-2 p-2 border border-gray-200 rounded">
          <img :src="`/storage/photos/${photo.photo_url}`" alt="Event Photo" class="w-full h-auto rounded mb-2" />
          <p>Status: {{ photo.status }}</p>
        </div>
      </div>
    </div>
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
    };
  },
  async created() {
    try {
      const response = await axios.get('/member/events');
      this.events = response.data;
    } catch (error) {
      alert('Failed to load events');
    }
  },
};
</script>
