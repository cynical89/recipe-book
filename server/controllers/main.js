"use strict";
const views = require("co-views");
const render = views("public", { map: { html: "swig" } });
let user = null;

module.exports.verify = function verify() {
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
		return this.body = user;
	}
	return this.body = null;
};

module.exports.signout = function signout() {
	if (this.isAuthenticated()) {
		this.logout();
		return this.redirect("/");
	}
	return this.redirect("/error");
};


module.exports.account = function* account() {
	if (this.isAuthenticated()) {
		return this.body = yield render("index");
	}
	return this.redirect("/auth");
};

module.exports.auth = function* auth() {
	if (this.isAuthenticated()) {
		return this.redirect("/account");
	}
	return this.body = yield render("index");
};
