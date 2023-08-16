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
            {/* Add the Profile icon picture if the user is logged in */}
            {user && <ProfileIcon />}
            {/* Add login button otherwise */}
            {!user && <button className="bg-[#141349] px-1 py-2 text-lg w-fit" onClick={login}>Login</button>}
          </div>
      </nav>
    </div>
  )
}