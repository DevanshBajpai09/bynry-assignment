import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'







import LandingPage from "./component/LandingPage";
import Navbar from "./component/Navbar";
import SignupPage from "./Singup/Signup";
import LoginPage from "./Login/login";
import { AdminRedirect, DashboardRedirect } from "./component/Route";
import ProtectRoute from "./component/ProtectRoute";



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
        
        <Route path="/component/signupForm" element={<SignupPage />} />
        <Route path="/component/loginForm" element={<LoginPage />} />

        

        <Route element={<ProtectRoute />}>
        <Route path="/component/admin" element={<AdminRedirect />} />
        <Route path="/component/dashboard" element={<DashboardRedirect />} />
        
        </Route>
        
    
        
      </Routes>
    </Router>
    </>
  )
}

export default App
