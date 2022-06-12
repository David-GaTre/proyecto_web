var app = Vue.createApp({
    data() {
        return {
            tickets: [],
            ticketsuser: [],
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
        }
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

            return t_data, tu_data
        },
        cardColor() {
            // green #41be41 yellow #cccc33 gray #cfcfcf
            var id_user = this.getCookie('user_id');
            var color = ["#41be41", "#cccc33", "#cfcfcf"];
            if(this.ticketsuser.expedired_by == id_user){
                document.querySelector("cardBodyInfo").getElementsByClassName.background = color[0];
            } else if(this.ticketsuser.assigned_to == id_user){
                document.querySelector("cardBodyInfo").getElementsByClassName.background = color[1];
            } else {
                document.querySelector("cardBodyInfo").getElementsByClassName.background = color[2];
            }

            return gt;
        },
    }
})