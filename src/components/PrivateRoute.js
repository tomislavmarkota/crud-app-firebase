import React from 'react'
import { useAuth } from './auth/auth-context/AuthProvider'
import { Navigate, Outlet } from 'react-router';



export default function PrivateRoute(){
    const {currentUser} = useAuth();

  if (currentUser === undefined) return null;

  return currentUser ? < Outlet /> : <Navigate to="/login" />
    
}
