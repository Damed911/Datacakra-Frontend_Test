import CryptoJS from 'crypto-js'

export const getToken = async () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem('accessToken')
    if (!data) {
      return ''
    }

    try {
      const decryptedData = CryptoJS.AES.decrypt(data, 'accessToken').toString(
        CryptoJS.enc.Utf8
      )
      return decryptedData
    } catch (error) {
      console.error('Error parsing JSON data from localStorage:', error)
      throw new Error('Error parsing JSON data from localStorage')
    }
  } else {
    return ''
  }
}

export const getUsername = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem('username')
    if (!data) {
      return ''
    }

    try {
      const decryptedData = CryptoJS.AES.decrypt(data, 'username').toString(
        CryptoJS.enc.Utf8
      )
      return decryptedData
    } catch (error) {
      console.error('Error parsing JSON data from localStorage:', error)
      throw new Error('Error parsing JSON data from localStorage')
    }
  } else {
    return ''
  }
}
