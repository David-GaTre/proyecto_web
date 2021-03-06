const perfil = Vue.createApp({
    created() {
        this.handleDisplay();
        this.displayAsignedTickets();
        this.displayCreatedTickets();
    },
    data(){
        return{
            pago: 'Metodos de pago',
            img: 'https://cdn.discordapp.com/attachments/629532011148607499/986347322147479582/unknown.png',
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
            id: ' ' ,
            bal: 0 
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
        },
        addBalanceToUser() {
            const API_URL = window.location.origin + '/users/add_balance';
            var data = {id: parseInt(this.getCookie('user_id')), bal: this.bal};
            if (data.bal < 0) {
                alert('Plis no pierdas dinero')
            } else {
                fetch(API_URL,{
                    method: 'PUT',
                    headers:{
                    'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                location.reload();
            }
        }
    },
 });
 perfil.mount('#perfil')