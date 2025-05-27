import { useRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { listCategoryState } from '~/states/category'
import api from '~/api/category'
import { BodyPostCategory } from '~/interfaces/category'
import { toast } from 'react-toastify'

export default function useCategoryStore() {
  const [, setListCategoryState] = useRecoilState(listCategoryState)

  const GetCategoryList = useMutation({
    mutationFn: () => {
      return api.listCategory()
    },
    onSuccess: async (res) => {
      setListCategoryState(res.data)
    },
    onError: () => {
      toast.error('Failed To Retrieve Data From Server', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const GetDetailCategory = useMutation({
    mutationFn: (id: string) => {
      return api.detailCategory(id)
    },
    onError: () => {
      toast.error('Failed To Retrieve Detail Category From Server', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const DeleteCategory = useMutation({
    mutationFn: (id: string) => {
      return api.deleteCategory(id)
    },
    onSuccess: async () => {
      toast.success('Category Succesfully Deleted', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () =>
      toast.error('Failed To Delete Category', {
        autoClose: 3000,
        theme: 'colored',
      }),
  })

  const PostCategory = useMutation({
    mutationFn: (params: BodyPostCategory) => {
      return api.createCategory(params)
    },
    onSuccess: async () => {
      toast.success('Category Successfully Created', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () => {
      toast.error('Failed To Create Category', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const PutCategory = useMutation({
    mutationFn: ({ id, params }: { id: string; params: BodyPostCategory }) => {
      return api.editCategory(id, params)
    },
    onSuccess: async () => {
      toast.success('Category Successfully Edited', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () => {
      toast.error('Failed To Edit Category', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  return {
    GetCategoryList,
    GetDetailCategory,
    DeleteCategory,
    PostCategory,
    PutCategory,
  }
}
