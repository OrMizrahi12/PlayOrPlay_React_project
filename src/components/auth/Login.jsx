import { useForm } from "react-hook-form"
import './auth.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useContext, useState } from "react"
import { AppContext } from "../../context/context"
import SpinnerTool from "../tools/spinner"

const hreu = `>>>`
const Login = () => {
   
    const [spinner,setSpinner] = useState()
    const{setUser} = useContext(AppContext)
    const URL_LOGIN = 'https://gameorgameserv.herokuapp.com/auth'
    const navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        formState:
        { errors }
    } = useForm();

    const onSub = async (bodyData) => {   
        setSpinner(<SpinnerTool />)
        try{

            let {data} = await axios.post(
                "https://moreservgame.herokuapp.com/auth",
                bodyData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            
            localStorage.setItem("name",data.name)
            localStorage.setItem("token",data.accessToken)
            setUser({name: data.name, token: data.accessToken})
            console.log(localStorage.getItem("token"))
            navigate('/games')
        }catch(err){
            console.log(err)
            setSpinner(<p>somting wrong. try again</p>)
        }
        
    }

    return (
        <div className='container'>
         <h1 className="display-3 m-3 p-3" >Login</h1>
           <div className="col-md-6 mx-auto shadow rounded div ">
            <form onSubmit={handleSubmit(onSub)} className=' p-4  '>
                <label>name:</label>
                <input 
                {...register("user", { required: true, minLength: 2 })}
                 type="text" className='form-control p-3'>
                </input>
                {errors.user && <div className="text-danger d-block">name min 2 chars</div>}

                <label>password:</label>
                <input 
                {...register("pwd", { required: true, minLength: 5 })}
                 type="password" className='form-control p-3'>
                </input>
                {errors.pwd && <div className="text-danger d-block">password min 5 digits</div>}
                
                <br /> 
                <button className='btn btn-outline p-3 w-100' ><strong>log in & play {hreu}</strong></button>
                <br /><br />
               {spinner}
               
            </form>
            </div>
        </div>

    )
}

export default Login