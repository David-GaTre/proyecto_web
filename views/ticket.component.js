app.component('ticket', {
    template: `
        <div class = "col-xl-8 cardContainer" >
            <br>
            <img class="card-img-top cardImage" alt="Card image cap">
            <div class="card-body cardBodyInfo" :style="{ background: sty }" >
                <div class="grid cardInfoContainer cardTextInfo">
                    <h6 class="card-title cardTextInfo" style="font-weight: bold;">{{titl}}</h6>
                    <div class="row">
                        <div class="col-sm-10 col-xl-6">
                            <h6 class="card-text cardTextInfo">{{favt}}<br><br>{{desc}}<br><br>{{inst}}</h6>
                        </div>
                        <br>
                        <div class="col-sm-10 col-xl-6"  v-if="but === 'assign'">
                            <button class="btn btn-primary assign" @click="$emit('assign-ticket', id)">$ {{pric}}</button>
                        </div>
                        <div class="col-sm-10 col-xl-6"  v-else-if="but === 'cancel'">
                            <button class="btn btn-primary assign" @click="$emit('cancel-ticket', id)">Cancel</button>
                        </div>
                        <div class="col-sm-10 col-xl-6"  v-else-if="but === 'complete'">
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
        'but': String
    }
})