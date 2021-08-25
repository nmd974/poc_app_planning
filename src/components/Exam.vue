<template>
  <div >
    <bar :title="vueJury.promotion.promo" />

    <v-container>
      <v-card elevation="4" outlined shaped>
        <v-card-title> 
           Votre planning pour l'examen {{ vueJury.label }}
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
import planningData from "@/service/planning.js";
export default {
  data() {
    return {
      vueJury : {
        promotion:{
          promo:null
        }
      }
    }
  },
    components:{
        bar,
    },
    mounted() {
      this.dataJury()
    },
    methods: {
      dataJury: async function () {
        var res = await planningData.getDataJury("$2y$10$anhYdb2X01jOytT4.0FPO.uXTZScO.s3OYapBK78j9EOew0wxYLTm")
        console.log(res.data.data);
        this.vueJury = res.data.data
      }
    },
}
</script>