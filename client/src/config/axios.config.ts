import axios from 'axios'

const token = localStorage.getItem('token')

const headers = token ? { Authorization: `Bearer ${token}` } : {}

const instance = axios.create({ headers })

export default instance
