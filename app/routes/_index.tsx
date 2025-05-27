import type { MetaFunction } from '@remix-run/node'
import {
  IconDeviceDesktop,
  IconNotebook,
  IconPlaneDeparture,
  IconSofa,
} from '@tabler/icons-react'
import { useEffect } from 'react'
import Footer from '~/components/layouts/footer'
import Navbar from '~/components/layouts/navbar'

export const meta: MetaFunction = () => {
  return [
    { title: 'Article.io' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken') as string

    if (token) {
      window.location.href = '/feed'
    }
  })

  return (
    <div className="flex h-screen items-center p-16">
      <Navbar />
      <div className="flex flex-col md:flex-row md:w-[calc(100% - 30px)] gap-8 md:gap-0 w-full mx-auto items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-[100px] font-bold">Welcome to</h1>
          <h2 className="text-[80px] font-semibold">Article.io</h2>
          <p className="text-lg font-medium">Where Curiosity Meets Clarity.</p>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-2 gap-4 items-center">
          <IconNotebook className="size-[75px] md:size-[125px] lg:size-[250px]" />
          <IconPlaneDeparture className="size-[75px] md:size-[125px] lg:size-[250px]" />
          <IconDeviceDesktop className="size-[75px] md:size-[125px] lg:size-[250px]" />
          <IconSofa className="size-[75px] md:size-[125px] lg:size-[250px]" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
