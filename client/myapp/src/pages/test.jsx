
import FloatingAlert from '../component/floatingAlert.jsx'
export default function TestingPage() {
    return(
        <>
            <div>
                <h2>This is testing page</h2>
                <FloatingAlert message={'User logged In'} title={'success'} holdIt={5}/>
            </div>
        </>
    )
    
}