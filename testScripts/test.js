import axios from "axios";
import { urlencoded } from "express";

const handleSumbit = async function () {
    try{
        const user = {
            name:"Anup jaiswal",
            email:"kcl.co.in",
            password:"testPassword"
        }
        const response = await axios.post('http://localhost:8080/api/login/?name=showmeAnup&password=this is a test password',{
            userEmail:"Anup jaiswal",
            userPassword:"kcl@co"
        });
        console.log(response.data);
    }catch(error){
        console.error(error);
    }
}

handleSumbit();