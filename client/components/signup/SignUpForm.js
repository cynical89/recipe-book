import React from 'react'
import InputField from '../common/InputField'
import validateSignUp from '../../../shared/validations/validateSignUp'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid = () => {
    const { errors, isValid } = validateSignUp(this.state)

    if(!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ errors: {} })
    if(this.isValid()) {
      console.log(this.state)
    }
  }

  render() {
    const { errors } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join Now!</h1>

        <InputField
          label='Username'
          value={this.state.username}
          field='username'
          onChange={this.onChange}
          error={errors.username}
        />

        <InputField
          label='First Name'
          value={this.state.firstName}
          field='firstName'
          onChange={this.onChange}
          error={errors.firstName}
        />

        <InputField
          label='Last Name'
          value={this.state.lastName}
          field='lastName'
          onChange={this.onChange}
          error={errors.lastName}
        />

        <InputField
          label='E-Mail'
          value={this.state.email}
          field='email'
          onChange={this.onChange}
          error={errors.email}
        />

        <InputField
          label='Password'
          type='password'
          value={this.state.password}
          field='password'
          onChange={this.onChange}
          error={errors.password}
        />

        <InputField
          label='Confirm Password'
          type='password'
          value={this.state.passwordConfirm}
          field='passwordConfirm'
          onChange={this.onChange}
          error={errors.passwordConfirm}
        />

        <button type='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    )
  }
}

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignUpForm
