import * as types from '../actions/auth/authTypes'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: {
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  },
  authToken: ''
}

export default function auth(state = initialState, action = {}) {
  switch(action.type) {
    case types.LOGIN_SUCCESS:
      const decoded = jwtDecode(action.response.token)
      localStorage.setItem('userToken', action.response.token)
      return {
        user: {
          username: decoded.user.username,
          firstName: decoded.user.firstName,
          lastName: decoded.user.lastName,
          email: decoded.user.email
        },
        authToken: action.response.token
      }
    case types.LOGIN_FAILURE:
      console.log(action.error, 'error')
      return state
    case types.AUTH_LOGOUT:
      localStorage.removeItem('userToken')
      return state = initialState
    case types.AUTH_TOKEN:
      const decodedToken = jwtDecode(localStorage.getItem('userToken'))
      return {
        user: {
          username: decodedToken.user.username,
          firstName: decodedToken.user.firstName,
          lastName: decodedToken.user.lastName,
          email: decodedToken.user.email
        },
        authToken: localStorage.getItem('userToken')
      }
    default: return state
  }
}
