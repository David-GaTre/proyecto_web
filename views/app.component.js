var app = Vue.createApp({
    data() {
        return {
            tickets: []
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
        grouped_tickets_history() {
            gt = [];
            this.tickets_3
            const chunkSize = 3;
            for (let i = 0; i < this.tickets.length; i += chunkSize) {
                const chunk = this.tickets.slice(i, i + chunkSize);
                gt.push(chunk);
            }
            return gt;
        },
        tickets_2(){
            var t_data
            var url = 'http://localhost:3000/tickets/uncompleted'

            //var url = 'http://localhost:3000/tickets//history/:user_id'

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.tickets = data.data).then(data => console.log(t_data.data))

            return t_data
        },
        tickets_3(){
            var t_data

            var url = 'http://localhost:3000/tickets//history/:user_id'

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.tickets = data.data).then(data => console.log(t_data.data))

            return t_data
        }
    }
})