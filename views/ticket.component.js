app.component('ticket', {
    template: `
    <div class="ticketPreview">
        <div class = "col-4 cardContainer">
            <br>
            <img class="card-img-top cardImage"  alt="Card image cap" align="center">
            <div class="card-body cardBodyInfo">
                <div class="grid cardInfoContainer cardTextInfo">
                    <h6 class="card-title cardTextInfo" align="left">{{titl}}</h6>
                    <div class="row">
                        <div class="col-6">
                            <h6 class="card-text cardTextInfo" align = "left">{{favt}}<br>{{desc}}<br>{{inst}}</h6>
                        </div>
                        <br>
                        <div class="col-6">
                            <button id="{{id}}" class="btn btn-primary">{{pric}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        //id
        'id': String,
        //titulo
        'titl': String,
        //favour type
        'favt': String,
        //short desc
        'desc': String,
        //instructions
        'inst': String,
        //price
        'pric': String,
    }
})