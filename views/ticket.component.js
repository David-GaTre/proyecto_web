app.component('ticket', {
    template: `
        <div class = "col-xl-8 cardContainer" >
            <br>
            <img v-bind:src="img" class="card-img-top cardImage" alt="Card image cap">
            <div class="card-body cardBodyInfo" :style="{ background: sty }" >
                <div class="grid cardInfoContainer cardTextInfo">
                    <h6 class="card-title cardTextInfo" style="font-weight: bold;">{{titl}}</h6><hr>
                    <div class="row">
                        <div class="col-sm-10 col-xl-12">
                            <h6 class="card-text cardTextInfo">Usuario: {{user_name}}<br><br>Tipo: {{favt}}<br><br>Descripcion: {{desc}}<br><br>Instrucciones: {{inst}}<br><br>Propina: $ {{tips}}<br><br></h6>
                        </div>
                        <br>
                        <div class="col-sm-10 col-xl-12" align="right" v-if="but === 'assign'">
                            <button class="btn btn-primary assign" @click="$emit('assign-ticket', id)">$ {{pric}}</button>
                        </div>
                        <div class="col-sm-10 col-xl-12" align="right" v-else-if="but === 'cancel'">
                            <button class="btn btn-primary assign" @click="$emit('cancel-ticket', id)">Cancel</button>
                        </div>
                        <div class="col-sm-10 col-xl-12" align="right" v-else-if="but === 'complete'">
                            <button class="btn btn-primary assign" @click="$emit('complete-ticket', id)">Complete</button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
        </div>`,
    props: {
        //id
        'id': Number,
        // nombre usuario
        'user_name': String,
        //titulo
        'titl': String,
        //favour type
        'favt': String,
        //short desc
        'desc': String,
        //instructions
        'inst': String,
        //price
        'pric': Number,
        //style
        'sty': String,
        //button action
        'but': String,
        //image
        'img': String,
        //tips
        'tips': String
    }
})