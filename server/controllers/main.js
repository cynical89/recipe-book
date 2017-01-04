"use strict";

const config = require("./config.json")
const common = require("../server/helpers/common");

module.exports.login = function* login() {
	const params = this.request.body;
	if(!params.username || !params.password || !params.firstName || !params.lastName || !params.email) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	const user = yield db.getUser(params.username, "users");
	if(user.error === true) {
		this.status = 400;
		return user.message;
	}
	//TODO: check for passwords matching
	const token = yield common.signToken(user);
	return this.body = token;
};
