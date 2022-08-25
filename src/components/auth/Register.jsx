import axios from "axios";
import { useForm } from "react-hook-form"
import './auth.css'
import {useNavigate} from 'react-router-dom'

const Register = () => {
 
    const navigate = useNavigate()
    const {
        register,
        getValues,
        handleSubmit,
        formState:
        { errors }
    } = useForm();

    const onSub = async (bodyData) => {
        // למחוק את האימייל השני - אנחנו לא רוצים לשלוח לשרת שני אימיילים אותו הדבר
        delete bodyData.pwd2;
         let res = await axios.post("http://localhost:3500/register",bodyData)
         console.log(res.status)
        if (res.status === 201){
          navigate('/login')
        }
        
    }

    return (
        <div className='container'>
         <h1 className="display-3 m-3 p-3" >register</h1>
           <div className="col-md-6 mx-auto shadow rounded div">
            <form onSubmit={handleSubmit(onSub)} className='col-mg-6 p-2'>
                <label>user name:</label>
                <input {...register("user", { required: true, minLength: 2 })} type="text" className='form-control'></input>
                {errors.user && <div className="text-danger d-block">user min 2 chars</div>}

                <label>password:</label>
                <input {...register("pwd", { required: true, minLength: 5 })} type="password" className='form-control'></input>
                {errors.pwd && <div className="text-danger d-block">password min 5 digits</div>}

                <label>confirm password:</label>
                <input  {...register("pwd2", {
                    required: true, validate: (value) =>
                        value === getValues("pwd")
                })} type="password" className='form-control' ></input>

                {errors.pwd2 && <div className="text-danger d-block">passwords not math</div>}

                <button className='btn btn-outline-primary bg-dark p-3 m-2' >Order</button>
            </form>
            </div>
        </div>

    )
}

export default Register