import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import {BrowserRouter as Router , Route , Routes , Link ,Navigate} from 'react-router-dom'
import LoginAdmin from './pages/loginPage'
import HomeAdmin from './pages/homeAdmin'


function App() {
  const [isLoggedIn , setlogin] = useState(false)
  useEffect(()=>{
    try{
      const checkLogin = async()=>{
        const result  = await axios.get('http://localhost:8080/api/admin/auth',{
          withCredentials:true
        })
        
        if(result.status>=200 &&  result.status<400  ){
          setlogin(true)
        }else if(result.status >=400){
          setlogin(false)
        }
      }
      checkLogin()
    }catch(err){
      console.log(err.message)
    }
  },[])
  
  return (
    <>
      <div className='container'>
        <Router>
          {
            isLoggedIn?<Navigate to='/dashboard' />:<Navigate to='/login' />
          }
          <Routes>
            <Route path='/login' element={<LoginAdmin/>} />
            <Route path='/dashboard' element={<HomeAdmin/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
