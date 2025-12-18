import React, {useState, useEffect} from 'react'
import {Sun, Moon} from "lucide-react"
import { Button } from './ui/button.jsx'
import { useTheme } from '@/context/context.js'

function ThemeBtn() {
    const {themeMode, lightTheme, darkTheme} = useTheme()

    const toggleTheme = (e) => {
        if(themeMode === 'light'){
            darkTheme()
        }else{
            lightTheme()
        }
    }

    return (

        <div className=''>
            <Button variant='ghost' className='cursor-pointer outline-none rounded-full dark:bg-background bg-background ' onClick={toggleTheme}>
                {themeMode === 'light' ? <Moon/>: <Sun/>}
            </Button>
        </div>
    )
}

export default ThemeBtn