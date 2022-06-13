app.component('headermenu', {
    template: `
    <div>
                <nav class="navbar navbar-expand-sm navbar-dark azul-fondo flex-sm-nowrap flex-wrap">
                    <div class="container-fluid">
                        <button class="navbar-toggler flex-grow-sm-1 flex-grow-0 me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbar5">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    <img src="../imgs/tecdashlogo.png" width="30" height="30" class="d-inline-block align-top " alt="">
                        <span class="navbar-brand flex-grow-1">Tec Dash</span>
                        <div class="navbar-collapse collapse flex-grow-1 justify-content-right" id="navbar5">
                            <ul class="navbar-nav mx-auto">
                                <li class="nav-item">
                                    <a class="nav-link text-white" href="profile">Usuario</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-white" href="/logout">Cerrar sesion</a>
                                </li>
                                <li class="nav-item">
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
    `,
    props: {
    }
})