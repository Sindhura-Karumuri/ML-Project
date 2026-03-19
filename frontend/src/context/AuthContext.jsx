import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ml_user')) } catch { return null }
  })

  const signin = (userData) => {
    localStorage.setItem('ml_user', JSON.stringify(userData))
    setUser(userData)
  }

  const signout = () => {
    localStorage.removeItem('ml_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
