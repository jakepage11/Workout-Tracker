"use client"
import { Google } from "@mui/icons-material"
import { signIn } from "next-auth/react"

export default function GoogleBtn({text, width}: {text: string, width: number}) {
  const login = async() => {
    signIn("google", { callbackUrl: '/dashboard'})
  }

  return (
    <div className={`bg-[var(--gray)] h-[40px] w-[${width}px] flex gap-4 px-4 items-center cursor-pointer rounded-[20px] text-black`}
          onClick={login}>
      <Google/>
      <p className="text-[16px]">{text}</p>
    </div>
  )
}