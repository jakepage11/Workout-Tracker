'use client'
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function ProfileIcon() {
  const session = useSession()
  const user = session?.data?.user
  const profileImage = user?.image

  return (
    <img src={profileImage as string} alt="profile icon" width={40} height={40} className="rounded-full"/>
  )
}
