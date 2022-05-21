const homeTop = Vue.createApp({
    data(){
        return{
            logo: 'https://cdn.discordapp.com/attachments/629532011148607499/969324650750427196/unknown.png',
            user: '',
            pass: '',
            login: 'login',
        }
    },
    methods: {

    },
 });
 homeTop.mount('#homeTop')

 const homeBot = Vue.createApp({
    data(){
        return{
            img: 'https://cdn.discordapp.com/attachments/629532011148607499/969324696434782209/unknown.png',
            desc: 'desc temp',
            nombre: '',
            correo: '',
            año: '',
            mes: '',
            dia: '',
            pass: '',
            passcon: '',
            registro: 'Registrarme!',
            equal: false
        }
    },
    methods: {
        handleSubmit() {
            if (this.pass == this.passcon) {
                this.equal = true;
                console.log(this.equal);
                axios
              .post("http://localhost:3000/users", { //aqui va la db
                nombre: this.nombre,
                correo: this.correo,
                año: this.año,
                mes: this.mes,
                dia: this.dia,
                pass: this.pass
              })
              .then((response) => {
                const data = response.data;
                this.users.push(data); //tabla de la db
                this.nombre = "";
                this.correo = "";
                this.año = "";
                this.mes = "";
                this.dia = "";
                this.pass = "";
                this.equal = false;
              });
            } else {
                this.equal = false;
            }  
        },
   }
 });
 homeBot.mount('#homeBot')