import { Login } from "./login"
import { Register } from "./register"

export function Home(){
    return(
        <div className="row">
            <div className='col'>
               <div className='fs-1 fw-bold w-75 mt-4 ms-5 ps-5'>
                Stay organized, <span className='text-primary'>achieve more</span> every day.
               </div>
               <div className='ms-5 ps-5 mt-5 w-75'>
                The minimalist to-do list designed for high achievers. Manage complex projects, track deadlines, and sync across all your devices seamlessly.
               </div>
           </div>
            <div className='col'>
              <div className='ms-5 ps-5 mt-5 w-75 pe-4 rounded rounded-2'>
                  <ul className='nav nav-pills'>
                      <li className='nav-item'>
                          <a href='#login' data-bs-toggle='tab' className='nav-link active'> Login </a>
                      </li>
                       <li className='nav-item'>
                          <a href='#register' data-bs-toggle='tab' className='nav-link'> Register </a>
                      </li>
                  </ul>
                  <div className='tab-content'>
                     <div className='tab-pane active' id='login'>
                         <Login />
                     </div>
                     <div className='tab-pane' id='register'>
                         <Register />
                     </div>
                  </div>
              </div>
           </div>

        </div>
    )
}