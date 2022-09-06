import axios from "axios";
import { useForm } from "react-hook-form"
import './auth.css'
import {useNavigate} from 'react-router-dom'
import { useState } from "react";

const hreu = `>>>`
const Register = () => {
  
    const record = 0;
    const [user,serUser]=useState("")
    const navigate = useNavigate()
    const {
        register,
        getValues,
        handleSubmit,
        formState:
        { errors }
    } = useForm();

    const onSub = async (bodyData) => {
      

        delete bodyData.pwd2;
         let res = await axios.post("https://moreservgame.herokuapp.com/register",bodyData)
         console.log(res.status)
        if (res.status === 201){

         let res2 = await axios.post("https://moreservgame.herokuapp.com/flashbox",{username: bodyData.user, record:JSON.stringify(record)})
         let res3 = await axios.post("https://moreservgame.herokuapp.com/flashmemory",{username: bodyData.user, record:JSON.stringify(record)})
         let res4 = await axios.post("https://moreservgame.herokuapp.com/locationMemory",{username: bodyData.user, record:JSON.stringify(record)})
         let res5 = await axios.post("https://moreservgame.herokuapp.com/memorynum",{username: bodyData.user, record:JSON.stringify(record)})
         let res6 = await axios.post("https://moreservgame.herokuapp.com/findTheWord",{username: bodyData.user, record:JSON.stringify(record)})
          navigate('/login')
        }
        
    }

    return (
        <div className='container'>
         <h1 className="display-3 m-3 p-3" >register</h1>
           <div className="col-md-6 mx-auto shadow rounded div">
            <form onSubmit={handleSubmit(onSub)} className='col-mg-6 p-4'>
                <label>user name:</label>
                <input onChange={e => serUser(e.target.value)} {...register("user", { required: true, minLength: 2 })} type="text" className='form-control p-3'></input>
                {errors.user && <div className="text-danger d-block">user min 2 chars</div>}

                <label>password:</label>
                <input  {...register("pwd", { required: true, minLength: 5 })} type="password" className='form-control p-3'></input>
                {errors.pwd && <div className="text-danger d-block">password min 5 digits</div>}

                <label>confirm password:</label>
                <input  {...register("pwd2", {
                    required: true, validate: (value) =>
                        value === getValues("pwd")
                })} type="password" className='form-control p-3' ></input>

                {errors.pwd2 && <div className="text-danger d-block">passwords not math</div>}
                <br />
                <button className='btn btn-outline p-3 w-100' ><strong>register & play {hreu}</strong></button>
            </form>
            </div>
        </div>

    )
}

export default Register