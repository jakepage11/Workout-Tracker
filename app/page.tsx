'use client'

import { signOut } from "next-auth/react"

export default function HomePage() {

  return (
    <div className="flex flex-col">
      GOD DID
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}