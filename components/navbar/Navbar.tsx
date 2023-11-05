'use client'
import styles from "./NavBar.module.css"
import Link from "next/link"
import mainlogo from "../../public/main_logo.png"
import titlelogo from "../../public/Long_logo.png"
import { signOut } from "next-auth/react"
import ProfileIcon from "./ProfileIcon"
import { usePathname } from "next/navigation"
// import AuthContext from "@/stores/authContext"
// import { useContext } from "react"
// import ProfileIcon from "./ProfileIcon"

export default function NavBar() {
  const url = usePathname()
  const pathChosenStyle = styles.link
  
  return (
    <div className={styles.main}>
      <nav className={styles.navcontainer}>
          <Link href="/dashboard">
            <img src={titlelogo.src} alt="logo"
                  className="w-[300px]"/>
          </Link>
          <div className={styles.linksContainer}>
            <div className={styles.navBarLink}>
              <Link href="/create-workout" className={pathChosenStyle}>
                Create Workout
              </Link>
            </div>
            <div className={styles.navBarLink}>
              <Link href="/log-workout" 
                  className={pathChosenStyle}>
                Log Workout
              </Link>
            </div>
            {/* Logout button */}
            <button className={styles.logoutBtn} onClick={() => {console.log("sign out"); signOut()}}>Logout</button>
            <ProfileIcon />
          </div>
          
      </nav>
    </div>
  )
}