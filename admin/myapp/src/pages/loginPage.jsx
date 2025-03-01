import { useState } from "react"
import axios, { formToJSON } from "axios"
import { Navigate, useNavigate } from "react-router";


export default function LoginAdmin(){
    
    const navigate  = useNavigate()
    const handleSubmit = async(e)=>{
        const errorBlock = document.getElementById('errorBlock')
        e.preventDefault();
        const formData = new FormData(e.target)
        const loginForm = formToJSON(formData)
        console.log(loginForm);
        errorBlock.innerText = "Anup jaiswal"
        if(false){
            // validateForm(loginForm)
            errorBlock.innerText = "All field are required."
        }else{
            try{
                const loginUser  = async()=>{
                    const result = await axios.post('http://localhost:8080/api/admin/login',loginForm , {
                        withCredentials:true
                    })
                    if(result.status>=200 && result.status<400){
                        sessionStorage.clear();
                        sessionStorage.setItem('userId' , result.data.userId)
                        sessionStorage.setItem('userName' , result.data.userName)
                        sessionStorage.setItem('userRole' , result.data.role)
                        // navigate('/')
                        console.log(result.data.message);
                        
                    }else{
                        errorBlock.innerText = result.message
                    }
                    console.log(result.data);
                }
                loginUser()
            }catch(err){
                errorBlock.innerText = err.message
            }
        }
    }
    return(
        <>
            <div className="container">
                <div className="text-center fs-4 fw-semibold p-3">Admin Login</div>
                <form action="" className="vstack gap-2 mx-auto p-3" style={{maxWidth:"400px"}} id="adminLoginForm" onSubmit={(e)=>handleSubmit(e)}>
                    <input type="email" className="form-control rounded-0"  name="userEmail" placeholder="Enter Email ID" required minLength={3}/>
                    <input type="password"  className="form-control rounded-0" name="userPassword" placeholder="Enter your password" required minLength={8}/>
                    <button type="submit" className="rounded-0 btn btn-outline-dark">Admin Login</button>
                </form>
                <small id="errorBlock" className="text-danger fw-semibold"></small>
            </div>
        </>
    )
}