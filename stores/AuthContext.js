'use client'
import { createContext, useEffect, useState } from "react"
const netlifyIdentity = require("netlify-identity-widget")

// Setup context object
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
})

export const AuthContextProvider = ({children}) => {
  // Store context state
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  // Handle login, logout, and init behaviors
  const login = () => {
    netlifyIdentity.open();
  }
  const logout = () => {
    netlifyIdentity.logout();
  }

  useEffect(() => {
    // listen for login, logout, and init events
    netlifyIdentity.on('login', (user) => {
      setUser(user)
      netlifyIdentity.close()
    })
    netlifyIdentity.on('logout', () => {
      setUser(null)
      netlifyIdentity.close()
    })
    netlifyIdentity.on('init', (user) => {
      setAuthReady(true)
      setUser(user)
    })

    netlifyIdentity.init()
    // remove event listeners on unmount
    return () => {
      netlifyIdentity.off('login')
      netlifyIdentity.off('logout')
    }
  }, []) 

  const context = {user, authReady, login, logout}
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext