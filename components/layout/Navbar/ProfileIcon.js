'use client'
import Image from "next/image"
import { useState } from "react"
import ProfileDropDown from "./ProfileDropdown"

export default function ProfileIcon() {
  const [showModal, setShowModal] = useState(() => {return false})
  console.log({showModal})
  return (
    <div>
      <Image src='https://sketchok.com/images/articles/01-cartoons/000-va/24/08.jpg' 
          width={48} height={48} className="rounded-full cursor-pointer shadow-md hover:ring-2 hover:ring-[#FFBAB7]"
          onClick={() => {setShowModal(prevState => !prevState)}}/>
      {/* TODO: Here lies the modal */}
      {showModal && <ProfileDropDown />}
    </div>
      
  )
}