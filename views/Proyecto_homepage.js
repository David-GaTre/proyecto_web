const homeTop = Vue.createApp({
    data(){
        return{
            logo: 'https://cdn.discordapp.com/attachments/629532011148607499/969324650750427196/unknown.png',
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
                var url = 'http://localhost:3000/users';
                var data = {  name: this.nombre,
                    email: this.correo,
                    birth_day: this.año + '-' + this.mes + '-' + this.dia,
                    password: this.pass
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
                    this.equal = false;
                }  
            },
   }
 });
 homeBot.mount('#homeBot')