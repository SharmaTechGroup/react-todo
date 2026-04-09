import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../components/login";
import { Register } from "../components/register";
import { Home } from "../components/home";
import { Dashboard } from "../components/dashboard";

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
        
    }
    
])

export default router;
