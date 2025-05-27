import { Link, useLocation } from '@remix-run/react'
import {
  IconChevronDown,
  IconCirclesFilled,
  IconLogout2,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { getUsername } from '~/helper/credentials'
import { Skeleton } from '../ui/skeleton'
import React, { useState } from 'react'
import { Input } from '../ui/input'

export default function Navbar({
  search,
  setSearch,
  submitSearch,
}: {
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  submitSearch?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const [openLogout, setOpenLogout] = useState(false)

  const location = useLocation().pathname

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <header className="fixed w-full z-[40] md:z-[50] top-0 left-0 px-4 py-3 bg-blue-900">
      <div className="flex gap-4 max-w-[1080px] px-3 mx-auto w-full items-center justify-between">
        <Link
          to={location === '/feed' || location === '/settings' ? '/feed' : '/'}
        >
          <div className="flex items-center gap-2">
            <IconCirclesFilled color="white" />
            <h2 className="text-white font-semibold text-xl">Article.io</h2>
          </div>
        </Link>
        {location === '/' && (
          <a href="/login">
            <Button className="bg-blue-900 border w-[100px] border-white rounded-full hover:bg-white hover:text-black">
              Login
            </Button>
          </a>
        )}
        {location === '/feed' && (
          <div className="relative">
            <form>
              <Input
                placeholder="Search Article"
                className="rounded-full bg-blue-900 text-white placeholder:text-white pr-10"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="ghost"
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                onClick={submitSearch}
              >
                <IconSearch color="white" />
              </Button>
            </form>
          </div>
        )}
        {(location === '/feed' || location === '/settings') && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-transparent hover:bg-transparent border-none">
                {!getUsername() ? (
                  <Skeleton className="h-5 w-full" />
                ) : (
                  <>
                    <p className="text-white hidden sm:block">
                      {getUsername() || ''}
                    </p>
                    <IconChevronDown color="white" size={16} />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-2 py-2">
              <Link to="/settings">
                <DropdownMenuItem>
                  <IconSettings />
                  <p>Settings</p>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => setOpenLogout(true)}>
                <IconLogout2 color="red" />
                <p>Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {openLogout && (
        <AlertDialog
          open={openLogout}
          onOpenChange={() => setOpenLogout(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-blue-900 text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-500" onClick={handleLogout}>
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </header>
  )
}
