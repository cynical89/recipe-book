import { takeLatest } from 'redux-saga/effects'
import * as types from '../../actions/auth/authTypes'
import { asyncLogin } from './worker'

export function* watchLogin() {
  console.log('watchLogin saga running')
  yield takeLatest(types.AUTH_LOGIN, asyncLogin)
}

export default function* rootWatcher() {
  yield [
    watchLogin()
  ]
}
