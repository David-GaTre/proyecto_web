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
        cardColor() {
            // green #41be41 yellow #cccc33
            var color = "";

            return gt;
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
            .then(data => t_data = data).then(data => this.tickets = data.data).then(data => console.log(t_data.data))

            fetch(url2)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => tu_data = data).then(data => this.ticketsuser = data.data).then(data => console.log(tu_data.data))

            return t_data, tu_data
        },
        /*ticketsuser_2(){
            var tu_data
            var url = window.location.origin + '/tickets/active/2'

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.ticketsuser = data.data).then(data => console.log(t_data.data))
            
            return tu_data
        }*/
    }
})