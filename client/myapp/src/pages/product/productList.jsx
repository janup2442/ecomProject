

import { Link } from 'react-router'
import ProductCard from '../../component/productCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
export default function ProductCatalog() {
    const [prodcutCatalog, setCatalog] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/api/products`, {
                withCredentials: true
            })

            if (result?.status >= 200 && result?.status < 400) {
                setCatalog(result.data)
            } else {
                alert("error loading prodcuts");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        setLoading(true)
        fetchProducts();
        setLoading(false)
    }, [])
    return (
        <>
            <div>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 p-2'>

                    {
                        prodcutCatalog?.length > 0 ? (
                            prodcutCatalog.map((product) => (
                                <div className='p-2'>
                                    <Link to={`/product/${product.id}`} className='text-decoration-none'>
                                        <ProductCard
                                            image={product.images[0]}
                                            name={product.name}
                                            brand={product.brand}
                                            rating={3.5}
                                            price={product.price}
                                            discount={product.discountValue ? product.discountValue : 25}
                                            caption="Genuine leather, stylish and durable."
                                            onWishlist={(isWishlisted) => console.log("Wishlisted:", isWishlisted)}
                                        />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className='d-flex h-100 w-100 justify-content-center align-items-center'>
                                <CircularProgress />
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}