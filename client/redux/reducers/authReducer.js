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
      console.log(action)
      return state
    case types.LOGIN_FAILURE:
      console.log(action.error, 'error')
      return state
    default: return state
  }
}
