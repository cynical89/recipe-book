function requireAuth(nextState, replace) {
  if (!localStorage.getItem('userToken')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default requireAuth
