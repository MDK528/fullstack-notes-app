import React, { useState, useEffect } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar.jsx"
import authService from './services/auth.service'

function Layout({ children })
{
  const[user, setUser] = useState(null)

   useEffect(()=>{
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser()
                setUser(userData.data) 
            } catch (error) {
                console.log("Something went wrong while fetching user: ", error)
            }
        }
        fetchUser()
    },[])

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <div className='fixed w-full dark:bg-background bg-background'>
            <div className='flex items-center px-4 py-2 md:py-4 lg:py-4'>
              <SidebarTrigger className={'cursor-pointer md:sr-only lg:sr-only'} />
              <h1 className='text-xl font-semibold sm:text-2xl'>Hi {user ? user.fullName : ''}</h1>
            </div>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  )
}

export default Layout