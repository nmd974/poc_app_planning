<template>
  <div >
    <bar v-bind:title="planning.promotion.promo" />

    <v-container>
      <v-card elevation="4" outlined shaped>
        <v-card-title> 
          Bonjour {{ planning.first_name }} {{ planning.last_name }},
        </v-card-title>

        <v-card-text>
          <dataTable :examData="planning.exam"></dataTable>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import dataTable from "@/components/element/DataTable.vue";
import planningData from "@/service/planning.js";
import bar from "@/components/element/Bar.vue";

export default {
  components: {
    bar,
    dataTable,
  },
  data() {
    return {
      planning: {
        promotion: {
          promo: null,
        },
      },
      test: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () {
      var res = await planningData.getDataUser(this.$route.params.id);
      this.planning = res.data.data;
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
