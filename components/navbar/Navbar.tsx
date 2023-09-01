'use client'
import styles from "./NavBar.module.css"
import Link from "next/link"
import mainlogo from "../../public/main_logo.png"
import titlelogo from "../../public/Long_logo.png"
// import AuthContext from "@/stores/authContext"
// import { useContext } from "react"
// import ProfileIcon from "./ProfileIcon"

export default function NavBar() {
  // const {user, login, logout} = useContext(AuthContext);

  return (
    <div className={styles.main}>
      <nav className={styles.navcontainer}>
          <Link href="/">
            <img src={titlelogo.src} alt="logo"
                  className="w-[300px]"/>
          </Link>
          <div className={styles.linksContainer}>
            <div className={styles.navBarLink}>
              <Link href="/create-workout" 
                  className={styles.link}>
                Create Workout
              </Link>
              
            </div>
            {/* {!user && <button className="style-btn" onClick={login}>
                Login
            </button>}
            {user && <ProfileIcon />} */}
          </div>
      </nav>
    </div>
  )
}