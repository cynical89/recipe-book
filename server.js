"use strict";

// configuration file
const config = require("./config.json");

// koa files
const koa = require("koa");
const serve = require("koa-static");

// passport support
const session = require("koa-generic-session");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");

const app = koa();

exports.app = app;
exports.passport = passport;

// our model for passport.js
require("./server/models/passport.js");

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.site.secret];
app.use(session());

// body parser
app.use(bodyParser());

// passport
app.use(passport.initialize());
app.use(passport.session());

// static file serve
app.use(serve("./public"));

// error handling
app.use(function* error(next) {
	try {
		yield next;
	} catch (err) {
		this.status = err.status || 500;
		this.body = err.message;
		this.app.emit("error", err, this);
	}
});

// routes are handled in a separate file
require("./routes");

// Listen on the port in our config
console.log(`${config.site.name} is now listening on port ${config.site.port}`);
app.listen(config.site.port);

process.on("SIGINT", function exit() {
	process.exit();
});
