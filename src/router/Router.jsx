import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Daftar from '../auth/Daftar';
import Homeindex from '../landingpage/Homeindex';
import Dashboard from '../user/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Profil from '../user/account/profil';



const Routeer = () => {
 
    

    return(

<Routes>
      <Route path="/" element={<Homeindex />}/>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
      <Route path="/daftar" element={<PublicRoute><Daftar /></PublicRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      
      <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>}/>
</Routes>

        
    );


}

export default Routeer;