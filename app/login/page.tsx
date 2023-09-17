'use client'
import main_logo from "@/public/main_logo.png"
import styles from "./login.module.css"
import { useState } from "react"
import { ToggleOff, ToggleOn } from "@mui/icons-material"
import GoogleBtn from "@/components/login/GoogleBtn"
import { signIn, signOut, useSession } from "next-auth/react"
import CurrentUser from "@/components/login/CurrentUser"
import { options } from "../api/auth/[...nextauth]/options"

export default function LoginPage() {
  const [email, setEmail] = useState(() => {return ""})
  const [password, setPassword] = useState(() => {return ""})
  const [remember, setRemember] = useState(() => {return false})
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'
 
  const credentialsLogin = () => {
    signIn('Credentials', { email, password })
  }

  return (
    <div className={styles.container}>
      <h1 className="text-white text-[40px] font-semibold">Log-in to Momentum</h1>
      <img src={main_logo.src} className="w-[50px]"/>
      {/* Current User */}
      { isAuthenticated && 
        <div className="text-white flex-col flex items-center">
          <CurrentUser />
          <p className="text-sm cursor-pointer hover:underline" onClick={() => signOut()}>Logout</p>
          <hr className="w-[250px] mt-4"></hr>
        </div>
     }
      {/* Google Login */}
      <GoogleBtn text="Sign in with Google" width={240}/>
      {/* Email and password */}
      <div className={styles.input}>
        <p>Email or username</p>
        <input onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className={styles.input}>
        <p>Password</p>
        <input type="password"/>
      </div>
      {/* Remember me selection*/}
      <div className="flex gap-2 items-center">
        {!remember && <ToggleOff onClick={() => setRemember(true)}
                              style={{color: "var(--gray)", fontSize: "40px"}} />}
        {remember && <ToggleOn onClick={() => setRemember(false)} 
                          style={{color: "var(--pink)", fontSize: "40px"}} />}
        <p className="text-white">Remember me</p>
      </div>
      <button className="bg-[var(--pink)] text-white w-[200px] rounded-full h-[40px] mt-10"
              onClick={() => console.log("log in click")}>
        Log in
      </button>
      <p className="hover: cursor-pointer" onClick={() => console.log("reset password")}>Forgot your password?</p>
      <hr></hr>
      {/* <p>New user? <u>Sign up here</u></p> */}
    </div>
  )
}