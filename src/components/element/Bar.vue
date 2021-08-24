<template>
    <v-app-bar color="#03718D" app>
      <v-img
        class="mx-2"
        src="@/assets/logo.png"
        max-height="50"
        max-width="50"
        contain
      ></v-img>
      
      <v-toolbar-title class="ml-2 white--text font-weight-bold" >
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>
</template>
<script>
export default {
  name: "bar",
  props: ["title"],
};
</script>