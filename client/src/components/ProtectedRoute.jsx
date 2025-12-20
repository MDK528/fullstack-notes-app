import React from 'react'
import authService from "@/services/auth.service.js"
import  { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {

  if (!authService.isLoggedIn()) {
    return <Navigate to="/" replace/>
  } 
}