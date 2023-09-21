'use client'
import main_logo from "@/public/main_logo.png"
import styles from "./login.module.css"
import { useState } from "react"
import { Error, ToggleOff, ToggleOn } from "@mui/icons-material"
import GoogleBtn from "@/components/login/GoogleBtn"
import { signIn, signOut, useSession } from "next-auth/react"
import CurrentUser from "@/components/login/CurrentUser"
import { options } from "../../app/api/auth/[...nextauth]/options"
import { useRouter } from "next/navigation"

export default function LoginPage({callbackUrl, error}: {callbackUrl: string|null, error: string|null}) {
  const [email, setEmail] = useState(() => {return ""})
  const [password, setPassword] = useState(() => {return ""})
  const [remember, setRemember] = useState(() => {return false})
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'
  const router = useRouter()

  // Login user with current email and password
  const credentialsLogin = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await signIn('credentials', { email, password, redirect: true, callbackUrl: callbackUrl ?? "/dashboard"})
    
    
    // router.push('/dashboard')
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
          {/* Return to home button */}
          <button className="bg-[var(--pink)] rounded-full p-2 mt-4" onClick={() => router.push('/dashboard')}>Return to Dashboard</button>
        </div>
     }
      {/* Google Login */}
      { !isAuthenticated && <GoogleBtn text="Sign in with Google" width={240}/> }
      {/* Display login error if applicable */}
      {error && 
        <div className="bg-red-500 w-fit px-4 h-[40px] gap-1 text-white text-center justify-center flex items-center">
          <Error className="h-[40px]"/>
          Invalid email or password
        </div>
      }
      {/* Email and password */}
      <div className={styles.input}>
        <p>Email or username</p>
        <input onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className={styles.input}>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
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
              onClick={credentialsLogin}>
        Log in
      </button>
      <p className="hover: cursor-pointer" onClick={() => console.log("reset password")}>Forgot your password?</p>
      <hr></hr>
      <p>New user? <u onClick={() => router.push('/signup')} className="cursor-pointer">Sign up here</u></p>
    </div>
  )
}