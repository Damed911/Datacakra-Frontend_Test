import { BodyCategory } from '~/interfaces/category'
import axios from '../lib/auth'

export default {
  listCategory: async () => {
    return axios.get('/api/categories')
  },
  detailCategory: async (idCategory: string) => {
    return axios.get(`/api/categories/${idCategory}`)
  },
  deleteCategory: async (idCategory: string) => {
    return axios.delete(`/api/categories/${idCategory}`)
  },
  createCategory: async (params: BodyCategory) => {
    return axios.post('/api/categories', params)
  },
  editCategory: async (idCategory: string, params: BodyCategory) => {
    return axios.put(`/api/categories/${idCategory}`, params)
  },
}
