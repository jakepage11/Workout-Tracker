'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import LoginPage from '@/components/login/LoginPage'
import { useSession } from 'next-auth/react'

export default function Login() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl')
  const error = params.get("error")
  return (
    <div>
      <LoginPage callbackUrl={callbackUrl} error={error}/>
    </div>
  )
}
