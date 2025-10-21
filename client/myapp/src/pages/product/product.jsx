

import { ProductDetails, ProductSlider, ReviewsContainer, Section } from '../../component/productComponents/ProductComponent'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';


export default function ProductPage() {
    const { id } = useParams();
    const [isError, setError] = useState(null)
    const [product, setProduct] = useState(null)


    const getProductDetail = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/api/productdetail?id=${id}`, {
                withCredentials: true
            })
            if (result.status >= 200 && result.status < 400) {
                setProduct(result.data);
            } else {
                setError(result.data.message)
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }
    useEffect(() => {
        getProductDetail();
    }, [])
    return (
        <>
            <div className='container'>
                {
                    isError ? (<Alert severity='error' className='m-1'>{isError}</Alert>) : null
                }

                {
                    product ? (
                        <Child data={product} id={id} />
                    ) : (
                        <div className='text-center'>
                            <CircularProgress />
                        </div>
                    )
                }

            </div>
        </>
    )
}


function Child({ data ,id}) {

    const { name, price, discountValue, images, rating, brand, stock, status, category, subcategory, description, review, weight, dimension, colorVariants } = data;

    // const [allDescription , setDescription] = useState(false);
    // const [descriptionArray , setDescriptionArray] = useState(description.split(',',6));

    // Calculate discounted price
    const discountedPrice = discountValue
        ? Math.round(price * (1 - discountValue / 100))
        : price;

    // Render stars based on rating
    const renderStars = () => {
        let totalRating = rating.reduce((acc, cr) => acc + cr, 0);
        let OverallRating = totalRating / 5;
        const fullStars = Math.floor(OverallRating) < 3 ? 4 : Math.floor(OverallRating);
        const halfStar = OverallRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={"full" + i} style={{ color: "#FFD700" }}>★</span>
                ))}
                {halfStar && <span style={{ color: "#FFD700" }}>☆</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={"empty" + i} style={{ color: "#ccc" }}>★</span>
                ))}
                <span className="ms-2 text-muted" style={{ fontSize: "0.9em" }}>{OverallRating.toFixed(1) < 3.5 ? 4.2 : OverallRating.toFixed(1)}</span>
            </>
        );
    };

    const ratingStarts = (OverallRating) => {
        const fullStars = Math.floor(OverallRating) < 3 ? 4 : Math.floor(OverallRating);
        const halfStar = OverallRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={"full" + i} style={{ color: "#FFD700" }}>★</span>
                ))}
                {halfStar && <span style={{ color: "#FFD700" }}>☆</span>}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={"empty" + i} style={{ color: "#ccc" }}>★</span>
                ))}
                <span className="ms-2 text-muted" style={{ fontSize: "0.9em" }}>{OverallRating.toFixed(1) < 3.5 ? 4.2 : OverallRating.toFixed(1)}</span>
            </>
        );

    }


    // useEffect(()=>{
    //     setDescriptionArray(description.split(","));
    // },[allDescription])

    return (
        <>
            <div className='row row-cols-1 row-cols-md-2'>
                <div>
                    <ProductSlider imagesArray={images} productId={id} />
                </div>
                <div>
                    <ProductDetails title={name} brand={brand} category={category} subcategory={subcategory}>
                        <div className=''>
                            <div className="">
                                <span className="fw-bold me-3 fs-4">₹{discountedPrice}</span>
                                {discountValue > 0 && (
                                    <>
                                        <small className="text-decoration-line-through text-muted me-2 fw-semibold">₹{price}</small>
                                        <span className="badge bg-success fw-semibold">{discountValue}% OFF</span>
                                    </>
                                )}
                            </div>
                        </div>


                        <div className='d-flex'>
                            <div>
                                {renderStars()}
                            </div>
                            <div className='ms-3'>
                                <span className='fw-semibold text-muted'>{rating.reduce((acc, cr) => acc + cr, 0) < 35.0 ? 43.0 : rating.reduce((acc, cr) => acc + cr, 0)} ratings  &  {review.length} reviews</span>
                            </div>
                        </div>

                        <div>
                            <Section title={'Details'}>
                                <ul className='list-unstyled'>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Brand</span>
                                        <span>{brand}</span>
                                    </li>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Category</span>
                                        <span>{category}</span>
                                    </li>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Sub-Category</span>
                                        <span>{subcategory}</span>
                                    </li>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Brand</span>
                                        <span>{brand}</span>
                                    </li>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Availability</span>
                                        <span className={stock ? 'text-success' : 'text-danger'}>{stock > 0 ? 'In Stock' : 'Temperory Unavailable'}</span>
                                    </li>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Weight</span>
                                        <span>{weight} gm</span>
                                    </li>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Color Variants</span>
                                        <span>
                                            {
                                                colorVariants.length ?
                                                    colorVariants.reduce((acc, cr) => acc + cr + ', ', '')
                                                    : null
                                            }
                                        </span>
                                    </li>
                                    <li className='fw-semibold row row-cols-2 align-items-center px-2 py-1 mb-2'>
                                        <span className='text-muted'>Dimensions</span>
                                        <span>{`${dimension[0]}cm x ${dimension[1]}cm x ${dimension[2]}cm`}</span>
                                    </li>

                                </ul>
                            </Section>
                        </div>

                        <div>
                            <Section title={'Description'}>
                                {description}
                            </Section>
                        </div>
                    </ProductDetails>
                </div>

                <div className='col-md-12'>
                    <ReviewsContainer title={'Reviews and Rating'}>
                        {
                            review.length?
                                review.map(item=>(
                                    <div>
                                        <div>
                                            <div>{item.name}</div>
                                            <div>{ratingStarts(item.rating)}</div>
                                        </div>
                                        <div>
                                            {item.description}
                                        </div>
                                    </div>
                                ))
                            :(<div>No review ,Yet . Be the first one to try this product.</div>)
                        }

                    </ReviewsContainer>
                </div>
            </div>
        </>
    )
}