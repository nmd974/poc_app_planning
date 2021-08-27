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
                <v-banner single-line>
                  l'élève est né le <strong>{{ item.birthday }}</strong> et est joignable :
                  <strong>{{ item.email }}</strong>
                </v-banner>

                <v-timeline align-top dense>
                  <v-timeline-item
                    :color="
                      changeColorTimeline(
                        item.date_exam,
                        addTimeWithTimeStartEnMin(
                          item.heurePassage,
                          vueJury.activities,
                          index
                        ),
                        addTimeWithTimeStartEnMin(
                          item.heurePassage,
                          vueJury.activities,
                          index + 1
                        ),
                        heuredeFinExamEnmin(
                          item.heurePassage,
                          vueJury.activities
                        )
                      )
                    "
                    small
                    v-for="(activitie, index) in vueJury.activities"
                    :key="index"
                  >
                    <v-row class="pt-1">
                      <v-col cols="3">
                        <strong>{{
                          addTimeWithTimeStart(
                            item.heurePassage,
                            vueJury.activities,
                            index
                          )
                        }}</strong>
                      </v-col>
                      <v-col>
                        <strong>{{ activitie.exam }}</strong>
                        <div class="text-caption">
                          La durée est de {{ activitie.duration }} minutes
                        </div>
                      </v-col>
                    </v-row>
                  </v-timeline-item>
                </v-timeline>
              </td>
            </template>

            <template v-slot:item.heurePassage="{ item }">
              {{ changeMinToHours(item.heurePassage) }}
            </template>

            <template v-slot:item.statut="{ item }">
              <v-chip
                class="ma-2 font-weight-bold"
                :color="
                  changeColorChips(
                    changeEtat(
                      item.date_exam,
                      heuredeFinExamEnmin(
                        item.heurePassage,
                        vueJury.activities
                      ),
                      item.heurePassage
                    )
                  )
                "
                text-color="white"
              >
                {{
                  changeEtat(
                    item.date_exam,
                    heuredeFinExamEnmin(item.heurePassage, vueJury.activities),
                    item.heurePassage
                  )
                }}
              </v-chip>
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
        { text: "Statut", value: "statut" },
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
    addTimeWithTimeStart: function (heureDepart, dataActivitie, index) {
      var timeStart = heureDepart;

      if (index == 0) {
        return this.changeMinToHours(heureDepart);
      }

      for (let i = 1; i < dataActivitie.length; i++) {
        const element = dataActivitie[i - 1];
        timeStart = element.duration + timeStart;

        if (i == index) {
          return this.changeMinToHours(timeStart);
        }
      }
    },
    addTimeWithTimeStartEnMin: function (heureDepart, dataActivitie, index) {
      var timeStart = heureDepart;

      if (index == 0) {
        return heureDepart;
      }

      for (let i = 1; i < dataActivitie.length; i++) {
        const element = dataActivitie[i - 1];
        timeStart = element.duration + timeStart;

        if (i == index) {
          return timeStart;
        }
      }
    },
    changeColorTimeline(date_exam, time, timeNest, timeEnd) {
      var dateDuJour = new Date().toISOString().substr(0, 10);
      dateDuJour = this.changeFormatDate(dateDuJour);
      var hours = new Date().toTimeString().substr(0, 2);
      var hoursNowToMin =
        hours * 60 + new Date().toTimeString().substr(3, 2) * 1;
      if (date_exam == dateDuJour) {
        if (hoursNowToMin == time) {
          return "orange";
        }
        if (hoursNowToMin > time) {
          if (hoursNowToMin < timeNest) {
            return "orange";
          }
          if (!timeNest) {
            if (hoursNowToMin > timeEnd) {
              return "grey";
            }
            return "orange";
          }
          return "grey";
        }
      } else if (date_exam < dateDuJour) {
        return "blue-grey darken-1";
      } else {
        return "#03718D";
      }
    },

    changeColorChips: function (statut) {
      if (statut == "En Cours") {
        return "orange accent-3";
      }
      if (statut == "Prochainement") {
        return "#03718D";
      }

      return "blue-grey darken-1";
    },

    dataJury: async function () {
      var res = await planningData.getDataJury(this.$route.params.id);
      this.vueJury = res.data.data;
    },

    heuredeFinExamEnmin: function (heureDebut, activities) {
      var dureTotal = 0;
      var heureFinExam;

      for (let index = 0; index < activities.length; index++) {
        const duration = activities[index].duration;
        dureTotal = duration + dureTotal;
      }

      heureFinExam = heureDebut + dureTotal;

      return heureFinExam;
    },

    changeFormatDate: function (date) {
      var newDate = date.split("-");
      newDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];

      return newDate;
    },

    changeEtat: function (date, timeEnd, timeStart) {
      var hours = new Date().toTimeString().substr(0, 2);
      var hoursNowToMin =
        hours * 60 + new Date().toTimeString().substr(3, 2) * 1;
      var dateDuJour = new Date().toISOString().substr(0, 10);

      dateDuJour = this.changeFormatDate(dateDuJour);

      if (dateDuJour == date) {
        if (hoursNowToMin > timeEnd) {
          return "Terminé";
        }
        if (hoursNowToMin < timeStart) {
          return "Prochainement";
        }
        return "En Cours";
      } else if (dateDuJour < date) {
        return "Prochainement";
      } else {
        return "Terminé";
      }
    },

    changeMinToHours: function (data) {
      var nbHour = parseInt(data / 60);
      var nbminuteRestante = data % 60;
      if (nbminuteRestante == 0) {
        if (nbHour < 10) {
          nbHour = "0" + nbHour;
        }
        return nbHour + ":00";
      } else {
        if (nbminuteRestante < 10) {
          nbminuteRestante = "0" + nbminuteRestante;
        }
        if (nbHour < 10) {
          nbHour = "0" + nbHour;
        }
        return nbHour + ":" + nbminuteRestante;
      }
    },
  },
};
</script>
<style >
.v-data-table>.v-data-table__wrapper tbody tr.v-data-table__expanded__content {
    box-shadow: none;
}

</style>