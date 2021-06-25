const app = Vue.createApp({
  data() {
    return { 
      planning: [] 
    };
  },
  watch:{
    planning(value){
      return value;
    }
  },
  // computed:{
  //   display(){
  //     this.fetchData();
  //     if(this.planning.length > 0){
  //       return this.planning;
  //     }else{
  //       this.planning.push("Vous n'avez pas d'activités aujourd'hui");
  //     }
  //   }
  // },
  methods:{
    async fetchData () {
      try {
        var response = await axios.get(`http://127.0.0.1:80/planning/1`);
        response.data.forEach(el => {
          console.log(el);
          this.planning.push(el);
        })
        console.log(this.planning);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

app.mount('#planning');
