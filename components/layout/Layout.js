import NavBar from "./NavBar";
import classes from "./Layout.module.css"
import { AuthContextProvider } from "@/stores/authContext";

export default function Layout(props) {
  return (
    <AuthContextProvider>
      <div className={classes.entirepage}>
        <div className={classes.navbar}>
          <NavBar/>
        </div>
        
        <main>{props.children}</main>
      </div>
    </AuthContextProvider>
    
  )
}