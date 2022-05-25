const perfil = Vue.createApp({
    created() {
        this.handleDisplay();
    },
    data(){
        return{
            edit: 'Editar',
            pago: 'Metodos de pago',
            img: 'https://cdn.discordapp.com/attachments/629532011148607499/931379101833527366/20220113_204305.jpg',
            tnombre: 'Nombre',
            nombre: ' ',
            tcorreo: ' ',
            correo: ' ',
            tfecha: ' ',
            fecha: ' ',
            tbalance: 'Balance',
            balance: ' ',
            tcreados: 'Tickets Creados',
            creados: ' ',
            tresueltos: 'Tickets Resueltos',
            resueltos: ' ',
            id: ' '  
        }
    },
    methods: {
        handleDisplay() {
            var url = 'http://localhost:3000/users/user_check/' + document.cookie.substring(document.cookie.indexOf("=") + 1);
            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((data) => {
                const {name, email, date, balance, tickets, completeTicket} = data.data[0];
                this.nombre = name;
                this.correo = email;
                this.fecha = date;
                this.balance = balance;
                this.creados = tickets;
                this.resueltos = completeTicket;
            })
        }
    },
 });
 perfil.mount('#perfil')