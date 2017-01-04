import axios from 'axios'

export function login(data) {
  return axios.post('/login', data)
}

export function signup(data) {
  return axios.post('/signup', data)
}
