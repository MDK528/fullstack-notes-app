import React from 'react'
import authService from "@/services/auth.service.js"
import  { Navigate } from "react-router-dom"

function ProtectedRoute() {
  if (!(authService.isLoggedIn())) {
    return <Navigate to="/" replace/>
  } 
}

export default ProtectedRoute