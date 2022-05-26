var app = Vue.createApp({
    data() {
        return {
            hola: 'hola mundo',
            grouped_tickets: [
                [{titulo: "uno"}, {"titulo": "dos"}],
                [{titulo: "tres"}, {"titulo": "cuatro"}]
            ]
        }
    }
})