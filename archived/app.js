const app = Vue.createApp({
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
        var response = await axios.get(`http://127.0.0.1:80/planning/${document.location.search.slice(3)}`);
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
