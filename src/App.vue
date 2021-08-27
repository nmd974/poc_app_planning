<template>
  <!-- App.vue -->
  <v-app>
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <!-- Sizes your content based upon application components -->
    <v-main style="background-color:#99DFEC">
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="AppPlanning">
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Aguafina+Script&display=swap');
.application {
  font-family: 'Aguafina Script', cursive;
}
</style>

