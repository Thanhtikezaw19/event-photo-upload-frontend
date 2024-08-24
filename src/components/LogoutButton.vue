<template>
  <a
    href="#"
    @click.prevent="logout"
    class="fixed top-4 right-4"
  >
    Logout
  </a>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Optional: Add additional styling if needed */
</style>
