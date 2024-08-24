<template>
  <div class="p-6">
    <LogoutButton />

    <h1 class="text-3xl font-bold mb-4">Event Lists</h1>
    <router-link :to="`/event/create`" class="underline color-blue py-2 px-4 ">Create a new event</router-link>
    <br>
    <!-- Events Table -->
    <table class="w-full mt-6 border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 p-2 text-center" style="width: 20%;">Event Name</th>
          <th class="border border-gray-300 p-2 text-center" style="width: 50%;">Description</th>
          <th class="border border-gray-300 p-2 text-center" style="width: 30%;">Actions</th>
        </tr>
      </thead>
      <tbody style="max-width: 90%;">
        <tr v-for="event in events" :key="event.id">
          <td class="border border-gray-300 p-2" style="width: 20%;">
            <router-link :to="`/events/${event.id}`" class="text-blue-500 font-semibold">{{ event.name }}</router-link>
          </td>
          <td class="border border-gray-300 p-4" style="width: 50%;">
             {{ event.description.length > 60 ? event.description.substring(0, 60) + '...' : event.description }}
          </td>
          <td class="border border-gray-300 p-0" style="width: 30%;">
            <div v-if="userRole === 'member'" class="flex justify-center">
              <router-link :to="`/events/${event.id}/edit`" class="underline color-blue py-2 px-4 ">Edit Event</router-link>
            </div>
            <div v-else-if="userRole === 'admin'">
              <router-link to="/admin" class="underline color-blue py-2 px-4 ">Go to Admin Dashboard</router-link>
              <button @click="deleteEvent(event.id)" class="underline color-red py-2 px-4 ml-4">Delete Event</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
      userRole: '',
    };
  },
  async created() {
    try {
      const eventsResponse = await axios.get('/events');
      this.events = eventsResponse.data;
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.userRole = user.role;
      }
      //const userResponse = await axios.get('/user');
      //this.userRole = userResponse.data.role;
    } catch (error) {
      alert('Failed to load events');
    }
  },
  methods: {
    async deleteEvent(eventId) {
      if (confirm('Are you sure you want to delete this event?')) {
        try {
          await axios.delete(`/events/${eventId}`);
          this.events = this.events.filter(event => event.id !== eventId);
          alert('Event deleted successfully!');
        } catch (error) {
          alert('Failed to delete event');
        }
      }
    },
  },
};
</script>
