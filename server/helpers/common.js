"use strict";

module.exports.signToken = function* signToken(user) {
  const token = jwt.sign({ user }, config.site.secret, { expiresIn: 60 * 60 });
  return {token: token};
};
