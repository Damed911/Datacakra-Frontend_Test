import Navbar from '~/components/layouts/navbar'
import { MetaFunction } from '@remix-run/node'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { IconMessageCircle } from '@tabler/icons-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const meta: MetaFunction = () => {
  return [
    { title: 'Feed' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken') as string

    if (!token) {
      toast.error('You must signin!', {
        theme: 'colored',
        autoClose: 2000,
      })

      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 py-20 gap-4 max-w-[1080px] px-2 mx-auto h-screen">
        <div className="col-span-1">
          <div className="flex flex-col gap-3 border border-gray-300 p-4 bg-gray-300/75 rounded-lg">
            <h1 className="font-semibold text-lg">Categories List</h1>
            <li>
              <p>Kategori 1</p>
              <p>Kategori 2</p>
              <p>Kategori 3</p>
              <p>Kategori 4</p>
            </li>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 w-full">
              <input
                type="text"
                placeholder="Search Article"
                className="w-full p-2 border border-gray-300/75 rounded-lg"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create Article</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Create Article</DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col border border-black rounded-lg">
              <div className="flex items-center p-2">
                <img
                  src=""
                  alt=""
                  className="w-[500px] object-cover rounded-s-lg"
                />
                <div className="flex flex-col gap-2 justify-start">
                  <p className="text-sm text-gray-300">Username</p>
                  <p className="text-xl font-semibold">Judul</p>
                  <p className="font-medium line-clamp-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
              <Separator className="px-4" />
              <div className="flex gap-2 p-2 items-center justify-end">
                <IconMessageCircle />
                <p>23</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
