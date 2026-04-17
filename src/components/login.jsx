import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useCaptcha } from "../hooks/use-captcha";


export function Login(props){


    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);

    let navigate = useNavigate();

    let code = useCaptcha();

    const formik = useFormik({
        initialValues: {
            user_id : '',
            user_name: '',
            password:''
        },
        onSubmit: (user)=>{
             axios.get(`http://127.0.0.1:3000/users`)
             .then(response=>{
                var record = response.data.find(item=> item.user_id===user.user_id);
                if(record){
                    if(user.password===record.password){
                        setCookie('userid', record.user_id);
                        setCookie('username', record.user_name);
                        navigate('/dashboard');
                    } else {
                         alert('Invalid Password');
                    } 
                } else {
                    alert('Invalid User Id');
                }
             })
        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit} className={`p-4 ${props.width}`}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="user_id" className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="password" className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn w-100 btn-primary">Login</button>
                <div className="mt-3">
                    <Link to="/register">New User? Register</Link>
                </div>
            </form>
            
        </div>
    )
}