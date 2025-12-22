import React, { useEffect, useState } from 'react'
import authService from "@/services/auth.service.js"
import  { Navigate  } from "react-router-dom"

export default function ProtectedRoute({children}) {
  const [isLoggedIn, setIsloggedIn] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const loggedIn = await authService.isLoggedIn()
        // console.log('🔒 ProtectedRoute: Auth status =', loggedIn)
        setIsloggedIn(loggedIn)
      } catch (error) {
        // console.error('🔒 ProtectedRoute: Auth check failed', error)
        setIsloggedIn(false)
      }finally{
        setLoading(false)
      }
    }

    checkAuth()
  },[])

  if (loading) {
    return <div className='flex w-full h-screen justify-center items-center text-xl'>
              Loading.....
           </div>
    // return null
  }

  if (!isLoggedIn) {
    return (<Navigate to="/" replace/>)
  } 

  return <>{children}</>
}