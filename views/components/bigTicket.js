const bigTicket = Vue.component("bigTicket",
    {
        name:"bigTicket",
        props: ['title','type','description','instructions','price','tip'],
        template: '<div class = "bigTicket"><div class="card" style = "max-width: 25%;"><img class="card-img-top"src="https://iconarchive.com/download/i103394/paomedia/small-n-flat/file-empty.ico" alt="Card image cap"style="width: 50%; align-self: center;"><div class = "grid"><div class = "row"><div class = "col-12"><h3 class="h3">{{title}}</h3></div></div><div class = "row"><div class = "col-12"> <h4 class="h4">Tipo de Favor</h4></div><div class = "col-12"><h6 class="h6">{{type}}</h6></div></div><div class = "row"><div class = "col-12"><h4 class="h4">Descripción</h4></div><div class = "col-12"><h6 class="h6">{{description}}</h6></div></div><div class = "row"><div class = "col-12"><h4 class="h4">Instrucciones adicionales</h4></div><div class = "col-12"><h6 class="h6">{{instructions}}</h6></div></div><div class = "row"><div class = "col-6"><h4 class="h4">Precio</h4><h6 class="h6">{{price}}</h6></div><div class = "col-6"><h4 class="h4">Propina</h4><h6 class="h6">{{tip}}</h6></div></div></div></div></div>'
    }
);