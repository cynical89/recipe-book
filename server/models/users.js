"use strict";

module.exports = {
  newUser: (username, password, email, firstName, lastName) => {
  const user = {
    error: false,
    id: username,
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName
  };
  return user;
}
}
