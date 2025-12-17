import React from 'react'
import { NotebookPen } from "lucide-react"
import SignIn from "@/components/SignIn.jsx"

function Hero() {

  return (
    <div className='fixed inset-0 z-0 bg-[radial-gradient(140%_140%_at_50%_90%,#000000_50%,#350136_100%)]  
    sm:bg-[radial-gradient(150%_120%_at_40%_100%,#000000_30%,#350136_100%)]' 
    >
        <div className='flex items-center justify-between px-2 md:px-4 py-2 md:py-4'>
            <div className='flex items-center justify-center gap-2'>
                <NotebookPen className='text-background' height={28} width={28}/>
                <span className='text-background text-base font-semibold md:font-bold md:text-lg'>Keep Your Notes</span>
            </div>

            <SignIn/>
        </div>
        <div className='px-10 lg:px-100 py-6 lg:py-10'>
            <h1 
            className='text-3xl sm:text-4xl font-bold sm:text-center text-background'
            >Your Notes. Instantly Summarized.</h1>
        </div>

    </div>
  )
}

export default Hero