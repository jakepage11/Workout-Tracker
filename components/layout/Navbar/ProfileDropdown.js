import AuthContext from "@/stores/authContext"
import { useContext } from "react"
import styles from "./NavBar.module.css"

export default function ProfileDropDown() {
  const items = ["Profile Settings", 'Invites']
  const {logout} = useContext(AuthContext) 

  return (
    <div className={styles.profileDropdown}>
      {items.map((item) => {
        return <p key={item} className={styles.dropdownItem}>{item}</p>
      })}
      <hr styles={{paddingLeft: '20px', marginRight: '5px'}}></hr>
      <p className={styles.dropdownLogout} onClick={logout}>Logout</p>
    </div>
  )
}