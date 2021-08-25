<template>
  <div >
    <bar title="toto" />

    <v-container>
      <v-card elevation="4" outlined shaped>
        <v-card-title> 
          Bonjour toto,
        </v-card-title>

        <v-card-text>
          toto
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import bar from "@/components/element/Bar.vue";
export default {
    components:{
        bar,
    }
}
</script>