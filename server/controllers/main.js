"use strict";

const config = require("../../config.json")
const common = require("../helpers/common");
const userModel = require("../models/users");

module.exports.login = function* login() {
	const params = this.request.body;
	if(!params.username || !params.password) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	const user = yield db.getDocument(params.username, "users");
	if(user.error === true) {
		this.status = 400;
		return user.message;
	}
	if(common.comparePassword(params.password, user)) {
		const token = yield common.signToken(user);
		return this.body = token;
	}
	this.status = 400;
	return this.body("No such username/password combination.");
};

module.exports.signup = function* signup() {
	if(!params.username || !params.password || !params.firstName || !params.lastName || !params.email) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	const password = common.encryptPassword(params.password);
	let user = userModel.netUser(params.username, params.password, params.email, params.firstName, params.lastName)
	user = db.saveDocument(user, "users");
	if(user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	return this.body = user;
}
