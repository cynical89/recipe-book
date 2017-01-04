"use strict";

const config = require("../../config.json");
const bcrypt = require("bcrypt");
const jwt = require("koa-jwt");

module.exports.signToken = function* signToken(user) {
  const token = jwt.sign({ user }, config.site.secret, { expiresIn: 60 * 60 });
  return {token: token};
};

module.exports.encryptPassword = function encryptPassword(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

module.exports.comparePassword = function comparePassword(password, doc) {
	return bcrypt.compareSync(password, doc.password);
};
