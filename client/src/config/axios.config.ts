import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export const updateAxiosHeaders = () => {
  const token = localStorage.getItem('token')

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
