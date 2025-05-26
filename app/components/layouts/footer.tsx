import { IconCopyright } from '@tabler/icons-react'

export default function Footer() {
  return (
    <footer className="fixed w-full bottom-0 left-0 px-4 py-3 bg-blue-900">
      <div className="flex max-w-[1080px] mx-auto md:w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <IconCopyright color="white" />
          <p className="text-white"> 2025 by Muhammad Daffa Ajiputra</p>
        </div>
      </div>
    </footer>
  )
}
