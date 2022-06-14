app.component('perfil',{
    template: `<div id="perfil" style="list-style-type: none;">
    <br><br>
    <!-- Row 1 Foto y Primer Set de Datos -->
    <div class="row">
        <div class="col-xl-3 col-xs-9">
        </div>
        <div class="col-xl-3 col-xs-9">
            <!-- Foto de Perfil -->
            <img style="width:150px;height:150px;border-radius: 50%;" v-bind:src="img" aria-label= "Foto de perfil del usuario">
        </div>
        <div class="col-xl-6 col-xs-12">
            <!-- Nombre, Correo, Fecha de Nacimiento -->
            <h5>{{tnombre}}</h5>
            <h5>{{nombre}}</h5>
            <br>
            <h5>{{tcorreo}}</h5>
            <h5>{{correo}}</h5>
            <br>
            <h5>{{tfecha}}</h5>
            <h5>{{fecha}}</h5>
        </div>
    </div>
    <!-- Row 2 Boton Editar y Balance -->
    <br>
    <div class="row">
        <div class="col-xl-3">
        </div>
        <div class="col-xl-3">
            <!-- Boton Editar -->
            <button class="btn btn-primary">Editar</button>
        </div>
        <div class="col-xl-6">
            <!-- Balance -->
            <h5>{{tbalance}}</h5>
            <h5>{{balance}}</h5>
        </div>
    </div>
    <!-- Row 3 Boton Pagos, Creados y Tomados -->
    <br>
    <div class="row">
        <div class="col-xl-3">
        </div>
        <div class="col-xl-3">
            <!-- Boton Metodos de Pago/Añadir balance -->
                <div class="input-group mb-3 pr-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input v-model="bal" type="number" class="form-control" aria-label="Amount (to the nearest dollar)">
                    <div class="input-group-append">
                      <span class="input-group-text">.00</span>
                    </div>
                </div>
            <button class="btn btn-primary" @click="addBalanceToUser">Añadir balance</button>
        </div>
        <div class="col-xl-3">
            <!-- Tickets Creados -->
            <h5>{{tcreados}}</h5>
            <h5>{{creados}}</h5>
        </div>
        <div class="col-xl-3">
            <!-- Tickets Resuletos -->
            <h5>{{tresueltos}}</h5>
            <h5>{{resueltos}}</h5> 
        </div>
    </div>
</div>`,
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