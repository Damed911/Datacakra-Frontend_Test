import axios, { AxiosResponse } from 'axios'
import { getToken } from '~/helper/credentials'

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

instance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    let auth = ''
    const accessToken = await getToken()

    if (accessToken) {
      auth = `Bearer ${accessToken}`
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        ...(auth ? { Authorization: auth } : {}),
        Accept: 'application/json',
      },
    }
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const { response } = error
    if (
      response &&
      (response.data.message === 'Invalid credentials' ||
        response.status === 401)
    ) {
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default instance
