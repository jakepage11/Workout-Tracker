'use client'
import classes from "./NavBar.module.css"
import Link from "next/link"
import ndaLogo from "../../../public/logos/NDA_logo.svg"
import AuthContext from "@/stores/authContext"
import { useContext } from "react"
import ProfileIcon from "./ProfileIcon"

export default function NavBar() {
  const {user, login, logout} = useContext(AuthContext);

  return (
    <div className={classes.main}>
      <nav>
          <div className={classes.logoContainer}>  
            <Link href="/"  
                  style={{textDecoration: 'none', color: 'inherit', fontSize: "24px"}}>
              <img src={ndaLogo.src} alt="logo"
                  className={classes.logoImg}/>
            </Link>
            <h1>
              Movementum
            </h1>
          </div>
          <div className={classes.tabLinksContainer}>
            <div className={classes.navBarLink}>
              <Link href="/create-workout" 
                  style={{textDecoration: 'none', color: 'inherit', fontSize: "24px"}}>
                Create Workout
              </Link>
              
            </div>
            {/* TODO: Add the Profile icon picture */}
            <ProfileIcon />
          </div>
      </nav>
    </div>
  )
}