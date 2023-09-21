'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import LoginPage from '@/components/login/LoginPage'

export default function Login() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl')
  const error = params.get("error")
  console.log({error})
  console.log({callbackUrl})
  return (
    <div>
      <LoginPage callbackUrl={callbackUrl} error={error}/>
    </div>
  )
}
