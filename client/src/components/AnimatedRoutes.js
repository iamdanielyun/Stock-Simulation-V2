import '../App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import Profile from './Profile/Profile';
import Company from "./Company/Company";
import AllNews from "./Company/News/AllNews";
import Register from './Auth/Register';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import useCheckAuth from './Auth/useCheckAuth';


  function AnimatedRoutes() {
    const location = useLocation();
    const authenticated = useCheckAuth();
    console.log(authenticated);

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path='/' element={<Home />}/>
                <Route path="/profile" element={!authenticated ? <Navigate to="/login" /> : <Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={authenticated ? <Navigate to="/profile" /> : <Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/company/:symbol" element={<Company />} />
                <Route path="/company/:symbol/news" element={<AllNews />} />
                <Route path='*' element={<Navigate to="/" replace />}/>
            </Routes>
        </AnimatePresence>
    )   
  }

export default AnimatedRoutes;