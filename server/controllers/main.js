"use strict";

const config = require("../../config.json");
const common = require("../helpers/common");
const db = require("../helpers/db");
const recipeModel = require("../models/recipe");
const userModel = require("../models/users");

module.exports.make = function* make() {
	const params = this.request.body;
	if (!params.name || !params.description || !params.author || !params.ingredients
			|| !params.directions || !params.isPublic) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	let recipe = recipeModel.newRecipe(params.name, params.description, params.author,
		params.ingredients, params.directions, params.isPublic);
	recipe = yield db.saveDocument(recipe, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	// Get user from JWT
	// let user = yield db.getDocument("", "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	// user = userModel.addRecipe(user, recipe);
	// user = yield db.saveDocument(user, "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	return this.body = recipe;
};

module.exports.edit = function* edit() {
	const params = this.request.body;
	if (!params.id) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	let recipe = yield db.getDocument(params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	if (params.name) {
		recipe = recipeModel.editName(recipe, params.name);
	}
	if (params.description) {
		recipe = recipeModel.editDescription(recipe, params.description);
	}
	if (params.ingredients) {
		recipe = recipeModel.editIngredients(recipe, params.ingredients);
	}
	if (params.directions) {
		recipe = recipeModel.editDirections(recipe, params.directions);
	}
	if (params.isPublic) {
		recipe = recipeModel.editPrivacy(recipe, params.isPublic);
	}
	recipe = yield db.saveDocument(recipe, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	return this.body = recipe;
};

module.exports.remove = function* remove() {
	if (!this.params.id) {
		this.status = 400;
		return this.body = "Invlaid Request";
	}
	const recipe = yield db.removeDocument(params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	// Get user from JWT
	// let user = yield db.getDocument("", "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	// user = userModel.deleteRecipe(user, recipe);
	// user = yield db.saveDocument(user, "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	return this.body = recipe;
};
module.exports.recipe = function* recipe() {
	if (!this.params.id) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	const recipe = db.getDocument(this.params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	return this.body = recipe;
};
module.exports.all = function* all() {
	const recipes = yield db.getAllRecipes();
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	return this.body = recipes;
};
module.exports.collection = function* collection() {
	let collection;
	const recipes = yield db.getAllRecipes();
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	for (const recipe of recipes) {
		// need to get user from JWT to use here
		if (recipe.author = "") {
			collection.push(recipe);
		}
	}
	return this.body = collection;
};
module.exports.remember = function* remember() {
	if (!this.params.id) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	const recipe = yield db.getDocument(this.params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	// Get user from JWT
	// let user = yield db.getDocument("", "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	// user = userModel.addRecipe(user, recipe);
	// user = yield db.saveDocument(user, "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	return this.body = recipe;
};
module.exports.forget = function* forget() {
	if (!this.params.id) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	const recipe = yield db.getDocument(this.params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	// Get user from JWT
	// let user = yield db.getDocument("", "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	// user = userModel.deleteRecipe(user, recipe);
	// user = yield db.saveDocument(user, "users");
	// if (user.error === true) {
	// 	this.status = 400;
	// 	return this.body = user.message;
	// }
	return this.body = recipe;
};
module.exports.search = function* search() {
	const params = this.request.body;
	let results;
	if (!params.searchString) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	const recipes = yield db.getAllRecipes();
	if (recipes.error === true) {
		this.status = 400;
		return this.body = recipes.message;
	}
	for (const recipe in recipes) {
		if (recipe.name.indexOf(params.searchString) > -1) {
			results.push(recipe);
		}
	}
	return this.body = results;
};
