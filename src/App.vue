<template>
  <!-- App.vue -->
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main class="grey">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
  },

  data: () => ({
    connected: true,
  }),
};
</script>
