<template>
  <div id="planning" class="container">
    toto
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
    fetchData : async function () {
      var res = await planningData.getDataUser("$2y$10$ZbI.GaOvYuj33000HS5Mye.x.lld7o09okZNTtZEfkHzEKc0utQA2")
      console.log(res)  
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
