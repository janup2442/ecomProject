

import {Section,ProductSlider} from '../../component/ProductComponent'


export default function ProductPage() {
    return(
        <>
            <div className='container'>
                <div className='row row-cols-1 row-cols-md-2'>
                    <div>
                        <ProductSlider imagesArray={['/productTestImg/image.png','/productTestImg/image.png','/productTestImg/image.png']}/>
                    </div>
                    <div>
                        <Section title={"Product Destription"} info={"this is product info"} />
                    </div>
                    <div className='col-md-12'>
                        <Section title={"Product Destription"} info={"this is product info"} />
                    </div>
                    <div className='col-md-12'>
                        <Section title={"Product Destription"} info={"this is product info"} />
                    </div>
                </div>
            </div>
        </>
    )
}