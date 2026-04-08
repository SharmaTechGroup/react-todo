import { Link } from "react-router-dom";


export function Login(props){
    return(
        <div>
            <form className={`p-4 ${props.width}`}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" /></dd>
                </dl>
                <button className="btn w-100 btn-primary">Login</button>
                <div className="mt-3">
                    <Link to="/register">New User? Register</Link>
                </div>
            </form>
            
        </div>
    )
}