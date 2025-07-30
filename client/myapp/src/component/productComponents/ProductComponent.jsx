import Divider from "@mui/material/Divider";
import { Children } from "react";



function ProductSlider({ imagesArray = null }) {
    return (
        <>
            <div className="border p-3 shadow-sm rounded my-3 bg-light">
                {
                    imagesArray.length > 0 ? (
                        <div id="carouselCaptions" class="carousel slide">
                            <div class="carousel-inner">
                                {
                                    imagesArray ? (
                                        imagesArray.map((img, index) => (
                                            <div class={`carousel-item ${index == 0 ? 'active' : null}`}>
                                                <img src={img} class="d-block w-100" alt={`product_image_${index + 1}`} />
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

                <div className="my-2">
                    <div className="row row-cols-2 align-items-center p-3" >
                        <button type="button" className="btn btn-outline-dark px-2 py-1 border rounded-0 fw-semibold" style={{height:'60px'}}>Add To Cart</button>
                        <button type="button" className="btn btn-outline-dark px-2 py-1 border rounded-0 fw-semibold" style={{height:'60px'}}>Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProductDetails({ title, children, brand, category, subcategory }) {
    return (
        <>
            <div className="py-3 bg-light" style={{ backgroundColor: 'white' }}>
                <div className="text-muted fw-semibold opacity-75">{brand}</div>
                <div className="fs-4 fw-semibold">{title}</div>
                <div className="d-flex opacity-75 align-items-baseline gap-1">
                    <span className="text-muted">in </span>
                    <span className="fw-semibold">{category}</span>
                    <span className="text-primary" style={{ fontSize: '0.8rem' }}> & {subcategory}</span>
                </div>
                <Divider />
                <div className="py-2">
                    {children}
                </div>
            </div>
        </>
    )
}

function Section({ title, children }) {
    return (
        <>
            <div className="my-3 bg-light">
                <h5>{title}</h5>
                <Divider />
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}


function ReviewsContainer({ children, title }) {
    return (
        <>
            <div className="my-3 bg-light p-3">
                <h5>{title}</h5>
                <Divider />
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export { ProductSlider, ProductDetails, Section, ReviewsContainer };