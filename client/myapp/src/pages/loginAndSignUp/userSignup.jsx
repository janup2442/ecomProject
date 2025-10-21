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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true)
        
        const form = formDataToObject(new FormData(e.target));
        console.log(form)
        if(form.password !== form.confirmPassword){
            setError(true);
            setIsSubmitting(false);
            return;
        }else{
            setError(false)
        }
        try {
            const result  = await axios.post(`${import.meta.env.VITE_API_APP_HOST}/user/register`, form,{
                withCredentials:true
            });
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
            setSeverError(true);
            setRegisterSuccess(error.response?.data?.message || "Registration failed. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
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
            <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
                <Box width={400} className="mx-auto my-3 border p-3 shadow-sm">
                    <h4 className='text-center mb-4'>Create Your Account</h4>
                    <form onSubmit={handleSubmit} className='vstack gap-2 needs-validation'>
                        {
                            serverError?(<div className='alert alert-danger'>{registerSuccess}</div>):registerSuccess && (<div className='alert alert-success'>{registerSuccess}</div>)
                        }
                        <input className="form-control" type='text' placeholder='First Name' name='fName' required disabled={isSubmitting} />
                        <input className="form-control" type='text' placeholder='Middle Name(Optional)' name='mName' disabled={isSubmitting} />
                        <input className="form-control" type='text' placeholder='Last Name' name='lName' required disabled={isSubmitting} />
                        <input className="form-control" type='email' placeholder='Email' name='email' required disabled={isSubmitting} />
                        <input className="form-control" type='tel' placeholder='Phone Number' name='phone' required disabled={isSubmitting} />
                        <input className="form-control" type='password' placeholder='Password' name='password' id='givenPassword' required disabled={isSubmitting} />
                        <input className="form-control" type='password' placeholder='Confirm Password' name='confirmPassword' onChange={comparePassword} required disabled={isSubmitting} />
                        {
                            passwordMatchError && (<div className='text-danger'>Passwords do not match!</div>)
                        }
                        <Button 
                            type='submit' 
                            variant="contained" 
                            className="w-100 mt-3"
                            disabled={isSubmitting || passwordMatchError}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                        <div className="text-center mt-3">
                            <p className="mb-0">Already have an account? <a href="/login" className="text-decoration-none">Sign in</a></p>
                        </div>
                    </form>
                </Box>
            </div>
        </>
    )
}