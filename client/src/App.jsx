import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/context.js'
import Hero from './components/Hero'
import { Routes, Route, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Note from './pages/Note.jsx'
import { ToastProvider, AnchoredToastProvider } from "@/components/ui/toast.jsx"
import Layout from './Layout.jsx';
import Signup from './pages/Signup.jsx';
import {VerifyOTP} from './pages/VerifyOTP.jsx';


function App()
{

  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('currentTheme') || 'dark')

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
      <ToastProvider>
        <AnchoredToastProvider>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path="/signup" element={<Outlet />}>
              <Route index element={<Signup />} />
              <Route path="verify-otp" element={<VerifyOTP />} />
            </Route>
            <Route
              path='/notes'
              element={
                <ProtectedRoute>
                  <Layout >
                    <div className='px-4 mt-16 min-w-100 md:min-w-300'
                    >
                      <Note />
                    </div>
                  </Layout>
                </ProtectedRoute>
              } />
          </Routes>
        </AnchoredToastProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
