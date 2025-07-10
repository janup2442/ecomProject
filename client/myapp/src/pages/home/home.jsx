import { useState, useEffect } from 'react'
import axios from 'axios'

import ProductCard from '../../component/productCard.jsx'
import ProductCatalog from '../product/productList.jsx'

export default function ClientHome() {
    const [pageNumber, setPageNumber] = useState(1);
    const [limitPerPage, setLimit] = useState(10);
    const [productCatalog, setProductCatalog] = useState(null);

    // useEffect(()=>{
    //     const skip = (pageNumber -1)*limitPerPage;

    // },[pageNumber])
    return (
        <>
            <div className="container">
                <div>
                    <ProductCatalog/>
                </div>
            </div>
        </>
    )
}


