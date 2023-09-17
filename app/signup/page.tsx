'use client'
import GoogleBtn from "@/components/login/GoogleBtn";
import long_logo from "@/public/Long_logo.png"
import { Preview, Visibility, VisibilityOff } from "@mui/icons-material";
import { Input } from "@mui/material";
import { useState } from "react";

export default function SignupPage() {
  const [password, setShowPassword] = useState({
    password: "",
    showPassword: false,
  })

  const changeVisibility = () => {
    setShowPassword(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }))
  }

  return (
    <div className="flex flex-col items-center h-screen bg-[var(--blue)] text-white gap-10">
      <div className="py-8 ">
        <h1>Get started today... </h1>
        <img src={long_logo.src} alt="logo" width={300}/>
      </div>
      <div className="flex flex-col gap-4">
        {/* Email input container */}
        <div>
          <p>Email</p>
          <input placeholder="name@domain.com" className="w-[300px] h-[40px] rounded-[10px] bg-transparent px-4 border border-2 border-[var(--gray)]"/>
        </div>
        {/* Password input container */}
        <div>
          <p>Password</p>
          <div className="relative">
            <input type={password.showPassword ? "text" : 'password'}
                className="w-[300px] h-[40px] rounded-[10px] bg-transparent px-4 border border-2 border-[var(--gray)]"/>
            {password.showPassword && 
              <VisibilityOff className="absolute right-2 top-2 cursor-pointer" onClick={changeVisibility}/>
            }
            {!password.showPassword && 
                <Visibility className="absolute right-2 top-2 cursor-pointer" onClick={changeVisibility}/>
              }
          </div>
        </div>
        
      </div>
      
      <hr className="w-[300px]"></hr>
      <GoogleBtn text={"Sign up with Google"} width={300}/>
    </div>
  )
}