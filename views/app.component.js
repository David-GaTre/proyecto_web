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
            var id_user = this.getCookie('user_id');
            for(let i = 0; i < this.tickets.length;i++){

                let isComplete = this.tickets[i].completed == 1;
                let isCancelled = this.tickets[i].canceled == 1;
                let expeditedBySameUser = this.tickets[i].expedited_by == id_user;
                let isNullAssignment = this.tickets[i].assigned_to == null;
                let isNotCancelled = this.tickets[i].canceled == 0;
                let isNotNullAssignemnt = this.tickets[i].assigned_to != null;
                let assignedToSameUser = this.tickets[i].assigned_to == id_user;

                if(isComplete)
                    this.tickets[i].sty = 'green';

                else if(isCancelled)
                    this.tickets[i].sty = 'red';
            
                else if(expeditedBySameUser && isNullAssignment && isNotCancelled)
                    this.tickets[i].sty = 'orange';

                else if(expeditedBySameUser && isNotNullAssignemnt && isNotCancelled)
                    this.tickets[i].sty = 'yellow';

                else if(assignedToSameUser)
                    this.tickets[i].sty = 'pink';
                else
                    this.tickets[i].sty = 'azure';

                console.log(this.tickets[i]);
            }

            for(let i = 0; i < this.ticketsuser.length;i++){

                let isComplete = this.ticketsuser[i].completed == 1;
                let isCancelled = this.ticketsuser[i].canceled == 1;
                let expeditedBySameUser = this.ticketsuser[i].expedited_by == id_user;
                let isNullAssignment = this.ticketsuser[i].assigned_to == null;
                let isNotCancelled = this.ticketsuser[i].canceled == 0;
                let isNotNullAssignemnt = this.ticketsuser[i].assigned_to != null;
                let assignedToSameUser = this.ticketsuser[i].assigned_to == id_user;

                if(isComplete)
                    this.ticketsuser[i].sty = 'green';

                else if(isCancelled)
                    this.ticketsuser[i].sty = 'red';
            
                else if(expeditedBySameUser && isNullAssignment && isNotCancelled)
                    this.ticketsuser[i].sty = 'orange';

                else if(expeditedBySameUser && isNotNullAssignemnt && isNotCancelled)
                    this.ticketsuser[i].sty = 'yellow';

                else if(assignedToSameUser)
                    this.ticketsuser[i].sty = 'pink';
                else
                    this.ticketsuser[i].sty = 'azure';

                console.log(this.ticketsuser[i]);
            }
            
        },
    },
    computed:{
        grouped_tickets() {
            gt = [];
            this.tickets_2
            this.cardColor();
            const chunkSize = 3;
            for (let i = 0; i < this.tickets.length; i += chunkSize) {
                const chunk = this.tickets.slice(i, i + chunkSize);
                gt.push(chunk);
            }
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
            return t_data, tu_data, gt, id_user
        },
    },
    mounted(){

        
    }
})