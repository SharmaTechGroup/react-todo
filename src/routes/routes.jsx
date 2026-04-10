import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../components/login";
import { Register } from "../components/register";
import { Home } from "../components/home";
import { Dashboard } from "../components/dashboard";
import { AppointmentDetails } from "../components/appointment-details";
import { AddAppointment } from "../components/add-appointment";
import { EditAppointment } from "../components/edit-appointment";
import { DeleteAppointment } from "../components/delete-appointment";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path:'/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login width='w-25' />
            },
            {
                path: '/register',
                element: <Register width='w-25' />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                index:true,
                element: <AppointmentDetails />
            },
            {
                path:'details',
                element: <AppointmentDetails />
            },
            {
                path:'add-appointment',
                element: <AddAppointment />
            },
            {
                path: 'edit-appointment/:id',
                element: <EditAppointment />
            },
            {
                path: 'delete-appointment/:id',
                element: <DeleteAppointment />
            }
        ]
    }
    
])

export default router;
