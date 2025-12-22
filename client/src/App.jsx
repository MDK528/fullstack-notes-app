import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/context.js'
import Hero from './components/Hero'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Note from './pages/Note.jsx'
import { ToastProvider, AnchoredToastProvider } from "@/components/ui/toast.jsx"
import Layout from './Layout.jsx';
import { Sigma } from 'lucide-react';
import './index.css'



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
            <Route path='/' element={<Hero />}/>
            <Route 
              path='/notes' 
              element={ 
              <ProtectedRoute>
                <Layout >
                  <div className='pr fixed  overflow-y-scroll px-4 py-4 m-2 md:m-4 h-[90%] border dark:border-neutral-700 rounded-xl'
                  >
                    <div className=''>
                      <Note/>
                      <Sigma/>
                    </div>    
                  </div>
                </Layout>
              </ProtectedRoute>
            }/>
          </Routes>
        </AnchoredToastProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
