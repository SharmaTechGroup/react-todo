import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import { AddAppointment } from "./add-appointment";


export function AppointmentDetails(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);
    const [appointments, setAppointments] = useState([{id:'', title:'', description:'', date: new Date(), user_id:''}]);

    let navigate = useNavigate();

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
        <div className="mt-4">
            <table className="table table-hover caption-top">
                           
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
                                                <Link to={`/dashboard/edit-appointment/${appointment.id}`} className="btn btn-warning bi bi-pen-fill"></Link>
                                                <Link to={`/dashboard/delete-appointment/${appointment.id}`} className="btn btn-danger bi bi-trash-fill mx-2"></Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
        </div>
    )
}