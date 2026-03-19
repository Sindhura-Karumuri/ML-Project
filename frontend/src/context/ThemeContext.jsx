import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)
  const toggle = () => setDark(d => !d)
  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className={dark ? 'dark' : 'light'}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
