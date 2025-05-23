import { BodyPostComment, ParamsGetComment } from '~/interfaces/comments'
import axios from '../lib/auth'

export default {
  listComment: async (params: ParamsGetComment) => {
    return axios.get('/api/comments', { params })
  },
  detailComment: async (idComment: string) => {
    return axios.get(`/api/comments/${idComment}`)
  },
  deleteComment: async (idComment: string) => {
    return axios.delete(`/api/comments/${idComment}`)
  },
  postComment: async (params: BodyPostComment) => {
    return axios.post('/api/comments', params)
  },
  putComment: async (idComment: string, params: BodyPostComment) => {
    return axios.put(`/api/comments/${idComment}`, params)
  },
}
