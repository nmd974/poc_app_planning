const app = Vue.createApp({
  data() {
    return { 
      planning: [] 
    };
  },
  methods:{
    async fetchData () {
      try {
        var response = await axios.get(`http://127.0.0.1:80/activities/1`);
        console.log(response.data);
        this.planning = response.data;
      } catch (error) {
        console.log(error);
      }
      // this.planning = axios.get(`http://127.0.0.1:80/activities/1`).then();
      // console.log(axios.get(`http://127.0.0.1:80/activities/1`));
      // let xhr = new XMLHttpRequest();
      // xhr.open("GET", `http://127.0.0.1:80/activities/1`);
      // xhr.responseType = "json";
      // xhr.send();
      // const that = this;
      // xhr.onload = function(){
      //     if (xhr.status != 200){ 
      //         alert("Erreur " + xhr.status + " : " + xhr.statusText);
      //     }else{ 
      //         console.log(xhr);
      //         var response = xhr.response;
      //         response.forEach(element => {
      //           that.planning.push(element);
      //         });
              
      //     } 
      // };
      // xhr.onerror = function(){
      //     alert("La requête a échoué");
      // };
    }
  }
});

app.mount('#planning');
