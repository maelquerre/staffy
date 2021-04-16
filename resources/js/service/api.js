import axios from 'axios'

const options = {
  baseURL: '/api',
}

const api = axios.create(options)

export default api
