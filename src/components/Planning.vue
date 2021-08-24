<template>
  <div >
    <bar :title="planning.promotion.promo" />

    <v-container>
      <v-card elevation="4" outlined shaped>
        <v-card-title> 
          Bonjour {{ planning.first_name }} {{ planning.last_name }},
        </v-card-title>

        <v-card-text>
          <dataTable></dataTable>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import dataTable from "@/components/element/DataTable.vue"
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
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () {
      var res = await planningData.getDataUser(
        "$2y$10$ZbI.GaOvYuj33000HS5Mye.x.lld7o09okZNTtZEfkHzEKc0utQA2"
      );
      this.planning = res.data.data;
      console.log(this.planning);
    },
    changeMinToHours: function (data) {
      var nbHour = parseInt(data / 60);
      var nbminuteRestante = data % 60;
      if (nbminuteRestante == 0) {
        return nbHour + "h";
      } else {
        return nbHour + "h" + nbminuteRestante;
      }
      return 675 / 60;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
