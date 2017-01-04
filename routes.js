"use strict";

const config = require("./config.json");

const app = require("./server.js").app;
const passport = require("./server.js").passport;
const views = require("co-views");
const Router = require("koa-router");
const serve = require("koa-static");
const render = views("public", { map: { html: "swig" } });

const main = require("./server/controllers/main");

const routes = new Router();

app.use(serve("./public"));

// Routes for passport
routes.get("/auth/github",
	passport.authenticate("github")
);

routes.get("/auth/github/callback",
	passport.authenticate("github", {
		successRedirect: "/success",
		failureRedirect: "/auth"
	})
);

// api routes
routes.get("/auth", main.auth);
routes.get("/auth/verify", main.verify);
routes.get("/auth/signout", main.signout);
routes.get("/account", main.account);

// All pages route to index.html and react-router routes the pages from there
routes.get("*", function* all() {
	this.body = yield render("index");
});

app.use(routes.routes());
