'use client'
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function CurrentUser() {
 
  const session = useSession()
  const user = session?.data?.user

  return  (
    <>
      { user &&
        <div className="flex flex-col gap-2 text-white items-center">
          <h3 className="text-xl">Logged in as</h3>
          <Image src={user.image as string} alt="profile icon" width={40} height={40} className="rounded-full"/>
        {/* Add profile image and name */}
          <p>{user.name}</p>
        </div>
      }
    </>
  )
}