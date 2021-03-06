var app = Vue.createApp({
    data() {
        return {
            tickets: [],
            ticketsuser: [],
            ticketshistorial: [],
            id_user: ""
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

        assignTicket(currTicket) {
            const API_URL = window.location.origin + '/tickets/assign';
            var data = {asignee_id: parseInt(this.getCookie('user_id')), ticket_id: currTicket};
            fetch(API_URL,{
                method: 'PUT',
                headers:{
                'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            location.reload();
        },
        
        cancelTicket(currTicket) {
            console.log(currTicket)
            const API_URL = window.location.origin + '/tickets/' + String(currTicket) + '/cancel';
            var data = {};
            fetch(API_URL,{
                method: 'PUT',
                headers:{
                'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            location.reload();
        },

        completeTicket(currTicket) {
            console.log("completar ticket")
            const API_URL = window.location.origin + '/tickets/' + String(currTicket) + '/complete';
            var data = {};
            fetch(API_URL,{
                method: 'PUT',
                headers:{
                'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            location.reload();
        },

        cardColor() {
            var id_user = this.getCookie('user_id');
            for(let i = 0; i < this.tickets.length;i++){

                let isComplete = this.tickets[i].completed == 1;
                let isCancelled = this.tickets[i].canceled == 1;
                let expeditedBySameUser = this.tickets[i].expedited_by == id_user;
                let isNullAssignment = this.tickets[i].assigned_to == null ;
                let isNotCancelled = this.tickets[i].canceled == 0;
                let isNotNullAssignemnt = this.tickets[i].assigned_to != null;
                let assignedToSameUser = this.tickets[i].assigned_to == id_user;

                if(isComplete) {
                    this.tickets[i].sty = 'rgb(80, 185, 80)';
                    this.tickets[i].but = 'none';
                } else if(isCancelled){
                    this.tickets[i].sty = 'rgb(218, 55, 55)';
                    this.tickets[i].but = 'none';
                } else if(expeditedBySameUser && isNullAssignment && isNotCancelled) {
                    this.tickets[i].sty = 'rgb(228, 120, 32)';
                    this.tickets[i].but = 'cancel';
                } else if(expeditedBySameUser && isNotNullAssignemnt && isNotCancelled) {
                    this.tickets[i].sty = 'rgb(231, 228, 50)';
                    this.tickets[i].but = 'complete';
                } else if(assignedToSameUser) {
                    this.tickets[i].sty = 'rgb(221, 121, 221)';
                    this.tickets[i].but = 'none';
                } else {
                    this.tickets[i].sty = 'rgb(218, 55, 55);';
                    this.tickets[i].but = 'assign';
                }

            }

            for(let i = 0; i < this.ticketsuser.length;i++){

                let isComplete = this.ticketsuser[i].completed == 1;
                let isCancelled = this.ticketsuser[i].canceled == 1;
                let expeditedBySameUser = this.ticketsuser[i].expedited_by == id_user;
                let isNullAssignment = this.ticketsuser[i].assigned_to == null;
                let isNotCancelled = this.ticketsuser[i].canceled == 0;
                let isNotNullAssignemnt = this.ticketsuser[i].assigned_to != null;
                let assignedToSameUser = this.ticketsuser[i].assigned_to == id_user;

                if(isComplete) {
                    this.ticketsuser[i].sty = 'rgb(80, 185, 80)';
                    this.ticketsuser[i].but = 'none';
                } else if(isCancelled){
                    this.ticketsuser[i].sty = 'rgb(218, 55, 55)';
                    this.ticketsuser[i].but = 'none';
                } else if(expeditedBySameUser && isNullAssignment && isNotCancelled) {
                    this.ticketsuser[i].sty = 'rgb(228, 120, 32)';
                    this.ticketsuser[i].but = 'cancel';
                } else if(expeditedBySameUser && isNotNullAssignemnt && isNotCancelled) {
                    this.ticketsuser[i].sty = 'rgb(231, 228, 50)';
                    this.ticketsuser[i].but = 'complete';
                } else if(assignedToSameUser) {
                    this.ticketsuser[i].sty = 'rgb(106, 192, 183)';
                    this.ticketsuser[i].but = 'none';
                } else {
                    this.ticketsuser[i].sty = 'rgb(218, 55, 55)';
                    this.ticketsuser[i].but = 'assign';
                }
                console.log(this.ticketsuser[i])
            }

            for(let i = 0; i < this.ticketshistorial.length;i++){

                let isComplete = this.ticketshistorial[i].completed == 1;
                let isCancelled = this.ticketshistorial[i].canceled == 1;
                let expeditedBySameUser = this.ticketshistorial[i].expedited_by == id_user;
                let isNullAssignment = this.ticketshistorial[i].assigned_to == null;
                let isNotCancelled = this.ticketshistorial[i].canceled == 0;
                let isNotNullAssignemnt = this.ticketshistorial[i].assigned_to != null;
                let assignedToSameUser = this.ticketshistorial[i].assigned_to == id_user;

                if(isComplete) {
                    this.ticketshistorial[i].sty = 'rgb(80, 185, 80)';
                    this.ticketshistorial[i].but = 'none';
                } else if(isCancelled){
                    this.ticketshistorial[i].sty = 'rgb(218, 55, 55)';
                    this.ticketshistorial[i].but = 'none';
                } else if(expeditedBySameUser && isNullAssignment && isNotCancelled) {
                    this.ticketshistorial[i].sty = 'rgb(228, 120, 32)';
                    this.ticketshistorial[i].but = 'cancel';
                } else if(expeditedBySameUser && isNotNullAssignemnt && isNotCancelled) {
                    this.ticketshistorial[i].sty = 'rgb(231, 228, 50)';
                    this.ticketshistorial[i].but = 'complete';
                } else if(assignedToSameUser) {
                    this.ticketshistorial[i].sty = 'rgb(106, 192, 183)';
                    this.ticketshistorial[i].but = 'none';
                } else {
                    this.ticketshistorial[i].sty = 'rgb(218, 55, 55)';
                    this.ticketshistorial[i].but = 'assign';
                }
            }
            
        },
        cardImage() {


            for(let i = 0; i < this.tickets.length;i++){

                let isPedido = this.tickets[i].favour_type == "Pedido";
                let isEntrega = this.tickets[i].favour_type == "Entrega";
                let isFavor = this.tickets[i].favour_type == "Favor";
                let isDefault = this.tickets[i].favour_type == "tipo_favor";
                
                if(isPedido) {
                    this.tickets[i].img = '/imgs/pedido.png';
                } else if(isEntrega){
                    this.tickets[i].img = '/imgs/entrega.png';
                } else if(isFavor) {
                    this.tickets[i].img = '/imgs/vuelta.png';
                } else if(isDefault) {
                    this.tickets[i].img = '/imgs/tecdashlogo.png';
                } else {
                    this.tickets[i].img = '/imgs/tecdashlogo.png';
                }
                this.tickets[i].tips = this.tickets[i].tips.toString();
            }

            for(let i = 0; i < this.ticketsuser.length;i++){
                
                let isPedido = this.ticketsuser[i].favour_type == "Pedido";
                let isEntrega = this.ticketsuser[i].favour_type == "Entrega";
                let isFavor = this.ticketsuser[i].favour_type == "Favor";
                let isDefault = this.ticketsuser[i].favour_type == "tipo_favor";
                

                if(isPedido) {
                    this.ticketsuser[i].img = '/imgs/pedido.png';
                } else if(isEntrega){
                    this.ticketsuser[i].img = '/imgs/entrega.png';
                } else if(isFavor) {
                    this.ticketsuser[i].img = '/imgs/vuelta.png';
                } else if(isDefault) {
                    this.ticketsuser[i].img = '/imgs/tecdashlogo.png';
                } else {
                    this.ticketsuser[i].img = '/imgs/tecdashlogo.png';
                }
                this.ticketsuser[i].tips = this.ticketsuser[i].tips.toString();
            }

            for(let i = 0; i < this.ticketshistorial.length;i++){
                
                let isPedido = this.ticketshistorial[i].favour_type == "Pedido";
                let isEntrega = this.ticketshistorial[i].favour_type == "Entrega";
                let isFavor = this.ticketshistorial[i].favour_type == "Favor";
                let isDefault = this.ticketshistorial[i].favour_type == "tipo_favor";
                

                if(isPedido) {
                    this.ticketshistorial[i].img = '/imgs/pedido.png';
                } else if(isEntrega){
                    this.ticketshistorial[i].img = '/imgs/entrega.png';
                } else if(isFavor) {
                    this.ticketshistorial[i].img = '/imgs/vuelta.png';
                } else if(isDefault) {
                    this.ticketshistorial[i].img = '/imgs/tecdashlogo.png';
                } else {
                    this.ticketshistorial[i].img = '/imgs/tecdashlogo.png';
                }
                
                this.ticketshistorial[i].tips = this.ticketshistorial[i].tips.toString();
            }
        }
    },
    computed:{
        grouped_tickets() {
            gt = [];
            this.tickets_2
            this.cardColor();
            this.cardImage();
            const chunkSize = 3;
            for (let i = 0; i < this.tickets.length; i += chunkSize) {
                const chunk = this.tickets.slice(i, i + chunkSize);
                gt.push(chunk);
            }
            return gt;
        },
        grouped_tickets_history() {
            gt = [];
            this.tickets_history
            this.cardColor()
            this.cardImage();
            const chunkSize = 3;
            for (let i = 0; i < this.ticketshistorial.length; i += chunkSize) {
                const chunk = this.ticketshistorial.slice(i, i + chunkSize);
                gt.push(chunk);
            }
            console.log("historial")
            console.log(this.ticketshistorial)
            console.log(gt)
            return gt;
        },
        tickets_2(){
            var t_data
            var tu_data
            var id_user = this.getCookie('user_id')
            var url = window.location.origin + '/tickets/uncompleted/' + id_user
            var url2 = window.location.origin + '/tickets/active/'+ id_user;

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.tickets = data.data)

            fetch(url2)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => tu_data = data).then(data => this.ticketsuser = data.data)
            var id_user = this.getCookie('user_id');
            return t_data, tu_data, gt
        },
        tickets_history(){
            console.log("tickets_history")
            var t_data
            var id_user = this.getCookie('user_id')
            var url = window.location.origin + '/tickets/history/' + id_user

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.ticketshistorial = data.data).then(data => console.log(t_data.data))

            return t_data
        },
        tickets_3(){
            var t_data

            var url =  window.location.origin + '/tickets/history/:user_id'
            // copie esto aqui porque marcaba error de que no existia (url 2)
            var tu_data
            var id_user = this.getCookie('user_id')
            var url2 = window.location.origin + '/tickets/active/'+ id_user;

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.tickets = data.data)

            fetch(url2)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => tu_data = data).then(data => this.ticketsuser = data.data)
            var id_user = this.getCookie('user_id');
            return t_data, tu_data, gt, id_user
        },
    },
})