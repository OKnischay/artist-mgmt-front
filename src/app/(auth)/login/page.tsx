import React from 'react'
import { LoginForm } from '@/components/auth/login-form'
import Image from 'next/image'

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 md:px-12">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-xl bg-gray-100 shadow-lg md:flex-row">
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/loginImg.jpg"
            alt="Login Image"
            width={1920}
            height={1080}
            className="h-full w-full object-cover wavy-mask"
          />
        </div>
        <div className="w-full md:w-1/2">
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

export default LoginPage