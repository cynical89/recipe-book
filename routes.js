"use strict";

const config = require("./config.json");

const app = require("./server.js").app;
const views = require("co-views");
const Router = require("koa-router");
const render = views("public", { map: { html: "swig" } });

const main = require("./server/controllers/main");

const routes = new Router();

//consumable routes
routes.post("/login", main.login);
routes.post("/signup", main.signup);

// All pages route to index.html and react-router routes the pages from there
routes.get("*", function* all() {
	this.body = yield render("index");
});

app.use(routes.routes());
