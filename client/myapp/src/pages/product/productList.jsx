

import { Link } from 'react-router'
import ProductCard from '../../component/productComponents/productCard'
import ProductCardSkeleton from '../../component/ProductCardSkeleton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
export default function ProductCatalog() {
    const [prodcutCatalog, setCatalog] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <>
            <div>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 p-2'>

                    {
                        loading ? (
                            // Show skeleton cards while loading
                            [...Array(8)].map((_, index) => (
                                <div className='p-2' key={`skeleton-${index}`}>
                                    <ProductCardSkeleton />
                                </div>
                            ))
                        ) : prodcutCatalog?.length > 0 ? (
                            prodcutCatalog.map((product) => (
                                <div className='p-2' key={product.id}>
                                    <Link to={`/product/${product.id}`} className='text-decoration-none'>
                                        <ProductCard
                                            productId={product.id}
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
                            <div className='col-12 text-center py-5'>
                                <h4 className='text-muted'>No products found</h4>
                                <p className='text-muted'>Check back later for new arrivals!</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}