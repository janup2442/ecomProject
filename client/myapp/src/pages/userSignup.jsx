import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'




export default function UserSignUp() {
    const [isPasswordVisible  , setVisibility] = useState(false);
    const [serverError , setSeverError] = useState(false)
    const [passwordMatchError , setError] = useState(false);
    const [registerSuccess , setRegisterSuccess] = useState(null);

    function formDataToObject(formData) {
        const jsonObject = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }
        return jsonObject; // Return object, not JSON string
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterSuccess(null)
        const form = formDataToObject(new FormData(e.target));
        console.log(form)
        if(form.password !== form.confirmPassword){
            setError(true);
            return;
        }else{
            setError(false)
        }
        try {
            const result  = await axios.post(`${import.meta.env.VITE_API_APP_HOST}/user/register`, form);
            if(result.status<400 && result.status>=200){
                setSeverError(false);
                setRegisterSuccess(result.data.message)
                setTimeout(() => {
                    navigate('/login')
                }, 3000);
            }else{
                setSeverError(true);
                setRegisterSuccess(result.data.message)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const togglePasswordVisibility  = ()=>{
        setVisibility(!isPasswordVisible);
    }
    const comparePassword = (e)=>{
        let givenPassword = document.querySelector('#givenPassword').value;
        if(givenPassword === e.target.value){
            setError(false);
        }else{
            setError(true);
        }
    }



    return (
        <>
            <Box width={400} className="mx-auto my-3 border p-3 shadow-sm">
                <h4 className='text-center mb-4'>Create Your Account</h4>
                <form onSubmit={handleSubmit} className='vstack gap-2 needs-validation'>
                    {
                        serverError?(<div className='text-danger'>{registerSuccess}</div>):(<div className='text-success'>{registerSuccess}</div>)
                    }
                    <input className="form-control" type='text' placeholder='First Name' name='fName' required />
                    <input className="form-control" type='text' placeholder='Middle Name(Optional)' name='mName' />
                    <input className="form-control" type='text' placeholder='Last Name' name='lName' required />
                    <input className="form-control" type='text' placeholder='Email' name='email' required />
                    <input className="form-control" type='text' placeholder='Phone' name='phone' required />
                    <input id='givenPassword' className="form-control" type={isPasswordVisible?'text':'password'} placeholder='Password' name='password' required />
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input' onChange={togglePasswordVisibility}/>
                        <label htmlFor="">Show Password</label>
                    </div>
                    <div>
                        <input type='password' name='confirmPassword' className={`form-control ${passwordMatchError?'outline-danger':'outline-success'}`} placeholder='Confirm Passwrod' required onChange={comparePassword}/>
                        {
                            passwordMatchError?(<div className='p-1 text-danger'>Password do not match</div>):null
                        }
                    </div>
                    <button type='submit' className='btn btn-primary'>Sign Up</button>
                </form>
            </Box>
        </>
    )
}