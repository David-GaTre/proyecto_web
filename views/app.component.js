//import express from 'express';
//import tickets from '../services/tickets'
var app = Vue.createApp({
    data() {
        return {
            tickets: []
            //tickets: [{titulo: "uno"}, {"titulo": "dos"}, {titulo: "tres"}, {"titulo": "cuatro"}]
        }
    },
    computed:{
        grouped_tickets() {
            console.log("hola")
            gt = [];
            this.tickets_2
            const chunkSize = 3;
            for (let i = 0; i < this.tickets.length; i += chunkSize) {
                const chunk = this.tickets.slice(i, i + chunkSize);
                gt.push(chunk);
            }
            console.log("grouped tickets")
            console.log(gt)
            return gt;
          // returns a nested array: 
          // [[article, article, article], [article, article, article], ...]
        },
        tickets_2(){
            //this.tickets = tickets.getAll()
            console.log("ticket2")
            var t_data
            var url = 'http://localhost:3000/tickets/'

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => t_data = data).then(data => this.tickets = data.data).then(data => console.log(t_data.data))

            //this.tickets = t_data

            return t_data
        }
    }
    /*
    methods: {
        handleLogin() {
            var u_data
            var url = 'http://localhost:3000/users/user_check/' + this.user + '&' + this.pass;

            fetch(url)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => u_data = data)
            .then(() => document.cookie = "user_id=" + u_data.data.id)
            .then(() => window.location.replace("http://localhost:3000/profile"))
        },
    },
    */
})