import {createContext, useContext} from 'react'

export const themeContext = createContext({
    themeMode: 'light',
    lightTheme: () => {},
    darkTheme : () => {}
})

export const useTheme = () => {
    return useContext(themeContext)
}

export const ThemeProvider = themeContext.Provider