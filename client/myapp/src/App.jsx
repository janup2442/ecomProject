import { useState } from 'react'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const handleClick =async ()=>{
    const demoElement = document.getElementById('demo')
    const result = await axios.get('https://automatic-fishstick-wpjjp696wxxh5rg7-8080.app.github.dev/',{
      withCredentials:true
    }).
    then(response=>{
      console.log(response.data);
    }).catch(err=>{
      console.log(err.message);
    })
  }
  return (
    <>
      <h1>hi , sololeveling</h1>
      <button onClick={handleClick}>click it</button>
      <pre id='demo'></pre>
    </>
  )
}

export default App
