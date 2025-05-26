import { BodyPostArticle, ParamsGetArticle } from '~/interfaces/article'
import axios from '~/lib/axios'

export default {
  articleList: async (params: ParamsGetArticle) => {
    return axios.get('/api/articles', { params })
  },
  detailArticle: async (articleID: string) => {
    return axios.get(`/api/articles/${articleID}`)
  },
  deleteArticle: async (articleID: string) => {
    return axios.delete(`/api/articles/${articleID}`)
  },
  postArticle: async (params: BodyPostArticle) => {
    return axios.post('/api/articles', params)
  },
  putArticle: async (articleId: string, params: BodyPostArticle) => {
    return axios.put(`/api/articles/${articleId}`, params)
  },
}
