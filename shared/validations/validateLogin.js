import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

function validateLogin(data) {
  let errors = {}

  if(Validator.isEmpty(data.email)) {
    errors.email = 'This field may not be empty!'
  }
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Not a valid e-mail!'
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'This field may not be empty!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLogin
