import { useRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { listArticleState, detailArticleState } from '~/states/article'
import api from '~/api/article'
import { BodyPostArticle, ParamsGetArticle } from '~/interfaces/article'
import { toast } from 'react-toastify'

export default function useArticleStore() {
  const [, setListArticleState] = useRecoilState(listArticleState)
  const [, setDetailArticleState] = useRecoilState(detailArticleState)

  const GetArticleList = useMutation({
    mutationFn: (params: ParamsGetArticle) => {
      return api.articleList(params)
    },
    onSuccess: async (res) => {
      setListArticleState(res.data.data)
    },
    onError: () => {
      toast.error('Failed To Retrieve Data From Server', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const GetDetailArticle = useMutation({
    mutationFn: (id: string) => {
      return api.detailArticle(id)
    },
    onSuccess: async (res) => {
      setDetailArticleState(res.data.data)
    },
    onError: () => {
      toast.error('Failed To Retrieve Detail Article From Server', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const DeleteArticle = useMutation({
    mutationFn: (id: string) => {
      return api.deleteArticle(id)
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

  const PostArticle = useMutation({
    mutationFn: (params: BodyPostArticle) => {
      return api.postArticle(params)
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

  const PutArticle = useMutation({
    mutationFn: ({ id, params }: { id: string; params: BodyPostArticle }) => {
      return api.putArticle(id, params)
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
    GetArticleList,
    GetDetailArticle,
    DeleteArticle,
    PostArticle,
    PutArticle,
  }
}
