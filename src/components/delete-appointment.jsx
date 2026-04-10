import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export function DeleteAppointment(){

    let params = useParams();
    let navigate = useNavigate();

    const [appointment, setAppointment] = useState({id:'', title:'', description:'', date: new Date(), user_id:''});

     function LoadAppointment(){

         axios.get(`http://127.0.0.1:3000/appointments/${params.id}`)
         .then(response=>{
            setAppointment(response.data);
         })

    }

    useEffect(()=>{

        LoadAppointment();

    },[])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:3000/appointments/${params.id}`)
        .then(()=>{
            console.log('Deleted..');
        })
        navigate('/dashboard/details');
    }

    return(
        <div className="mt-4">
            <h5>Delete Appointment</h5>
            <dl>
                <dt>Title</dt>
                <dd>{appointment.title}</dd>
                <dt>Description</dt>
                <dd>{appointment.description}</dd>
                <dt>Date</dt>
                <dd>{moment(appointment.date).format('MM-DD-yyyy')}</dd>
            </dl>
            <div className="fw-bold fs-5">Are you sure?</div>
            <div className="mt-4">
                <button onClick={handleDeleteClick} className="btn btn-primary mx-2">Yes</button>
                <Link to='/dashboard/details' className="btn btn-danger"> No</Link>
            </div>
        </div>
    )
}