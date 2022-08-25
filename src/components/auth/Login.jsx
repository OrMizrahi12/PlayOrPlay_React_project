import { useForm } from "react-hook-form"
import './auth.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useContext } from "react"
import { AppContext } from "../../context/context"


const Login = () => {
   
    const{setUser} = useContext(AppContext)
    const URL_LOGIN = 'http://localhost:3500/auth'
    const navigate = useNavigate();
    const {
        register,
        getValues,
        handleSubmit,
        formState:
        { errors }
    } = useForm();

    const onSub = async (bodyData) => {   
       
        let {data} = await axios.post(
            "http://localhost:3500/auth",
            bodyData,
            {
                headers: { 'Content-Type': 'application/json' },
                // withCredentials:true
            }
        )
        // console.log(data)
     
        localStorage.setItem("name",data.name)
        localStorage.setItem("token",data.accessToken)
        setUser({name: data.name, token: data.accessToken})
        console.log(localStorage.getItem("token"))
        navigate('/')
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

                <button className='btn btn-outline-primary bg-dark p-3 m-2' >Order</button>
            </form>
            </div>
        </div>

    )
}

export default Login