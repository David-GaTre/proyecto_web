app.component('new_ticket',{
    template: `
    <div class="col-1"></div>
    <div class="col-4">
    <br> <br>
    <div class="row">
        <!-- Titulo -->
        <p> Titulo * </p>
        <div class="input-group mb-3">
            <input v-model="title" type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1">
        </div>
    </div>
    <div class="row">
        <!-- Tipo de favor -->
        <p> Tipo de favor * </p>
        <div class="input-group mb-3">
            <select v-model="favour_type" class="custom-select" id="inputGroupSelect01" @change="changeImage($event)">
            <option value="Entrega">Entrega</option>
            <option value="Pedido">Pedido</option>
            <option value="Vuelta">Vuelta</option>
            </select>
        </div>
    </div>
    <div class="row">
        <!-- Lugar de inicio -->
        <p> Lugar de inicio * </p>
        <div class="input-group mb-3">
            <input v-model="start_loc" type="text" class="form-control" placeholder="Lugar de inicio" aria-label="Lugar de inicio" aria-describedby="basic-addon1">
        </div>
    </div>
    <div class="row">
        <!-- Lugar de fin -->
        <p> Lugar final * </p>
        <div class="input-group mb-3">
            <input v-model="end_loc" type="text" class="form-control" placeholder="Lugar final" aria-label="Lugar final" aria-describedby="basic-addon1">
        </div>
    </div>
    <div class="row">
        <!-- Descripcion chica -->
        <p> Descripción chica * </p>
        <div class="input-group">
            <textarea v-model="short_desc" class="form-control" aria-label="With textarea"></textarea>
        </div>
    </div>
    <br>
    <div class="row">
        <!-- Instrucciones adicionales -->
        <p> Instrucciones adicionales </p>
        <div class="input-group">
            <textarea v-model="instructions" class="form-control" aria-label="With textarea"></textarea>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col">
            <!-- Precio -->
            <p> Precio </p>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text">$</span>
                </div>
                <input v-model="price" type="number" class="form-control" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                <span class="input-group-text">.00</span>
                </div>
            </div>
        </div>
        <div class="col">
            <!-- Propina -->
            <p> Propina </p>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text">$</span>
                </div>
                <input v-model="tips" type="number" class="form-control" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                <span class="input-group-text">.00</span>
                </div>
            </div>
            
        </div>
    </div>
</div>

<div class="col-xs-6 col-md-4">
    <br> <br>
    <div class="row">
        <!-- Imagen deafult por cada favor-->
        <img v-bind:src="image" alt="Avatar" width="250" height="250" style="border-radius: 60%;display:block;margin-left:auto;margin-right:auto;width:50%;">
    </div>
    <br>
    <div class="row">
        <!-- Boton crear-->
        <button type="button" class="btn btn-secondary" style="display:block;margin-left:auto;margin-right:auto;width:50%;" @click="handleSubmitTicket">Crear</button>
    </div>
</div>
            `,
            data(){
                return {
                    expedited_by: 0, 
                    title: "",
                    favour_type: "",
                    short_desc: "",
                    instructions: "",
                    price: 0,
                    tips: 0,
                    image: "/imgs/tecdashlogo.png",
                    start_loc: "",
                    end_loc: "",
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
          
              handleSubmitTicket() {
                var url = window.location.origin + '/tickets'
                var data = {  expedited_by: parseInt(this.getCookie('user_id')),
                  title: this.title,
                  favour_type: this.favour_type,
                  short_desc: this.short_desc,
                  instructions: this.instructions,
                  price: this.price,
                  tips: this.tips,
                  start_loc: this.start_loc,
                  end_loc: this.end_loc
                };
          
                if (data.tips < 0 || data.price < 0) {
                  alert('No puedes poner precios negativos')
                } else {
                  fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data), 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    }).then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => console.log('Success:', response) )
                    .then(() => window.location.replace(window.location.origin + "/profile"))
                }
              },
          
              changeImage(event) {
                if (event.target.value == "Pedido") {
                  this.image = "/imgs/pedido.png";
                  console.log(event.target.value)
                } else if (event.target.value == "Vuelta") {
                  this.image = "/imgs/vuelta.png";
                  console.log(event.target.value)
                } else if (event.target.value == "Entrega") {
                  this.image = "/imgs/entrega.png";
                  console.log(event.target.value)
                }
              },
           }
});
