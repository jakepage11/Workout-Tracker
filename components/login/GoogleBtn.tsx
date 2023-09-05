"use client"
import { Google } from "@mui/icons-material"
import { signIn } from "next-auth/react"

export default function GoogleBtn() {
  const login = () => {
    signIn("google", { callbackUrl: '/dashboard'})
  }
  return (
    <div className="bg-[var(--gray)] h-[40px] w-[240px] flex gap-4 px-4 items-center cursor-pointer rounded-[20px]"
          onClick={login}>
      <Google className=""/>
      <p className="text-[16px]">Sign in with Google</p>
    </div>
  )
}