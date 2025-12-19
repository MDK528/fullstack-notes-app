import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/context.js'
import Hero from './components/Hero'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Note from './pages/Note.jsx'




function App()
{

  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('currentTheme') || 'light')

  const lightTheme = () =>
  {
    setThemeMode('light')
  }
  const darkTheme = () =>
  {
    setThemeMode('dark')
  }

  useEffect(() =>
  {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)
    localStorage.setItem('currentTheme', themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' element={<Hero />}/>
          <Route 
            path='/notes' 
            element={ 
            <ProtectedRoute> 
              <Note/> 
            </ProtectedRoute> 
          }/>
        </Routes>
      {/* </BrowserRouter> */}
    </ThemeProvider>
  )
}

export default App
