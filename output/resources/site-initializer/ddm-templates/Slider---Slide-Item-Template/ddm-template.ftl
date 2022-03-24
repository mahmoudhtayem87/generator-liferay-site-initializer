<div class="single_slider  d-flex align-items-center" style="background-image:url('${SlideImage.getData()}')">
    <div class="container" style="margin-top:auto!important">
        <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="card p-4 shadow-lg sliderCard">
                    <div class="card-body">
                        <h3 class="header_title" onclick="document.location=${LandingPage.getFriendlyUrl()}">
                        ${Header.getData()} 
                        </h3>
                        <div class="description_p">
                            ${Description.getData()}
                        </div>
                        <!--<a class="boxed-btn3" href="${LandingPage.getFriendlyUrl()}">
                            ${LandingPage.LinkLabel.getData()}
                        </a>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>