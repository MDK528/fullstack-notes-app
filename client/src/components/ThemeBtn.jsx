import React, { useState, useEffect } from 'react'
import { Sun, Moon } from "lucide-react"
import { Button } from './ui/button.jsx'
import { useTheme } from '@/context/context.js'

function ThemeBtn({ className, children })
{
    const { themeMode, lightTheme, darkTheme } = useTheme()

    const toggleTheme = (e) =>
    {
        if (themeMode === 'light')
        {
            darkTheme()
        } else
        {
            lightTheme()
        }
    }

    return (
        <div className={className} onClick={toggleTheme}>
            {themeMode === 'light' ? <Moon hanging={16} width={16} /> : <Sun hanging={16} width={16} />}
            {children} 
        </div>
    )
}

export default ThemeBtn