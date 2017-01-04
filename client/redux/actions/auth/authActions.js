import * as types from './authTypes'

export const login = (user) => {
  return {
    type: types.AUTH_LOGIN,
    user
  }
}

export const signup = (data) => {
  return {
    type: types.AUTH_SIGNUP,
    data
  }
}
