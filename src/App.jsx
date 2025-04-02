import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'







import LandingPage from "./Component/LandingPage";
import Navbar from "./Component/Navbar";
import SignupPage from "./Singup/Signup";
import LoginPage from "./Login/login";
import { AdminRedirect, DashboardRedirect } from "./Component/Route";
import ProtectRoute from "./Component/ProtectRoute";



function App() {

  

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></> }/>
      {/* Navigation Menu */}
        
        <Route path="/signupForm" element={<SignupPage />} />
        <Route path="/loginForm" element={<LoginPage />} />

        

        <Route element={<ProtectRoute />}>
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        
        </Route>
        
    
        
      </Routes>
    </Router>
    </>
  )
}

export default App
