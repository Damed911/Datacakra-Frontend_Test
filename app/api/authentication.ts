import axios from '../lib/axios'

export default {
  login: async (params: { identifier: string; password: string }) => {
    return axios.post('/api/auth/local', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },
  register: async (params: {
    email: string
    username: string
    password: string
  }) => {
    return axios.post('/api/auth/local/register', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },
  getProfile: async () => {
    return axios.get('/api/users/me')
  },
}
