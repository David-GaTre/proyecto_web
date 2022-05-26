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
            tcorreo: 'Correo',
            correo: ' ',
            tfecha: 'Fecha',
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
            var url = 'http://localhost:3000/users/user_check/' + id_user;
            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((data) => {
                const {name, email, birth_day, balance, tickets, completeTicket} = data.data[0];
                this.nombre = name;
                this.correo = email;
                this.fecha = birth_day;
                this.balance = balance;
                this.creados = tickets;
                this.resueltos = completeTicket;
            })
        }
    },
 });
 perfil.mount('#perfil')