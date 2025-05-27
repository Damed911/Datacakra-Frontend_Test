import { IconEdit, IconTrash } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Navbar from '~/components/layouts/navbar'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { listCategoryState } from '~/states/category'
import useCategoryStore from '~/stores/category-store'
import { MetaFunction } from '@remix-run/node'
import SettingsLoading from '~/components/pages/settings/card/settings-loading'
import DialogSettings from '~/components/pages/settings/ui/custom-dialog'
import { BodyPostCategory } from '~/interfaces/category'
import { category } from '~/schema/post.schema'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { toast } from 'react-toastify'

export const meta: MetaFunction = () => {
  return [
    { title: 'Settings' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  const [listCategory] = useRecoilState(listCategoryState)

  const [addDialog, setAddDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editedDocumentId, setEditedDocumentId] = useState('')

  const {
    GetCategoryList: {
      mutate: getCategoryListMutate,
      isPending: isPendingCategoryList,
    },
    GetDetailCategory: { mutate: getDetailCategoryMutate },
    PostCategory: { mutate: postCategoryMutate },
    DeleteCategory: { mutate: deleteCategoryMutate },
    PutCategory: { mutate: putCategoryMutate },
  } = useCategoryStore()

  const cancel = () => {
    setAddDialog(false)
    setEditDialog(false)
    setTitle('')
    setDescription('')
  }

  const submitDelete = (documentIdArticle: string) => {
    deleteCategoryMutate(documentIdArticle, {
      onSuccess: () => {
        getCategoryListMutate()
      },
    })
  }

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: BodyPostCategory = {
      data: {
        name: title,
        description: description,
      },
    }

    const result = category.safeParse(params.data)

    if (result.success) {
      postCategoryMutate(params, {
        onSuccess: () => {
          getCategoryListMutate()
          cancel()
        },
      })
    } else {
      result.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  const triggerEdit = (documentId: string) => {
    getDetailCategoryMutate(documentId, {
      onSuccess: async (res) => {
        setEditedDocumentId(documentId)
        setTitle(res.data.data.name)
        setDescription(res.data.data.description)
        setEditDialog(true)
      },
    })
  }

  const handleEditPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: BodyPostCategory = {
      data: {
        name: title,
        description: description,
      },
    }

    const result = category.safeParse(params.data)

    if (result.success) {
      putCategoryMutate(
        { id: editedDocumentId, params: params },
        {
          onSuccess: () => {
            getCategoryListMutate()
            cancel()
          },
        }
      )
    } else {
      result.error.issues.map((item) => {
        toast.error(item.message, { autoClose: 2500, theme: 'colored' })
      })
    }
  }

  useEffect(() => {
    getCategoryListMutate()
  }, [])

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 py-20 gap-4 max-w-[1080px] px-2 mx-auto">
        <div className="col-span-1">
          <div className="flex flex-col w-full border border-gray-300 bg-[#F9FAFB] left-0 top-20 z-[40] md:z-[50] gap-3 p-4 rounded-lg">
            <div className="bg-transparent no-border hover:bg-gray-300 text-black p-2">
              <span className="text-sm font-medium">Category</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          {isPendingCategoryList ? (
            <SettingsLoading />
          ) : (
            <div className="flex flex-col gap-3 border border-gray-300 bg-[#F9FAFB] p-4 rounded-lg">
              <div className="flex items-center justify-end">
                <Button onClick={() => setAddDialog(true)}>Add Category</Button>
                {addDialog && (
                  <DialogSettings
                    isDialog={addDialog}
                    headerTitle="Create Category"
                    title={title}
                    setTitle={setTitle}
                    content={description}
                    setContent={setDescription}
                    handleFunction={handleCreatePost}
                    cancelPost={cancel}
                  />
                )}
              </div>
              <div className="flex flex-col items-start p-2">
                {listCategory?.data?.map((item, index) => (
                  <div key={index} className="flex flex-col w-full gap-2 pt-2">
                    <div className="flex w-full items-start justify-between">
                      <div className="flex flex-col gap-2">
                        <h1 className="text-lg font-semibold">{item.name}</h1>
                        <span className="text-sm font-light">
                          {item.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <IconEdit
                          onClick={() => triggerEdit(item.documentId)}
                          className="cursor-pointer"
                        />
                        {editDialog && (
                          <DialogSettings
                            isDialog={editDialog}
                            headerTitle="Edit Category"
                            title={title}
                            setTitle={setTitle}
                            content={description}
                            setContent={setDescription}
                            handleFunction={handleEditPost}
                            cancelPost={cancel}
                          />
                        )}
                        <IconTrash
                          color="red"
                          onClick={() => setDeleteDialog(true)}
                          className="cursor-pointer"
                        />
                        {deleteDialog && (
                          <AlertDialog
                            open={deleteDialog}
                            onOpenChange={() => setDeleteDialog(false)}
                          >
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete {item.name}{' '}
                                  category?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-blue-900 text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500"
                                  onClick={() => submitDelete(item.documentId)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
