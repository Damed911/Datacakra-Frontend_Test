import axios from '../lib/auth'

export default {
  login: async (params: FormData) => {
    return axios.post('/api/auth/local', params)
  },
  register: async (params: FormData) => {
    return axios.post('/api/auth/local', params)
  },
  getProfile: async () => {
    return axios.get('/api/users/me')
  },
}
