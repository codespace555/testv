import { useState } from 'react'
import Navbar from './Components/NavBar/Navbar'
import Footer from './Components/Footer'

import { Outlet } from "react-router-dom"

function App() {
 

  return (
    <>
    <div  className="bg-gray-50 w-full h-auto">
     <Navbar/>
    <Outlet />
    <Footer/>
    </div>
     
    
    </>
  )
}

export default App
