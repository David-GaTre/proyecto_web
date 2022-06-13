var app = Vue.createApp({
    data() {
        return {
            tickets: [],
            ticketsuser: [],
            id_user: "",
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
        },
        
        cardColor() {
            //Aqui se pueden encontrar otros metodos para hacer esto https://css-tricks.com/cycle-through-classes-html-element/
            var id_user = this.getCookie('user_id');
            console.log(this.ticketsuser[0].completed)
            if(this.ticketsuser.completed == 1){
                classList.remove(cardBodyInfo);
                classList.add(cardBodyInfoGreen);
            } else if(this.ticketsuser.canceled == 1){
                classList.remove(cardBodyInfo);
                classList.add(cardBodyInfoRed);
            } else if(this.ticketsuser.expedited_by == id_user && this.ticketsuser.assigned_to == null && this.ticketsuser.canceled == 0){
                classList.remove(cardBodyInfo);
                classList.add(cardBodyInfoOrange);
            } else if(this.ticketsuser.expedited_by == id_user && this.ticketsuser.assigned_to != null && this.ticketsuser.canceled == 0){
                classList.remove(cardBodyInfo);
                classList.add(cardBodyInfoYellow);
            } else if(this.ticketsuser.assigned_to == id_user){
                classList.remove(cardBodyInfo);
                classList.add(cardBodyInfoPink);
            }
        },
    },
    computed:{
        grouped_tickets() {
            gt = [];
            this.tickets_2
            const chunkSize = 3;
            for (let i = 0; i < this.tickets.length; i += chunkSize) {
                const chunk = this.tickets.slice(i, i + chunkSize);
                gt.push(chunk);
            }
            return gt;
        },
        tickets_2(){
            var t_data
            var url = window.location.origin + '/tickets/uncompleted'
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

            return t_data, tu_data, gt, id_user
        },
    },
    mounted(){
        this.cardColor();
    }
})