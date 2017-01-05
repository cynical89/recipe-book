"use strict";

const config = require("../../config.json");
const common = require("../helpers/common");
const userModel = require("../models/users");
const db = require("../helpers/db");

/**
* POST '/login'
* @param {string} username - username for the person loggin in
* @param {string} password - password for the user logging in
* @returns {token} JSON Web Token - an authorization token for the user
*/
module.exports.login = function* login() {
	const params = this.request.body;
	if (!params.username || !params.password) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	const user = yield db.getDocument(params.username, "users");
	if (user.error === true) {
		this.status = 400;
		return user.message;
	}
	if (common.comparePassword(params.password, user)) {
		const token = yield common.signToken(user);
		return this.body = token;
	}
	this.status = 400;
	return this.body = "No such username/password combination.";
};

/**
* POST '/signup'
* @param {string} username - username for the new user
* @param {string} password - password for the new user
* @param {string} email - email address of the new user
* @param {string} firstName - first name of the new user
* @param {string} lastName - last name of the new user
* @returns {object} user - the full user that was created
*/
module.exports.signup = function* signup() {
	const params = this.request.body;
	if (!params.username || !params.password || !params.firstName || !params.lastName || !params.email) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	let user = yield db.getDocument(params.username, "users");
	if (user.error === false) {
		this.status = 400;
		return this.body = "A user with this username already exists";
	}
	const password = common.encryptPassword(params.password);
	user = userModel.newUser(params.username, password, params.email, params.firstName, params.lastName);
	user = yield db.saveDocument(user, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	return this.body = user;
};
