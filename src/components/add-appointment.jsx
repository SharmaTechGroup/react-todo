import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react"
import { Cookies, useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";


export function AddAppointment(){


    const [cookies, setCookie, removeCookie] = useCookies(['userid','username']);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            title: '',
            description:'',
            date: new Date(),
            user_id: cookies['userid']
        },
        onSubmit: (appointment)=>{
            axios.post('http://127.0.0.1:3000/appointments', appointment)
            .then(()=>{
                 console.log('Appointment Added');
            })
            navigate('/dashboard/details');
        }
    })

    return(
        <form onSubmit={formik.handleSubmit} className="w-50 mt-2">
            <div className="modal-header">
                <h4>Add New Appointment</h4>
            </div>
            <div className="modal-body">
                <dl>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="title" /></dd>
                    <dt>Description</dt>
                    <dd>
                        <textarea onChange={formik.handleChange} className="form-control" rows={4} cols={40} name="description"></textarea>
                    </dd>
                    <dt>Date</dt>
                    <dd>
                        <input onChange={formik.handleChange} type="date" name="date"  className="form-control" />
                    </dd>
                    
                </dl>
            </div>
            <div className="modal-footer">
                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Add</button>
                <Link to='/dashboard/details' className="btn btn-warning mx-2">Cancel</Link>
            </div>
        </form>
    )
}