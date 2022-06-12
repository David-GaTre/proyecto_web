app.component('ticket', {
    template: `
        <div class = "col-xl-8 cardContainer">
            <br>
            <img class="card-img-top cardImage" alt="Card image cap">
            <div class="card-body cardBodyInfo">
                <div class="grid cardInfoContainer cardTextInfo">
                    <h6 class="card-title cardTextInfo">{{titl}}</h6>
                    <div class="row">
                        <div class="col-sm-10 col-xl-6">
                            <h6 class="card-text cardTextInfo">{{favt}}<br>{{desc}}<br>{{inst}}</h6>
                        </div>
                        <br>
                        <div class="col-sm-10 col-xl-6">
                            <button class="btn btn-primary">{{pric}}</button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
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