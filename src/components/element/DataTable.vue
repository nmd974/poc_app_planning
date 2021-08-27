<template>
  <v-data-table
    :headers="examHeaders"
    :items="examData"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :search="search"
    item-key="heure_exam"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Votre Planning d'examen</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      
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

    <!-----------Slot Extend tab---------------------- -->
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-timeline align-top dense>
          <v-timeline-item
            :color="
              changeColorTimeline(
                item.date_exam,
                addTimeWithTimeStartEnMin(item.heure_exam, item.activities, index),
                addTimeWithTimeStartEnMin(item.heure_exam, item.activities, index+1),
                heuredeFinExamEnmin(item.heure_exam, item.activities)
              )
            "
            small
            v-for="(activitie, index) in item.activities"
            :key="index"
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>{{
                  addTimeWithTimeStart(item.heure_exam, item.activities, index)
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

    <!-----------Slot time_start---------------------- -->
    <template v-slot:item.heure_exam="{ item }">
      {{ changeMinToHours(item.heure_exam) }}
    </template>

    <!-----------Slot time_start---------------------- -->
    <template v-slot:item.etat="{ item }">
      <v-chip
        class="ma-2 font-weight-bold"
        :color="changeColorChips(
          changeEtat(item.date_exam, heuredeFinExamEnmin(item.heure_exam, item.activities), item.heure_exam)
        )"
        text-color="white"
      >
        {{ changeEtat(item.date_exam, heuredeFinExamEnmin(item.heure_exam, item.activities), item.heure_exam)}}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ["examData"],
  methods: {

    changeColorTimeline(date_exam, time, timeNest, timeEnd) {
      var dateDuJour = new Date().toISOString().substr(0, 10);
      dateDuJour = this.changeFormatDate(dateDuJour);
      var hours = new Date().toTimeString().substr(0, 2);
      var hoursNowToMin = hours * 60 + (new Date().toTimeString().substr(3, 2)*1)
      if (date_exam == dateDuJour) {
        if(hoursNowToMin == time) {
          return 'orange'
        }
        if(hoursNowToMin > time) {
          if(hoursNowToMin < timeNest){
            return 'orange'
          }
          if(!timeNest) {
            console.log(timeEnd)
            if(hoursNowToMin > timeEnd) {
              return 'grey'
            }
            return 'orange'
          }
          return 'grey'
        }

      } else if (date_exam < dateDuJour) {
        return "blue-grey darken-1";
      } else {
        return "#03718D";
      }
    },

    changeFormatDate: function (date) {
      var newDate = date.split("-");
      newDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];

      return newDate;
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

    changeEtat: function (date, timeEnd, timeStart) {
      var hours = new Date().toTimeString().substr(0, 2);
      var hoursNowToMin = hours * 60 + (new Date().toTimeString().substr(3, 2)*1)
      var dateDuJour = new Date().toISOString().substr(0, 10);
      
      dateDuJour = this.changeFormatDate(dateDuJour);

      if (dateDuJour == date) {
        if(hoursNowToMin > timeEnd) {
          return "Terminé"
        }
        if(hoursNowToMin < timeStart) {
          return "Prochainement"
        }
        return "En Cours";
      } else if (dateDuJour < date) {
        return "Prochainement";
      } else {
        return "Terminé";
      }
    },

    heuredeFinExamEnmin: function (heureDebut, activities) {
      var dureTotal = 0
      var heureFinExam

      for (let index = 0; index < activities.length; index++) {
        const duration = activities[index].duration;
        dureTotal = duration +  dureTotal
      }

      heureFinExam = heureDebut + dureTotal

      return heureFinExam
    },

    addTimeWithTimeStart: function (heureDepart, dataActivitie, index) {
      var timeStart = heureDepart;

      if (index == 0) {
        return this.changeMinToHours(heureDepart);
      }

      for (let i = 1; i < dataActivitie.length; i++) {
        const element = dataActivitie[i-1];
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
        const element = dataActivitie[i-1];
        timeStart = element.duration + timeStart;

        if (i == index) {
          return timeStart;
        }
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
  
  data() {
    return {
      search: "",
      color: "#03718D",
      etat: null,
      expanded: [],
      singleExpand: true,
      examHeaders: [
        {
          text: "Nom de l'examen",
          align: "start",
          sortable: false,
          value: "label",
        },
        { text: "Date", value: "date_exam" },
        { text: "Heure", value: "heure_exam" },
        { text: "Etat", value: "etat" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
};
</script>
<style>
.v-data-table>.v-data-table__wrapper tbody tr.v-data-table__expanded__content {
    box-shadow: none;
}
.v-application .elevation-2 {
    box-shadow: none;
}
</style>