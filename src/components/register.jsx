import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"



export function Register(props){


    const [msg, setMsg] = useState('');
    const [errorClass, setErrorClass] = useState('');

    function VerifyUser(e){
        axios.get(`http://127.0.0.1:3000/users`)
        .then(response=>{
            var record = response.data.find(user=> user.user_id===e.target.value);
            if(record){
                setMsg('User Id Taken - Try Another');
                setErrorClass('text-danger');
            } else {
                setMsg('User Id Available');
                setErrorClass('text-success');
            }
        })
    }

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id:'',
            user_name:'',
            password: '',
            email:''
        },
        onSubmit: (user)=>{
            axios.post(`http://127.0.0.1:3000/users`,user)
            .then(()=>{
                alert('Registered Successfully..');
                navigate('/login')
            })
           
        }
    })
    
    return(
        <div>
             <form onSubmit={formik.handleSubmit} className={`p-4 ${props.width}`}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onKeyUp={VerifyUser} name="user_id" onChange={formik.handleChange} className="form-control"/></dd>
                    <dd className={errorClass}>{msg}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="user_name" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="email" onChange={formik.handleChange} className="form-control"/></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Register</button>
                 <div className="mt-3">
                    <Link to="/login">Have Account? Login</Link>
                </div>
            </form>
        </div>
    )
}