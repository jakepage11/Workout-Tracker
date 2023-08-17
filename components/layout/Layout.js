import NavBar from "./Navbar/NavBar";
import classes from "./Layout.module.css"
import Footer from "./Footer"

export default function Layout(props) {
  
  return (
      <div className={classes.entirepage}>
        <NavBar/>
      
        
        <main>{props.children}</main>
        <Footer />
      </div>
  )
}