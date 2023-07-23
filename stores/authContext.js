import { createContext, useState, useEffect } from "react"
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

  const login = () => {
    netlifyIdentity.open();
    console.log("logging in")
  }

  const logout = () => {
    netlifyIdentity.logout();
    console.log("logging out")
  }

  // establish connection to netlify
  useEffect(() => {
    netlifyIdentity.init();

    netlifyIdentity.on("login", (user) => {
      login();
      setUser(user);
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
    })

    return () => {
      logout();
      netlifyIdentity.off("login")
      netlifyIdentity.off("logout")
    }
  }, [])

  const context = {user, login, logout}
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

// export the context
export default AuthContext;