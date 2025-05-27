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
      toast.error('Failed To Retrieve Detail Article From Server', {
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
      toast.success('Article Succesfully Deleted', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () =>
      toast.error('Failed To Delete Article', {
        autoClose: 3000,
        theme: 'colored',
      }),
  })

  const PostCategory = useMutation({
    mutationFn: (params: BodyPostCategory) => {
      return api.createCategory(params)
    },
    onSuccess: async () => {
      toast.success('Article Successfully Created', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () => {
      toast.error('Failed To Create Article', {
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
      toast.success('Article Successfully Edited', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () => {
      toast.error('Failed To Edit Article', {
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
