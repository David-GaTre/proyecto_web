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
            registro: 'Registrarme!'
        }
    },
    methods: {

    },
 });
 homeBot.mount('#homeBot')