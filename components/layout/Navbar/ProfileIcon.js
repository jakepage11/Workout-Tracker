'use client'
import Image from "next/image"
import { useState, useContext } from "react"
import ProfileDropDown from "./ProfileDropdown"
import AuthContext from "@/stores/authContext"
import styles from "./NavBar.module.css"

export default function ProfileIcon() {
  const {user} = useContext(AuthContext)
  console.log({user})
  const [showModal, setShowModal] = useState(() => {return false})
  console.log({showModal})
  return (
    <div className={styles.profileIcon}>
      <Image src='https://sketchok.com/images/articles/01-cartoons/000-va/24/08.jpg' 
          width={48} height={48} className={styles.profileIconImg}
          onClick={() => {setShowModal(prevState => !prevState)}} alt="profile-icon"/>
      {/* TODO: Put the name of the user underneath the icon */}
      <p>{user.user_metadata.full_name}</p>
      {showModal && <ProfileDropDown />}
    </div>
      
  )
}