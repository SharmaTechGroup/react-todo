import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import { Login } from './components/login'
import { Register } from './components/register'
import store from './store/store'

function App() {


  useEffect(()=>{},[store])

  return (
    <div className='container-fluid'>
        <header className='bg-light p-3 d-flex align-items-center flex-row justify-content-between'>
            <div className='fs-3 fw-bold'>
               <Link to="/" className='text-decoration-none'><span className='bi bi-check2-square'> Task Manager</span></Link>
            </div>
            <div className='fs-5'>
              <nav>
                <span>Product</span>
                <span className='mx-4'>Features</span>
                <span>Pricing</span>
                <span className='mx-4'>Enterprise</span>
              </nav>
            </div>
            <div>
               <button className='btn'>Login</button>
               <button className='btn btn-primary mx-2'> Get Started</button>
            </div>
        </header>
        <section className='mt-5'>
            <Outlet />
        </section>
    </div>
  )
}

export default App
