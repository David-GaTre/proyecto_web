const homeTop = Vue.createApp({
    data(){
        return{
            logo: 'proyecto_web/views/imgs/tecdashlogo.png',
            user: '',
            pass: '',
            login: 'login',
            user_data: '',
            found: false
        }
    },

    methods: {
        handleLogin() {
            var u_data
            var url = 'http://localhost:3000/users/user_check/' + this.user + '&' + this.pass;

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => u_data = data)
            .then(() => document.cookie = "user_id=" + u_data.data.id)
            .then(() => window.location.replace("http://localhost:3000/profile"))
        },
    },
 });
 homeTop.mount('#homeTop')

 const homeBot = Vue.createApp({
    data(){
        return{
            img: 'https://cdn.discordapp.com/attachments/629532011148607499/978822838842708028/20220524_194639.jpg',
            desc: 'TecDash es una aplicación web la cual le permite a estudiantes y colaboradores del tec pedir favores a otras personas dentro del campus. ',
            nombre: '',
            correo: '',
            fecha: '',
            pass: '',
            passcon: '',
            registro: 'Registrarme!',
            equal: false,
        }
    },
    methods: {
        handleSubmit() {
            var mailformat = new RegExp("[a-zA-Z0-9]+@tec.mx");
            if (this.correo.match(mailformat)){
                if (this.pass == this.passcon) {
                    var url = 'http://localhost:3000/users';
                    var data = {  name: this.nombre,
                        email: this.correo,
                        birth_day: this.fecha,
                        password: this.pass,
                    };
    
                    fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response) )
                    .then(() => this.equal=true);
                } else {
                    alert("Las contraseñas deben de ser iguales");
                    this.equal = false;
                }  
            } else {
                alert("Correo invalido");
            }
        }
    }
 });
 homeBot.mount('#homeBot')