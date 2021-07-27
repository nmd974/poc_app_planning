<template>
  <div id="planning" class="container">
    <div v-if="planning.length > 0" class="mb-5 display-2">
      Bonjour, {{ planning[0].first_name}} {{ planning[0].last_name}}
    </div>
    <ul class="list-group" >
      <li 
        class="list-group-item disabled d-flex justify-content-between w-100" 
        v-show="planning.length > 0" 
        v-for="plan in planning" :key="plan.id"       
      >
          <div>{{ plan.label }} </div>
          <div>{{ plan.start.substr(11,8) }} - {{ plan.end.substr(11,8) }} </div>
      </li>
      <li class="list-group-item disabled" v-if="planning.length === 0">Vous n'avez pas d'activités prévues aujourd'hui</li>
    </ul>
  </div>
</template>

<script>
import planningData from "../service/planning.js";

export default {
  data() {
    return { 
      planning: [] 
    };
  },
  mounted(){
    this.fetchData();
  },
  methods:{
    async fetchData () {
      try {
        var response = await planningData.fetchDataPlanning(this.$route.params.id)
        response.data.forEach(el => {
          this.planning.push(el);
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
