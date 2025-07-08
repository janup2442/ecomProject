import Alert from "@mui/material/Alert";
import { useState, useEffect } from 'react'
import { useTimer } from 'react-timer-hook';

function AlertTimer({ expiryTimestamp }) {
  const {
    seconds
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called'), interval: 20 });


  return (
    <span className="p-2">{seconds}s</span>
  )
}

export default function FloatingAlert({message , title , holdIt}) {
    const [showAlert,setAlertShow]  = useState(true)
  const time = new Date();
  time.setSeconds(time.getSeconds() + holdIt); // 10 minutes timer
  useEffect(()=>{
    setTimeout(() => {
        setAlertShow(false)
    }, holdIt*1000);

  },[])
  return (
    <div className={`d-inline position-absolute end-0 me-2 mt-2 ${showAlert?null:'d-none'}`}>
        {/* Current Time is : {time.getMilliseconds()}  */}
        <br/>
        <Alert severity={title}>
            {message}
            <AlertTimer expiryTimestamp={time}/>
        </Alert>
    </div>
  );
}
