import React from 'react'
import InputField from '../common/InputField'
import validateLogin from '../../../shared/validations/validateLogin'
import { login } from '../../utils/api'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid = () => {
    const { errors, isValid } = validateLogin(this.state)

    if(!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ errors: {} })
    if(this.isValid()) {
      login(this.state).then(res => {
        localStorage.setItem('userToken', res.data.token)
        this.context.router.push('/')
      }).catch(err => {
        console.log(err)
        this.context.router.push('/')
      })
    }
  }

  render() {
    const { errors } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Log In!</h1>

        <InputField
          label='Username'
          value={this.state.username}
          field='username'
          onChange={this.onChange}
          error={errors.username}
        />

        <InputField
          label='Password'
          type='password'
          value={this.state.password}
          field='password'
          onChange={this.onChange}
          error={errors.password}
        />

        <button type='submit' className='btn btn-primary'>Log In</button>
      </form>
    )
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default LoginForm
