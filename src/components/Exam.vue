<template>
  <div>
    <bar :title="vueJury.promotion.promo" />

    <v-container>
      <v-card elevation="4" outlined shaped>
        <v-card-title>
          Votre planning pour l'examen {{ vueJury.label }} :
        </v-card-title>

        <v-card-text>
          <v-data-table
            :headers="juryHeaders"
            :items="vueJury.eleve"
            :single-expand="true"
            :expanded.sync="expanded"
            :search="search"
            item-key="token"
            show-expand
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                More info about {{ item.token }}
              </td>
            </template>
          </v-data-table>
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
      search: "",
      expanded: [],
      singleExpand: false,
      juryHeaders: [
        {
          text: "Nom de Famille",
          align: "start",
          sortable: false,
          value: "last_name",
        },
        { text: "Prénom", value: "first_name" },
        { text: "Date de passage", value: "date_exam" },
        { text: "heure de Passage", value: "heurePassage" },
        { text: "email", value: "email" },
        { text: "birthday", value: "birthday" },
        { text: "", value: "data-table-expand" },
      ],
      vueJury: {
        promotion: {
          promo: null,
        },
      },
    };
  },
  components: {
    bar,
  },
  mounted() {
    this.dataJury();
  },
  methods: {
    dataJury: async function () {
      var res = await planningData.getDataJury(
        "$2y$10$anhYdb2X01jOytT4.0FPO.uXTZScO.s3OYapBK78j9EOew0wxYLTm"
      );
      console.log(res.data.data);
      this.vueJury = res.data.data;
    },
  },
};
</script>