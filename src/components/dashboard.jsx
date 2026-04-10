import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Outlet, useNavigate,Link } from "react-router-dom";

export function Dashboard(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);

    let navigate = useNavigate();

    function handleSignout(){
        removeCookie('userid');
        removeCookie('username');
        navigate('/login')
    }

   

    useEffect(()=>{

        

    },[])

    return(
        <div className="container-fluid">
            <div className="p-4 fs-4 fw-bold bg-light d-flex justify-content-between" role="header">
                <span>
                    <span className="bi bi-check-square-fill"> Task Manager</span>
                    
                </span>
                <div>
                    <span className="bi bi-person-circle mx-4"> {cookies['username']} </span>
                    <button onClick={handleSignout} className="btn btn-link">Signout</button>
                </div> 
            </div>
            <div className="row mt-4" role="section">
                <div className="col-2 p-3 fs-5">
                   <div className="bi bi-calendar"> Tasks</div>
                   <div className="bi my-3 bi-clock"> History </div>
                   <div className="bi bi-gear-fill"> Settings</div>
                </div>
                <div className="col-10">
                    <div className="d-flex justify-content-center">
                        <div className="input-group w-50">
                            <input type="text" className="form-control" placeholder="Search appointments" />
                            <button className="btn btn-dark bi bi-search"></button>
                        </div>
                    </div>
                    <div className="mt-4">
                            <span className="fs-5 fw-bold">Your Appointments</span> <Link to='add-appointment' className="bi btn btn-dark ms-3 bi-plus-lg"></Link>
                            <div>
                                <Outlet />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}