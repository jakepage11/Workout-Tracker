'use client'
import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import netlifyIdentity from "netlify-identity-widget"

// Create blueprint authentication object
const AuthContext = createContext({
  user: null,
  authReady: false,
  login: () => {},
  logout: () => {}
});

// Create wrapper provider component
export const AuthContextProvider = ({children}) => {
  // store login state and pass down to all other components
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false)
  const router = useRouter()

  const login = () => {
    netlifyIdentity.open();
  }
  const logout = () => {
    console.log("logged out")
    netlifyIdentity.logout();
  }

  // establish connection to netlify
  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log("login event")
    });

    netlifyIdentity.on("logout", () => {
      console.log("logout event")
      setUser(null);
      // send to home and refresh
      window.location.reload();
    })

    netlifyIdentity.on('init', (user) => {
      setUser(user)
      setAuthReady(true)
      console.log("init event")
    })

    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off("login")
      netlifyIdentity.off("logout")
    }
  }, [])

  const context = {user, login, logout, authReady}
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

// export the context
export default AuthContext;