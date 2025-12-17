import { useState, useEffect } from 'react'
import ThemeBtn from './components/ThemeBtn.jsx'
import { ThemeProvider } from './context/context.js'
// sidebar
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar.jsx"
import Hero from './components/Hero'


function App({ children })
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
    <Hero />
    // <div>
    //   {/* <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
    //     <SidebarProvider>
    //       <AppSidebar/>
    //       <main>
    //         <SidebarTrigger />
    //         {children}
    //       </main>
    //     </SidebarProvider>
    //   </ThemeProvider> */}
    // </div>
  )
}

export default App
