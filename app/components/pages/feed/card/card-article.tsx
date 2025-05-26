import { Separator } from '~/components/ui/separator'
import {
  IconDots,
  IconEdit,
  IconMessageCircle,
  IconTrash,
} from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { useState } from 'react'

export default function CardArticle({
  idArticle,
  title,
  content,
  creator,
  cover,
  numComment,
  submitDelete,
  editTrigger,
}: {
  idArticle: string
  title: string
  content: string
  creator: string
  cover: string | undefined
  numComment: number
  submitDelete: (idArticle: string) => void
  editTrigger: (idArticle: string) => void
}) {
  const [deleteDialog, setDeleteDialog] = useState(false)

  return (
    <div className="flex flex-col border border-black rounded-lg p-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-end items-center pb-2">
          <IconDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2" align="end">
          <DropdownMenuItem onClick={() => editTrigger(idArticle)}>
            <div className="flex items-center gap-3">
              <IconEdit />
              <span className="text-sm">Edit</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
            <div className="flex items-center gap-2 cursor-pointer text-sm">
              <IconTrash color="red" />
              <p className="text-sm">Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <img src={cover} alt="" className="w-full object-cover rounded-lg" />
      <div className="flex flex-col gap-2 justify-start">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-sm text-gray-500">by {creator}</p>
        </div>
        <p className="font-medium text-sm line-clamp-3">{content}</p>
      </div>
      <Separator />
      <div className="flex gap-2 pt-2 items-center justify-end">
        <IconMessageCircle />
        <p>{numComment}</p>
      </div>
      {deleteDialog && (
        <AlertDialog
          open={deleteDialog}
          onOpenChange={() => setDeleteDialog(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete the article?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-blue-900 text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500"
                onClick={() => submitDelete(idArticle)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
