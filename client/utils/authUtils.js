import jwtDecode from 'jwt-decode'

export function requireAuth(nextState, replace) {
  const token = localStorage.getItem('userToken')
  if (!checkWebToken(token)) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function checkWebToken(token) {
  if(!token) {
    return false
  }

  try {
    const decoded = jwtDecode(token)
    if(decoded.user.username && decoded.user.firstName && decoded.user.lastName && decoded.user.email) {
      return true
    }
  } catch (err) {
    return false
  }
}
