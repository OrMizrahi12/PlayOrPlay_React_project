import { useForm } from "react-hook-form"
import './auth.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from "react"
import { AppContext } from "../../context/context"
import SpinnerTool from "../tools/spinner"
import { useEffect } from "react"

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
            navigate('/')
        }catch(err){
            console.log(err)
            setSpinner(<p>somting wrong. try again</p>)
        }
        
    }

    useEffect(() => {(() => { { localStorage.getItem("token") && navigate('/games')}})()})

    return (
        <div className='container'>
         <h1 className="display-3 m-3 p-3" >Login</h1>
           <div className="col-md-6 mx-auto shadow rounded div ">
            <form onSubmit={handleSubmit(onSub)} className=' p-4  '>
                <label className="text">name:</label>
                <input 
                {...register("user", { required: true, minLength: 2 })}
                 type="text" className='form-control p-3'>
                </input>
                {errors.user && <div className="text-danger d-block">name min 2 chars</div>}

                <label className="text">password:</label>
                <input 
                {...register("pwd", { required: true, minLength: 5 })}
                 type="password" className='form-control p-3'>
                </input>
                {errors.pwd && <div className="text-danger d-block">password min 5 digits</div>}
                
                <br /> 
                <button style={{color:'white', border:'solid 5px red'}} className='btn btn-primary p-3 w-100' ><strong>log in & play {hreu}</strong></button>
                <br /><br />
               {spinner}
               
            </form> 
            <Link to="/register"><strong style={{color:'bisque'}}>new? register & play now {">>>"}</strong></Link>
            </div>
        </div>

    )
}

export default Login