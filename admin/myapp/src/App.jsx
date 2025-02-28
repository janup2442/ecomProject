import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const handleClick = async ()=>{
    try{
      const result = await axios.get('https://automatic-fishstick-wpjjp696wxxh5rg7-8080.app.github.dev/',{
        withCredentials:true
      })
      console.log(result.data);
       
    }catch(err){
      console.log(err.message);
    }
  }
  return (
    <>
    <h1> hellow this is admin</h1>
    <button onClick={handleClick}>click me</button>
    </>
  )
}

export default App
