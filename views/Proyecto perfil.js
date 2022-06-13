//import * as header_app from 'header_app.component.js'
const perfil = Vue.createApp({
    created() {
        this.handleDisplay();
        this.displayAsignedTickets();
        this.displayCreatedTickets();
    },
    data(){
        return{
            edit: 'Editar',
            pago: 'Metodos de pago',
            img: 'https://cdn.discordapp.com/attachments/629532011148607499/931379101833527366/20220113_204305.jpg',
            tnombre: 'Nombre',
            nombre: ' ',
            tcorreo: 'Correo',
            correo: ' ',
            tfecha: 'Fecha',
            fecha: ' ',
            tbalance: 'Balance',
            balance: '0',
            tcreados: 'Tickets Creados',
            creados: ' ',
            tresueltos: 'Tickets Resueltos',
            resueltos: ' ',
            id: ' '  
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
        handleDisplay() {
            var id_user = this.getCookie('user_id')
            var url = window.location.origin + '/users/user_check/' + id_user;
            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((data) => {
                const {name, email, birth_day, balance} = data.data[0];
                this.nombre = name;
                this.correo = email;
                this.fecha = birth_day;
                this.balance = balance;
                if (!balance) {
                    this.balance = '0'
                }
            })
        },
        displayCreatedTickets() {
            var id_user = this.getCookie('user_id')
            var url2 = window.location.origin + '/tickets/asigned/' + id_user;
            fetch(url2)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((data) => {
                const num = data;
                this.resueltos = num.num[0]['completed'];
            })
        },
        displayAsignedTickets() {
            var id_user = this.getCookie('user_id')
            var url3 = window.location.origin + '/tickets/expedited/' + id_user;
            fetch(url3)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((data) => {
                const num = data;
                this.creados = num.num[0]['expedited'];
            })
        }
    },
 });
perfil.mount('#perfil')
//header_app.mount('#header_app')