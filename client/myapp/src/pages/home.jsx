import { useState, useEffect } from 'react'
import axios from 'axios'

import ProductCard from '../component/productCard.jsx'

export default function ClientHome() {
    const [pageNumber, setPageNumber] = useState(1);
    const [limitPerPage, setLimit] = useState(10);
    const [productCatalog, setProductCatalog] = useState(null);

    // useEffect(()=>{
    //     const skip = (pageNumber -1)*limitPerPage;

    // },[pageNumber])
    return (
        <>
            <div className="container border">
                <div>
                    <ProductCard
                        image="https://via.placeholder.com/260x180"
                        name="Leather Wallet"
                        brand="Kanpuri Classic"
                        rating={4.3}
                        price={999}
                        discount={20}
                        caption="Genuine leather, stylish and durable."
                        onAddToCart={() => alert("Added to cart!")}
                        onBuyNow={() => alert("Buy now!")}
                        onWishlist={(isWishlisted) => console.log("Wishlisted:", isWishlisted)}
                    />

                </div>
            </div>
        </>
    )
}


