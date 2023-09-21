'use client'
import { createPortal } from "react-dom";


export default function LoginFailed() {
  return createPortal (
    <div className="bg-orange-500 w-10 h-10">
      Hi
    </div>,
    document.body
  )
}
