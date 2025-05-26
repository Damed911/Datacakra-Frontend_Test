import { useRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { listCommentState, detailCommentState } from '~/states/comments'
import api from '~/api/comments'
import { BodyPostComment, ParamsGetComment } from '~/interfaces/comments'
import { toast } from 'react-toastify'

export default function useCommentStore() {
  const [, setListCommentState] = useRecoilState(listCommentState)
  const [, setDetailCommentState] = useRecoilState(detailCommentState)

  const GetCommentList = useMutation({
    mutationFn: (params: ParamsGetComment) => {
      return api.listComment(params)
    },
    onSuccess: async (res) => {
      setListCommentState(res.data.data)
    },
    onError: () => {
      toast.error('Failed To Retrieve Data From Server', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const GetDetailComment = useMutation({
    mutationFn: (id: string) => {
      return api.detailComment(id)
    },
    onSuccess: async (res) => {
      setDetailCommentState(res.data.data)
    },
    onError: () => {
      toast.error('Failed To Retrieve Detail Article From Server', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const DeleteComment = useMutation({
    mutationFn: (id: string) => {
      return api.deleteComment(id)
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

  const PostComment = useMutation({
    mutationFn: (params: BodyPostComment) => {
      return api.postComment(params)
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

  const PutComment = useMutation({
    mutationFn: ({ id, params }: { id: string; params: BodyPostComment }) => {
      return api.putComment(id, params)
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
    GetCommentList,
    GetDetailComment,
    DeleteComment,
    PostComment,
    PutComment,
  }
}
