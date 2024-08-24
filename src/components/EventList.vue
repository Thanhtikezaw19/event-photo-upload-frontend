<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Events</h2>

    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="w-full bg-gray-200 text-left">
          <th class="px-6 py-2 text-gray-600">Event Name</th>
          <th class="px-6 py-2 text-gray-600">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id" class="hover:bg-gray-100">
          <td class="px-6 py-2 border-t">
            <router-link :to="`/events/${event.id}`" class="text-blue-500 hover:underline">
              {{ event.name }}
            </router-link>
          </td>
          <td class="px-6 py-2 border-t">
            {{ event.description }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="userRole === 'member'" class="mt-6">
      <h3 class="text-xl font-semibold mb-2">Create Event</h3>
      <form @submit.prevent="createEvent" class="bg-gray-100 p-4 rounded-md">
        <div class="mb-4">
          <input 
            v-model="newEvent.name" 
            type="text" 
            placeholder="Event Name" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <textarea 
            v-model="newEvent.description" 
            placeholder="Event Description" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </form>
    </div>

    <button 
      @click="logout" 
      class="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Logout
    </button>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      events: [],
      newEvent: {
        name: '',
        description: '',
      },
      userRole: '',
    };
  },
  async created() {
    try {
      const response = await axios.get('/events');
      this.events = response.data;
      
      const userResponse = await axios.get('/user');
      this.userRole = userResponse.data.role;
    } catch (error) {
      alert('Failed to load events');
    }
  },
  methods: {
    async createEvent() {
      try {
        await axios.post('/events', this.newEvent);
        this.newEvent.name = '';
        this.newEvent.description = '';
        this.$router.go(); // Refresh the page
      } catch (error) {
        alert('Failed to create event');
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
};
</script>
