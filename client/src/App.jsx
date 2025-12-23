import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/context.js'
import Hero from './components/Hero'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Note from './pages/Note.jsx'
import { ToastProvider, AnchoredToastProvider } from "@/components/ui/toast.jsx"
import Layout from './Layout.jsx';


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
                  <div className='px-4 mt-16 mx-2 lg:min-w-350'
                  >
                      <Note/>
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
