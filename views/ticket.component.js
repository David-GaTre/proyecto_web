app.component('ticket', {
    template: `
    <div class="ticketPreview">
        <div class = "col-4 cardContainer">
            <br>
            <img class="card-img-top cardImage"  alt="Card image cap" align="center">
            <div class="card-body cardBodyInfo">
                <div class="grid cardInfoContainer cardTextInfo">
                    <h6 class="card-title cardTextInfo" align="left">{{d}}</h6>
                    <div class="row">
                        <div class="col-6">
                            <br>
                            <h6 class="card-text cardTextInfo" align = "left">{{l}}<br>{{p}}</h6>
                        </div>
                        <div class="col-6">
                            <a href="{{h}}" class="btn btn-primary cardButton">Ver</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        'd': String,
        'l': String,
        'p': String,
        'h': String
    }
})