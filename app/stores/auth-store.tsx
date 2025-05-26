import { useMutation } from '@tanstack/react-query'
import api from '~/api/authentication'
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'

export default function useCredentials() {
  const login = useMutation({
    mutationFn: (params: { identifier: string; password: string }) => {
      return api.login(params)
    },
    onSuccess: async (res) => {
      const accessToken = CryptoJS.AES.encrypt(
        res.data.jwt,
        'accessToken'
      ).toString()
      const email = CryptoJS.AES.encrypt(
        res.data.user.email,
        'userEmail'
      ).toString()
      const username = CryptoJS.AES.encrypt(
        res.data.user.username,
        'username'
      ).toString()

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('username', username)

      window.location.href = '/feed'
    },
    onError: (err) => {
      console.log(err)
      toast.error('Email or password not matched', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  const register = useMutation({
    mutationFn: (params: {
      email: string
      username: string
      password: string
    }) => {
      return api.register(params)
    },
    onSuccess: async () => {
      toast.success('Account succesfully registered', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
    onError: () => {
      toast.error('Failed to create account', {
        autoClose: 3000,
        theme: 'colored',
      })
    },
  })

  return { login, register }
}
