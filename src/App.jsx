import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import LandingPage from './Component/LandingPage'
import Navbar from './Component/Navbar'
import LoginPage from "./Login/login";
import SignupPage from "./Singup/Signup";

import ProtectRoute from "./Component/ProtectRoute";

import { AdminRedirect, DashboardRedirect } from "./Component/Route";



function App() {

  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <LandingPage />
          
        </> }/>
      {/* Navigation Menu */}
        
        <Route path="/Component/SignupForm" element={<SignupPage />} />
        <Route path="/Component/LoginForm" element={<LoginPage />} />

        

        <Route element={<ProtectRoute />}>
        <Route path="/Component/Admin" element={<AdminRedirect />} />
        <Route path="/Component/Dashboard" element={<DashboardRedirect />} />
        
        </Route>
        
    
        
      </Routes>
    </Router>
    </>
  )
}

export default App
