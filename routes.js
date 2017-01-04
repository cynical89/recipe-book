"use strict";

const config = require("./config.json");

const app = require("./server.js").app;
const views = require("co-views");
const Router = require("koa-router");
const render = views("public", { map: { html: "swig" } });

const main = require("./server/controllers/main");
const auth = require("./server/controllers/auth");

const routes = new Router();

// consumable routes
routes.post("/login", auth.login);
routes.post("/signup", auth.signup);

routes.post("/recipes/new", main.make);
routes.post("/recipes/edit", main.edit);
routes.post("/recipes/delete", main.remove);
routes.post("/recipes/:id", main.recipe);
routes.post("/recipes/all", main.all);
routes.post("/recipes/collection", main.collection);
routes.post("/recipes/remember", main.remember);
routes.post("/recipes/forget", main.forget);
routes.post("/recipes/search", main.search);

// All pages route to index.html and react-router routes the pages from there
routes.get("*", function* all() {
	this.body = yield render("index");
});

app.use(routes.routes());
