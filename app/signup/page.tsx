'use client'
import GoogleBtn from "@/components/login/GoogleBtn";
import long_logo from "@/public/Long_logo.png"
import { Preview, Visibility, VisibilityOff } from "@mui/icons-material";
import { Input } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [ formData, setFormData ] = useState(() => {
    return {name: "", email: "", password: ""}
  })
  const [showPassword, setShowPassword] = useState(() =>  {return false})
  const router = useRouter()
  // Signs up user with the current form info
  const signup = async() => {
    const res = await fetch("/api/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData
      }),
    })
    // On error alert user
    if (!res.ok) {
      console.log("error occurred")
    } else {
      // If no error send user to login page
      router.push('/login')
    }
  }

  return (
    <div className="flex flex-col items-center h-screen bg-[var(--blue)] text-white gap-10">
      <div className="py-8 ">
        <h1>Get started today... </h1>
        <img src={long_logo.src} alt="logo" width={300}/>
      </div>
      <div className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <p>Full Name</p>
          <input placeholder="John Smith" className="w-[300px] h-[40px] rounded-[10px] bg-transparent px-4 border border-2 border-[var(--gray)]"
                onChange={(e) => setFormData(prevState => ({...prevState, name: e.target.value}))}/>
        </div>
        {/* Email input container */}
        <div>
          <p>Email</p>
          <input placeholder="name@domain.com" className="w-[300px] h-[40px] rounded-[10px] bg-transparent px-4 border border-2 border-[var(--gray)]"
                onChange={(e) => setFormData(prevState => ({...prevState, email: e.target.value}))}/>
        </div>
        {/* Password input container */}
        <div>
          <p>Password</p>
          <div className="relative">
            <input type={showPassword ? "text" : 'password'}
                className="w-[300px] h-[40px] rounded-[10px] bg-transparent px-4 border border-2 border-[var(--gray)]"
                onChange={(e) => setFormData(prevState => ({...prevState, password: e.target.value}))}/>
            {showPassword && 
              <VisibilityOff className="absolute right-2 top-2 cursor-pointer" onClick={() => setShowPassword(prevState => !prevState)}/>
            }
            {!showPassword && 
                <Visibility className="absolute right-2 top-2 cursor-pointer" onClick={() => setShowPassword(prevState => !prevState)}/>
              }
          </div>
        </div>
        <button className="bg-[var(--pink)] rounded-full h-[40px] mt-2" onClick={() => signup()}>Signup</button>
        
      </div>
      
      <hr className="w-[300px]"></hr>
      <GoogleBtn text={"Sign-up/Login with Google"} width={300}/>
    </div>
  )
}