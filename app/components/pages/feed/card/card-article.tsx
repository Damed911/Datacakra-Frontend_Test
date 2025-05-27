import { Separator } from '~/components/ui/separator'
import { IconDots, IconEdit, IconSend, IconTrash } from '@tabler/icons-react'
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
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import { ArticleComment } from '~/interfaces/comments'
import { Textarea } from '~/components/ui/textarea'
import parse from 'html-react-parser'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'

export default function CardArticle({
  idArticle,
  documentIdArticle,
  title,
  content,
  creator,
  cover,
  numComment,
  comment,
  setComment,
  submitDelete,
  editTrigger,
  listComment,
  submitComment,
  handleEdit,
  editCommentTrigger,
  isEditComment,
  setIsEditComment,
  handleDeleteComment,
}: {
  idArticle: number
  documentIdArticle: string
  title: string
  content: string
  creator: string
  cover: string | undefined
  numComment: number
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  submitDelete: (documentIdArticle: string) => void
  editTrigger: (documentIdArticle: string) => void
  editCommentTrigger: (documentIdArticle: string) => void
  listComment: ArticleComment[]
  submitComment: (
    e: React.FormEvent<HTMLFormElement>,
    idArticle: number
  ) => void
  handleEdit: (e: React.FormEvent<HTMLFormElement>) => void
  isEditComment: boolean
  setIsEditComment: React.Dispatch<React.SetStateAction<boolean>>
  handleDeleteComment: (documentId: string) => void
}) {
  const contentRef = useRef<HTMLParagraphElement>(null)
  const [isClamped, setClamped] = useState(false)
  const [isExpanded, setExpanded] = useState(false)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [deleteComment, setDeleteComment] = useState(false)
  const [deletedDocumentId, setDeletedDocumentId] = useState('')
  const [openComment, setOpenComment] = useState(false)

  useEffect(() => {
    const current = contentRef.current
    if (current) {
      const isOverflow = current.scrollHeight > current.clientHeight
      setClamped(isOverflow)
    }
  }, [content])

  return (
    <div className="flex flex-col h-content border border-gray-300 bg-[#F9FAFB] rounded-lg p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-end pb-2">
            <button className="bg-transparent hover:bg-transparent">
              <IconDots size={16} color="black" />
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2" align="end">
          <DropdownMenuItem onClick={() => editTrigger(documentIdArticle)}>
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
        <p
          ref={contentRef}
          className={`font-medium text-sm ${
            !isExpanded ? 'line-clamp-3' : 'line-clamp-none'
          }`}
        >
          {parse(content)}
        </p>
        {isClamped && (
          <div className="flex items-start">
            <button
              className="bg-transparent hover:bg-transparent"
              onClick={() => setExpanded(!isExpanded)}
            >
              <p className="text-black text-xs font-normal hover:underline">
                {isExpanded ? 'Show Less' : 'Show All'}
              </p>
            </button>
          </div>
        )}
      </div>
      <div className="flex pt-2 items-center justify-end">
        <button
          className="bg-transparent hover:bg-transparent"
          onClick={() => setOpenComment(!openComment)}
        >
          <p className="text-black text-xs font-normal hover:underline pb-2">
            {numComment === 0
              ? 'No Comment'
              : numComment === 1
              ? '1 comment'
              : `${numComment} comments`}
          </p>
        </button>
      </div>
      <Separator />
      {openComment && (
        <div className="flex flex-col items-start pt-2">
          <div className="relative w-full">
            {!isEditComment && (
              <form action="post" onSubmit={(e) => submitComment(e, idArticle)}>
                <div className="flex items-center w-full justify-between">
                  <Textarea
                    className="w-full rounded-lg p-2 pr-8 bg-transparent"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    type="submit"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                  >
                    <IconSend size={16} />
                  </Button>
                </div>
              </form>
            )}
          </div>
          {listComment?.map((item, index) => (
            <div key={index} className="flex flex-col w-full items-start pt-2">
              <div className="flex items-center w-full justify-between">
                <span className="text-xs font-semibold">
                  {item.user?.username}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-end pb-2">
                      <button className="bg-transparent hover:bg-transparent">
                        <IconDots size={16} color="black" />
                      </button>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2" align="end">
                    <DropdownMenuItem
                      onClick={() => editCommentTrigger(item.documentId)}
                    >
                      <div className="flex items-center gap-3">
                        <IconEdit />
                        <span className="text-sm">Edit</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setDeleteComment(true)
                        setDeletedDocumentId(item.documentId)
                      }}
                    >
                      <div className="flex items-center gap-2 cursor-pointer text-sm">
                        <IconTrash color="red" />
                        <p className="text-sm">Delete</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {isEditComment ? (
                <DialogEditComment
                  comment={comment}
                  setComment={setComment}
                  isOpen={isEditComment}
                  setIsOpen={setIsEditComment}
                  handleEdit={handleEdit}
                />
              ) : (
                <span className="text-sm font-normal">
                  {parse(item.content)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {deleteDialog && (
        <DialogDelete
          isOpen={deleteDialog}
          setIsOpen={setDeleteDialog}
          documentId={documentIdArticle}
          submitDelete={submitDelete}
        />
      )}
      {deleteComment && (
        <DialogDelete
          isOpen={deleteComment}
          setIsOpen={setDeleteComment}
          documentId={deletedDocumentId}
          submitDelete={handleDeleteComment}
        />
      )}
    </div>
  )
}

function DialogDelete({
  isOpen,
  submitDelete,
  setIsOpen,
  documentId,
}: {
  isOpen: boolean
  submitDelete: (documentId: string) => void
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  documentId: string
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-blue-900 text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => submitDelete(documentId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function DialogEditComment({
  comment,
  setComment,
  isOpen,
  setIsOpen,
  handleEdit,
}: {
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleEdit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false)
        setComment('')
      }}
    >
      <DialogContent>
        <DialogTitle>Edit Comment</DialogTitle>
        <form onSubmit={handleEdit}>
          <div className="flex flex-col gap-2 w-full">
            <Textarea
              className="w-full rounded-lg p-2 pr-8 bg-transparent"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex items-center gap-2 justify-end">
              <Button
                className="bg-red-500"
                onClick={() => {
                  setIsOpen(false)
                  setComment('')
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
