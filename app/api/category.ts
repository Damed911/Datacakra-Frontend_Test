import { BodyPostCategory } from '~/interfaces/category'
import axios from '../lib/axios'

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
  createCategory: async (params: BodyPostCategory) => {
    return axios.post('/api/categories', params)
  },
  editCategory: async (idCategory: string, params: BodyPostCategory) => {
    return axios.put(`/api/categories/${idCategory}`, params)
  },
}
