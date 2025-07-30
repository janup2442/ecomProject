import { useState, useEffect } from 'react'
import axios from 'axios'

import ProductCard from '../../component/productComponents/productCard.jsx'
import ProductCatalog from '../product/productList.jsx'

export default function ClientHome() {
    const [pageNumber, setPageNumber] = useState(1);
    const [limitPerPage, setLimit] = useState(10);
    const [productCatalog, setProductCatalog] = useState(null);

    // useEffect(()=>{
    //     const skip = (pageNumber -1)*limitPerPage;

    // },[pageNumber])

    useEffect(()=>{
        console.log('you are on home page');
        
    },[])
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


