<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Edit Event</h2>
    <form @submit.prevent="updateEvent" class="space-y-4">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Event Name</label>
        <input
          id="name"
          v-model="event.name"
          type="text"
          placeholder="Event Name"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Event Description</label>
        <textarea
          id="description"
          v-model="event.description"
          placeholder="Event Description"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="location" class="block text-sm font-medium text-gray-700">Event Location (URL)</label>
        <input
          id="location"
          v-model="event.location"
          type="url"
          placeholder="Event Location"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>

      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">Event Date</label>
        <input
          id="date"
          v-model="event.date"
          type="date"
          placeholder="Event Date"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>

      <div class="mb-4">
        <label for="time" class="block text-sm font-medium text-gray-700">Event Time</label>
        <input
          id="time"
          v-model="event.time"
          type="time"
          placeholder="Event Time"
          class="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>

      <div class="flex justify-between">
        <router-link to="/admin" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Back to Dashboard</router-link>
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update Event
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
      event: {
        name: '',
        description: '',
        location: '',
        date: '',
        time: '',
      },
    };
  },
  async created() {
    const eventId = this.$route.params.id;
    try {
      const response = await axios.get(`/events/${eventId}`);
      this.event = response.data;
    } catch (error) {
      console.error('Failed to load event details:', error);
      alert('Failed to load event details');
    }
  },
  methods: {
    async updateEvent() {
      const eventId = this.$route.params.id;
      try {
        await axios.put(`/events/${eventId}`, this.event);
        this.$router.push('/admin');
      } catch (error) {
        console.error('Failed to update event:', error);
        alert('Failed to update event');
      }
    },
  },
};
</script>
