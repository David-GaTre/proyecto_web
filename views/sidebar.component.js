app.component('sidebar', {
    template: `
    <div class = "col-2" id = "side-bar">
    <div class="border-end h-100 blanco-fondo">
        <div class="list-group list-group-mine">
            <a class="list-group-item  p-3 azul-fondo" href="/">Homepage</a>
            <a class="list-group-item list-group-item-action p-3 azul-fondo" href="profile">Perfil</a>
            <a class="list-group-item list-group-item-action p-3 azul-fondo" href="ticket/new">Hacer un pedido</a>
            <a class="list-group-item list-group-item-action p-3 azul-fondo" href="/logout">Cerrar sesion</a>
        </div>
    </div>
</div>
    `,
    props: {
    }
})