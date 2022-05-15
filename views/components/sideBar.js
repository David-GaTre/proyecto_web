const sideBar = Vue.component("sideBar", {
    name: "sideBar",
    props: [],
    template: `
    <div class="d-flex h-100">
            <!-- Sidebar-->
            <div class="border-end h-100 blanco-fondo">
                <div class="list-group list-group-mine">
                    <a class="list-group-item  p-3 azul-fondo" href="#!">Homepage</a>
                    <a class="list-group-item list-group-item-action p-3 azul-fondo" href="#!">Perfil</a>
                    <a class="list-group-item list-group-item-action p-3 azul-fondo" href="#!">Hacer un pedido</a>
                    <a class="list-group-item list-group-item-action p-3 azul-fondo" href="#!">Cerrar sesion</a>
                </div>
            </div>
        </div>
    `
});