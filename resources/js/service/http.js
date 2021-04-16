import axios from 'axios'

const options = {
  baseURL: 'http://localhost'
}

const http = axios.create(options)

export default http
