import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import React from 'react'
import { ListCategory } from '~/interfaces/category'

export default function DialogCreateEdit({
  headerTitle,
  isDialog,
  cancelPost,
  handleFunction,
  title,
  setTitle,
  content,
  setContent,
  cover,
  setCover,
  categories,
  setCategories,
  categoryList,
}: {
  headerTitle: string
  isDialog: boolean
  cancelPost: () => void
  handleFunction: (e: React.FormEvent<HTMLFormElement>) => void
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  cover: string
  setCover: React.Dispatch<React.SetStateAction<string>>
  categories: string
  setCategories: React.Dispatch<React.SetStateAction<string>>
  categoryList: ListCategory
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
            <div className="flex flex-col gap-3 items-start">
              <label htmlFor="cover">Cover Image</label>
              {cover && <img src={cover} alt="" />}
              <Input
                type="file"
                id="cover"
                onChange={(e) =>
                  setCover(URL.createObjectURL(e.target.files[0]))
                }
              />
            </div>
            {headerTitle === 'Create Article' && (
              <div className="flex flex-col gap-3 items-start">
                <label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full border border-gray-300 rounded-lg">
                    {categories
                      ? categoryList?.data?.flatMap((item) =>
                          item.id === Number(categories) ? item.name : ''
                        )
                      : 'Select Category'}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={categories}
                      onValueChange={(value) => setCategories(value)}
                    >
                      {categoryList?.data?.map((item, index) => (
                        <DropdownMenuRadioItem
                          key={index}
                          value={item.id.toString()}
                        >
                          {item.name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
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
