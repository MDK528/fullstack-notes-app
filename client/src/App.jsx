import { useState, useEffect } from 'react'
import Comp from './components/Comp'
import { ThemeProvider } from './context/context'
// sidebar
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar.jsx"


function App({children}) {

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
      <div>
        <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
          <SidebarProvider>
            <AppSidebar/>
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </div>
    )
}

export default App
