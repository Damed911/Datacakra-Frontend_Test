import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import React from 'react'

export default function DialogSettings({
  headerTitle,
  isDialog,
  cancelPost,
  handleFunction,
  title,
  setTitle,
  content,
  setContent,
}: {
  headerTitle: string
  isDialog: boolean
  cancelPost: () => void
  handleFunction: (e: React.FormEvent<HTMLFormElement>) => void
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <Dialog open={isDialog} onOpenChange={cancelPost}>
      <DialogContent>
        <DialogTitle className="font-semibold text-lg">
          {headerTitle}
        </DialogTitle>
        <form onSubmit={handleFunction} action="post">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 items-start">
              <label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                className="p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
            </div>
            <div className="flex flex-col gap-3 items-start">
              <label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your content"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button onClick={cancelPost} className="bg-red-900">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-900">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
