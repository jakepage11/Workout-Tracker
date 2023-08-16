'use client'
import Image from "next/image"
import { useState, useContext } from "react"
import ProfileDropDown from "./ProfileDropdown"
import AuthContext from "@/stores/authContext"

export default function ProfileIcon() {
  const {user} = useContext(AuthContext)
  console.log({user})
  const [showModal, setShowModal] = useState(() => {return false})
  console.log({showModal})
  return (
    <div className="flex flex-col items-center relative">
      <Image src='https://sketchok.com/images/articles/01-cartoons/000-va/24/08.jpg' 
          width={48} height={48} className="bg-black rounded-full cursor-pointer shadow-md hover:ring-2 hover:ring-[#FFBAB7] align-middle p-0"
          onClick={() => {setShowModal(prevState => !prevState)}} alt="profile-icon"/>
      {/* TODO: Put the name of the user underneath the icon */}
      <p>{user.user_metadata.full_name}</p>
      {showModal && <ProfileDropDown />}
    </div>
      
  )
}