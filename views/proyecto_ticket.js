const ticket = Vue.createApp({
  data(){
      return {
          expedited_by: 0, 
          title: "",
          favour_type: "",
          short_desc: "",
          instructions: "",
          price: 0,
          tips: 0,
          image: "/imgs/tecdashlogo.png",
          start_loc: "",
          end_loc: "",
      }
  },
  methods: {
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    handleSubmitTicket() {
      var url = window.location.origin + '/tickets'
      var data = {  expedited_by: parseInt(this.getCookie('user_id')),
        title: this.title,
        favour_type: this.favour_type,
        short_desc: this.short_desc,
        instructions: this.instructions,
        price: this.price,
        tips: this.tips,
        start_loc: this.start_loc,
        end_loc: this.end_loc
      };

      if (data.tips < 0 || data.price < 0) {
        alert('No puedes poner precios negativos')
      } else {
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data), 
          headers: {
              'Content-Type': 'application/json'
          }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log('Success:', response) )
          .then(() => window.location.replace(window.location.origin + "/profile"))
      }
    },

    changeImage(event) {
      if (event.target.value == "Pedido") {
        this.image = "/imgs/pedido.png";
        console.log(event.target.value)
      } else if (event.target.value == "Vuelta") {
        this.image = "/imgs/vuelta.png";
        console.log(event.target.value)
      } else if (event.target.value == "Entrega") {
        this.image = "/imgs/entrega.png";
        console.log(event.target.value)
      }
    },
 }

  
});
ticket.mount('#ticket')