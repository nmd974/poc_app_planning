const app = Vue.createApp({
  data() {
    return { 
      planning: [] 
    };
  },
  methods:{
    async fetchData () {
      try {
        var response = await axios.get(`http://127.0.0.1:80/planning/1`);
        console.log(typeof response.data);
        this.planning = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
});

app.mount('#planning');
