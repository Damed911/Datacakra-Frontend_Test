import { Button } from '~/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { MetaFunction } from '@remix-run/node'
import React, { useState } from 'react'
import useCredentials from '~/stores/auth-store'
import Navbar from '~/components/layouts/navbar'
import Footer from '~/components/layouts/footer'
import { Login } from '~/schema/login.schema'
import { Register } from '~/schema/register.schema'
import { toast } from 'react-toastify'

export const meta: MetaFunction = () => {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const {
    login: { mutate: loginMutate },
    register: { mutate: registerMutate },
  } = useCredentials()

  const [username, setUsername] = useState('')
  const [emailRegister, setEmailRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = {
      identifier: email,
      password: password,
    }

    const data = Login.safeParse(params)

    if (data.success) {
      loginMutate(params)
    } else {
      data.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = {
      email: emailRegister,
      username: username,
      password: passwordRegister,
    }

    const data = Register.safeParse(params)

    console.log(data)

    if (data.success) {
      registerMutate(params)
    } else {
      data.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  return (
    <div className="flex items-center justify-center p-16">
      <Navbar />
      <div className="flex items-center justify-center gap-8">
        <Tabs defaultValue="Login">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="Register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="Login">
            <div className="flex flex-col gap-4 w-full p-4 border border-gray-300 rounded-lg">
              <form
                onSubmit={handleSubmitLogin}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-300 rounded-sm p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="border border-gray-300 rounded-sm p-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-900 text-white">
                  Login
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="Register">
            <div className="flex flex-col gap-4 w-full p-4 border border-gray-300 rounded-lg">
              <h1 className="font-semibold">Enter Your Data</h1>
              <form
                onSubmit={handleSubmitRegister}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="border border-gray-300 rounded-sm p-2"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-300 rounded-sm p-2"
                    placeholder="Email"
                    value={emailRegister}
                    onChange={(e) => setEmailRegister(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="border border-gray-300 rounded-sm p-2"
                    placeholder="Password"
                    value={passwordRegister}
                    onChange={(e) => setPasswordRegister(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-900 text-white">
                  Register
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
