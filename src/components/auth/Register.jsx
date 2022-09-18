import axios from "axios";
import { useForm } from "react-hook-form"
import './auth.css'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import SpinnerTool from "../tools/spinner";

const hreu = `>>>`
const Register = () => {
  
    const record = 0;
    const [spinner,setSpinner] = useState()
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
        setSpinner(<SpinnerTool />)
        try{
            delete bodyData.pwd2;
            let res = await axios.post("https://moreservgame.herokuapp.com/register",bodyData)
            console.log(res.status)
            if (res.status === 201){
   
            let res2 = await axios.post("https://moreservgame.herokuapp.com/flashbox",{username: bodyData.user, record:JSON.stringify(record)})
            let res3 = await axios.post("https://moreservgame.herokuapp.com/flashmemory",{username: bodyData.user, record:JSON.stringify(record)})
            let res4 = await axios.post("https://moreservgame.herokuapp.com/locationMemory",{username: bodyData.user, record:JSON.stringify(record)})
            let res5 = await axios.post("https://moreservgame.herokuapp.com/memorynum",{username: bodyData.user, record:JSON.stringify(record)})
            let res6 = await axios.post("https://moreservgame.herokuapp.com/findTheWord",{username: bodyData.user, record:JSON.stringify(record)})
            //  navigate('/login')

            try {

                let { data } = await axios.post(
                    "https://moreservgame.herokuapp.com/auth",
                    {
                        user: bodyData.user.trim(),
                        pwd: bodyData.pwd.trim()
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
    
                localStorage.setItem("name", data.name)
                localStorage.setItem("token", data.accessToken)
                console.log(localStorage.getItem("token"))
                navigate('/')
            } catch (err) {
                console.log(err)
                setSpinner(<p>somting wrong. try again</p>)
            }
           }
        }catch(err){
            setSpinner(<p>somting wrong. try again</p>)
            
        }

         
        
    }

    useEffect(() => {(() => { { localStorage.getItem("token") && navigate('/games')}})()})

    return (
        <div className='container'>
         <h1 className="display-3 m-3 p-3" >register</h1>
           <div className="col-md-6 mx-auto shadow rounded div">
            <form onSubmit={handleSubmit(onSub)} className='col-mg-6 p-4'>
                <label className="text">user name:</label>
                <input onChange={e => serUser(e.target.value)} {...register("user", { required: true, minLength: 2 })} type="text" className='form-control p-3'></input>
                {errors.user && <div className="text-danger d-block">user min 2 chars</div>}

                <label className="text">password:</label>
                <input  {...register("pwd", { required: true, minLength: 5 })} type="password" className='form-control p-3'></input>
                {errors.pwd && <div className="text-danger d-block">password min 5 digits</div>}

                <label className="text">confirm password:</label>
                <input  {...register("pwd2", {
                    required: true, validate: (value) =>
                        value === getValues("pwd")
                })} type="password" className='form-control p-3' ></input>

                {errors.pwd2 && <div className="text-danger d-block">passwords not math</div>}
                <br />                
                <button style={{color:'white', border:'solid 5px red'}} className='btn btn-primary p-3 w-100' ><strong>register & play {hreu}</strong></button>
                <br /><br />
                {spinner}           
            </form>
            <Link to="/login"><strong style={{color:'bisque'}}>user? login & play now {">>>"}</strong></Link>
            </div>
        </div>

    )
}

export default Register