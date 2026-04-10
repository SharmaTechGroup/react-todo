import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export function EditAppointment(){


    let params = useParams();
    let navigate = useNavigate();

    const [appointment, setAppointment] = useState({id:'', title:'', description:'', date: new Date(), user_id:''});

    const formik = useFormik({
        initialValues: {
            id: appointment.id,
            title: appointment.title,
            description: appointment.description,
            date: new Date(appointment.date),
            user_id: appointment.user_id
        },
        onSubmit: (appointment)=>{
             axios.put(`http://127.0.0.1:3000/appointments/${params.id}`, appointment)
             .then(()=>{
                console.log('Updated');
             })
             navigate('/dashboard/details');
        },
        enableReinitialize: true
    })

    function LoadAppointment(){

         axios.get(`http://127.0.0.1:3000/appointments/${params.id}`)
         .then(response=>{
            setAppointment(response.data);
         })

    }

    useEffect(()=>{

        LoadAppointment();

    },[])

    return(
        <div className="mt-4">
            <h5>Edit Appointment</h5>
            <form className="w-50" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} value={formik.values.title} name="title" className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd>
                        <textarea rows={4} onChange={formik.handleChange} value={formik.values.description} className="form-control" cols={40} name="description"></textarea>
                    </dd>
                    <dt>Date</dt>
                    <dd>
                        <input type="date" onChange={formik.handleChange} value={moment(formik.values.date).format('yyyy-MM-DD')} name="date" className="form-control" />
                        
                    </dd>
                </dl>
                <button className="btn btn-success mx-2">Save</button>
                <Link to="/dashboard/details" className="btn btn-warning">Cancel</Link>
            </form>
        </div>
    )
}