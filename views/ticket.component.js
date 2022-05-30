app.component('ticket', {
    template: `
    <div class="ticketPreview">
        <div class = "col-4 cardContainer">
            <br>
            <img class="card-img-top cardImage"  alt="Card image cap" align="center">
            <div class="card-body cardBodyInfo">
                <div class="grid cardInfoContainer cardTextInfo">
                    <h6 class="card-title cardTextInfo" align="left">{{title}}</h6>
                    <div class="row">
                        <div class="col-6">
                            <br>
                            <h6 class="card-text cardTextInfo" align = "left">{{tipo}}<br>{{desc}}</h6>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        //titulo
        'title': String,
        //tipo de favor
        'tipo': String,
        //descripcion del favor
        'desc': String,
        //ref para el modal
        'mod': String
    }
})