"use strict";

// configuration file
const config = require("./config.json");

// koa files
const koa = require("koa");
const serve = require("koa-static");
const jwt = require("koa-jwt");
const bodyParser = require("koa-bodyparser");

const main = require("./server/controllers/main");

const app = koa();

// JSON Web Tokens
app.use(function* catchErrors(next) {
  try {
    yield next;
  } catch(e) {
    if (e.status == 401 ) {
      this.status = e.status;
      this.body = 'You don\'t have a signed token dude :('
    } else {
      throw e;
    }
  }
});

app.use(jwt({
  secret: config.site.secret,
  algorithm: 'RS256'
}).unless({ path: [/^\/public/, /^\/assets/, /^\/signup/, /^\/login/, /^\/dashboard/, "/"] }));

exports.app = app;

// trust proxy
app.proxy = true;

// body parser
app.use(bodyParser());

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
