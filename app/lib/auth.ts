import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.API_BASE_URL as string,
})

instance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    return {
      ...config,
      headers: {
        ...config.headers,
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
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance
