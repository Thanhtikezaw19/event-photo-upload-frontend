<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
    <h2 class="text-2xl font-semibold mb-6">Create New Event</h2>

    <form @submit.prevent="createEvent">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Event Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="name" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Event Description</label>
        <textarea 
          id="description" 
          v-model="description" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <div class="flex justify-between">
        <button 
        @click="goBack" 
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Back
      </button>
        <button 
          type="submit" 
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      name: '',
      description: '',
    };
  },
  methods: {
    async createEvent() {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        alert('You need to be logged in to create an event.');
        return;
      }

      const newEvent = {
        name: this.name,
        description: this.description,
        user_id: user.id,
      };

      try {
        await axios.post('/events', newEvent);
        alert('Event created successfully!');
        this.$router.push('/');
      } catch (error) {
        alert('Failed to create event.');
      }
    },
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
