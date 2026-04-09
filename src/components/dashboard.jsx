import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { AddAppointment } from "./add-appointment";

export function Dashboard(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);
    const [appointments, setAppointments] = useState([{id:'', title:'', description:'', date: new Date(), user_id:''}]);

    let navigate = useNavigate();

    function handleSignout(){
        removeCookie('userid');
        removeCookie('username');
        navigate('/login')
    }

    function LoadAppointments(){

            axios.get(`http://127.0.0.1:3000/appointments`)
            .then(response=>{
                var records = response.data.filter(appointment=> appointment.user_id===cookies['userid']);
                setAppointments(records);
            })

    }

    useEffect(()=>{

        LoadAppointments();

    },[appointments])

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
                        <table className="table table-hover caption-top">
                            <caption> Your Appointments <button data-bs-target="#newAppointment" data-bs-toggle="modal" className="bi btn btn-dark ms-3 bi-plus-lg"></button> </caption>
                            <div className="modal fade" id="newAppointment">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                         <AddAppointment user_id={cookies['userid']} />
                                    </div>
                                </div>
                            </div>
                            <thead>
                                <tr>
                                    <th> Title </th>
                                    <th> Date </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.map(appointment=>
                                        <tr key={appointment.id}>
                                            <td>{appointment.title}</td>
                                            <td>{moment(appointment.date).format('DD dddd, MMMM yyyy')}</td>
                                            <td>
                                                <button className="btn btn-warning bi bi-pen-fill"></button>
                                                <button className="btn btn-danger bi bi-trash-fill mx-2"></button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}