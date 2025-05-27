import { useRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { listCommentState } from '~/states/comments'
import api from '~/api/comments'
import { BodyPostComment, ParamsGetComment } from '~/interfaces/comments'
import { toast } from 'react-toastify'

export default function useCommentStore() {
  const [, setListCommentState] = useRecoilState(listCommentState)

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
    onError: () => {
      toast.error('Failed To Retrieve Detail Comment From Server', {
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
      toast.success('Comment Succesfully Deleted', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () =>
      toast.error('Failed To Delete Comment', {
        autoClose: 3000,
        theme: 'colored',
      }),
  })

  const PostComment = useMutation({
    mutationFn: (params: BodyPostComment) => {
      return api.postComment(params)
    },
    onSuccess: async () => {
      toast.success('Comment Successfully Created', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () => {
      toast.error('Failed To Create Comment', {
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
      toast.success('Comment Successfully Edited', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () => {
      toast.error('Failed To Edit Comment', {
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
