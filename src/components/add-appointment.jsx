import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react"
import { useCookies } from "react-cookie"


export function AddAppointment(props){



    const formik = useFormik({
        initialValues:{
            title: '',
            description:'',
            date: new Date(),
            user_id: props.user_id
        },
        onSubmit: (appointment)=>{
            axios.post('http://127.0.0.1:3000/appointments', appointment)
            .then(()=>{
                 console.log('Appointment Added');
            })
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
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
                <button type="button" data-bs-dismiss="modal" className="btn btn-warning">Cancel</button>
            </div>
        </form>
    )
}