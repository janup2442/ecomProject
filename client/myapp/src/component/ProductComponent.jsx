import Divider from "@mui/material/Divider";



function ProductSlider({imagesArray = null }) {
    return (
        <>
            <div className="border p-3 shadow-sm rounded my-3 bg-light">
                {
                    imagesArray.length >0 ? (
                        <div id="carouselCaptions" class="carousel slide">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                {
                                    imagesArray ? (
                                        imagesArray.map((img, index) => (
                                            <div class={`carousel-item ${index==0?'active':null}`}>
                                                <img src={img} class="d-block w-100" alt={`product_image_${index+1}`} />
                                                <div class="carousel-caption d-none d-md-block">
                                                    <h5>Slide Number : {index}</h5>
                                                    <p>Some representative placeholder content for the Slide {index}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : null
                                }
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    ) : null
                }
                
                <p>
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <button type="button" className="btn btn-outline-dark px-2 py-1 border rounded-0 fw-semibold" style={{width:'48%'}}>Add To Cart</button>
                        <button type="button" className="btn btn-outline-dark px-2 py-1 border rounded-0 fw-semibold" style={{width:'48%'}}>Buy Now</button>
                    </div>
                </p>
            </div>
        </>
    )
}

function SimpleContainer({title,info}){
    return(
        <>
            <div className="p-3 my-3 bg-light">
                <h5>{title}</h5>
                <Divider />
                <p className="py-1">
                    {info}
                </p>
            </div>
        </>
    )
}

function Section({title,info}){
    return(
        <>
            <div className="border rounded p-3 my-3 bg-light">
                <h5>{title}</h5>
                <Divider />
                <p className="py-1">
                    {info}
                </p>
            </div>
        </>
    )
}


export {ProductSlider,Section};