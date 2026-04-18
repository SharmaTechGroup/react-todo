import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { AddAppointment } from "./add-appointment";
import { useDispatch } from "react-redux";
import { addToShared } from "../slicers/task-slicer";
import store from "../store/store";


export function AppointmentDetails(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);
    const [appointments, setAppointments] = useState([{id:'', title:'', description:'', date: new Date(), user_id:''}]);

    let navigate = useNavigate();

    let searchString = useOutletContext();
    let dispatch = useDispatch();

    const LoadAppointments = useCallback(()=>{
         axios.get(`http://127.0.0.1:3000/appointments`)
         .then(response=>{
             setAppointments(response.data);
         })
    },[cookies, appointments])

    const userAppointments = useMemo(()=>{

         return appointments.filter(appointment=> appointment.user_id===cookies['userid']);

    },[appointments])

    const filteredAppointments = useMemo(()=>{

          if(searchString===""){
                return userAppointments;
          } else {
                return userAppointments.filter(appointment=> appointment.title.toLowerCase().includes(searchString.toLowerCase()));
          }

    },[searchString, appointments])

   
    useEffect(()=>{
        LoadAppointments();
       
    },[appointments, cookies, store])

    function handleShareClick(appointment){
        var stat = confirm(`Are your sure? What to share\n${appointment.title}`);
        if(stat===true){
             dispatch(addToShared(appointment));
             navigate('/dashboard');
        }
    }

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
                                   
                                    filteredAppointments.map(appointment=>
                                        <tr key={appointment.id}>
                                            <td>{appointment.title}</td>
                                            <td>{moment(appointment.date).format('DD dddd, MMMM yyyy')}</td>
                                            <td>
                                                <Link to={`/dashboard/edit-appointment/${appointment.id}`} className="btn btn-warning bi bi-pen-fill"></Link>
                                                <Link to={`/dashboard/delete-appointment/${appointment.id}`} className="btn btn-danger bi bi-trash-fill mx-2"></Link>
                                                <button onClick={()=>{handleShareClick(appointment)}} className="btn btn-dark bi bi-share-fill me-2"></button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
        </div>
    )
}