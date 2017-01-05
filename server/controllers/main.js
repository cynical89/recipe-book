"use strict";

const config = require("../../config.json");
const common = require("../helpers/common");
const db = require("../helpers/db");
const recipeModel = require("../models/recipe");
const userModel = require("../models/users");

let user;

/**
* POST '/recipes/new'
* @param {string} name - name of the recipe
* @param {string} description - a quick summary of the recipe
* @param {array} ingredients - a list of ingredients for the recipe
* @param {string} directions - the directions to make the recipe
* @param {boolean} isPublic - can the recipe be viewed by others?
* @returns {object} recipe - the full recipe
*/
module.exports.make = function* make() {
	const params = this.request.body;
	if (!params.name || !params.description || !params.ingredients
			|| !params.directions || !params.isPublic) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	let recipe = recipeModel.newRecipe(params.name, params.description, user._id,
		params.ingredients, params.directions, params.isPublic);
	recipe = yield db.saveDocument(recipe, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	user = yield db.getDocument(user._id, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	user = userModel.addRecipe(user, recipe);
	user = yield db.saveDocument(user, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	return this.body = recipe;
};

/**
* POST '/recipes/edit'
* @param {string} id - id of the recipe to be edited
* @param {string} name (optional) - edited name of recipe
* @param {string} description (optional) - edited summary of the recipe
* @param {array} ingredients (optional) - edited list of ingredients for the recipe
* @param {string} directions (optional) - edited directions to make the recipe
* @param {boolean} isPublic (optional) - edited privacy of the recipe
* @returns {object} recipe - the full recipe
*/
module.exports.edit = function* edit() {
	const params = this.request.body;
	if (!params.id) {
		this.status = 400;
		return this.body = "Invalid request";
	}
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	let recipe = yield db.getDocument(params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	if (recipe.author !== user._id) {
		this.status = 401;
		return this.body = "Only the author can modify the recipe";
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
	if (params.isPublic !== undefined) {
		recipe = recipeModel.editPrivacy(recipe, params.isPublic);
	}
	recipe = yield db.saveDocument(recipe, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	return this.body = recipe;
};

/**
* POST '/recipes/delete'
* @param {string} id - id of the recipe to remove from the system
* @returns {object} results - the results for the action
*/
module.exports.remove = function* remove() {
	const params = this.request.body;
	if (!params.id) {
		this.status = 400;
		return this.body = "Invlaid Request";
	}
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	let recipe = yield db.getDocument(params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	if (recipe.author !== user._id) {
		this.status = 401;
		return this.body = "Only the author can remove this recipe";
	}
	recipe = yield db.removeDocument(params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	user = yield db.getDocument(user._id, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	user = userModel.deleteRecipe(user, recipe);
	user = yield db.saveDocument(user, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	return this.body = recipe;
};

/**
* POST '/recipes/:id'
* @param {string} id - id of the recipe to view
* @returns {object} recipe - the results object for the action
*/
module.exports.recipe = function* recipe() {
	if (!this.params.id) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	const recipe = yield db.getDocument(this.params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	if (recipe.isPublic === false && recipe.author !== user._id) {
		this.status = 404;
		return this.body = "We cannot find this recipe in our system";
	}
	return this.body = recipe;
};
/**
* POST '/recipes/all'
* @returns {array} recipes - an array of all recipe objects
*/
module.exports.all = function* all() {
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	const recipes = yield db.getAllRecipes();
	if (recipes.error === true) {
		this.status = 400;
		return this.body = recipes.message;
	}
	for (const recipe of recipes) {
		if (recipe.isPublic === false && recipe.author !== user._id) {
			const index = recipes.indexOf(recipe);
			recipes.splice(index, 1);
		}
	}
	return this.body = recipes;
};

/**
* POST '/recipes/collection'
* @returns {array} recipes - an array of all recipes that are saved/authored by the user
*/
module.exports.collection = function* collection() {
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	user = yield db.getDocument(user._id, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	const collection = [];
	for (const recipe of user.recipes) {
		const doc = yield db.getDocument(recipe, "recipes");
		collection.push(doc);
	}
	return this.body = collection;
};

/**
* POST '/recipes/remember'
* @param {string} id - id of the recipe to save for the user
* @returns {object} user - the updated user object
*/
module.exports.remember = function* remember() {
	const params = this.request.body;
	if (!params.id) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	const recipe = yield db.getDocument(params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	if (recipe.isPublic === false && recipe.author !== user._id) {
		this.status = 404;
		return this.body = "We cannot find this recipe in our system";
	}
	user = yield db.getDocument(user._id, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	user = userModel.addRecipe(user, recipe);
	user = yield db.saveDocument(user, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	return this.body = user;
};

/**
* POST '/recipes/forget'
* @param {string} id - id of the recipe to remove from the user
* @returns {object} user - the updated user object
*/
module.exports.forget = function* forget() {
	const params = this.request.body;
	if (!params.id) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	const recipe = yield db.getDocument(params.id, "recipes");
	if (recipe.error === true) {
		this.status = 400;
		return this.body = recipe.message;
	}
	if (recipe.isPublic === false && recipe.author !== user._id) {
		this.status = 404;
		return this.body = "We cannot find this recipe in our system";
	}
	user = yield db.getDocument(user._id, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	user = userModel.deleteRecipe(user, recipe);
	user = yield db.saveDocument(user, "users");
	if (user.error === true) {
		this.status = 400;
		return this.body = user.message;
	}
	return this.body = user;
};

/**
* POST '/recipes/search'
* @param {string} searchString - a string to compare recipe names with
* @returns {array} recipes - an array of recipe objects whose name contain our seach string
*/
module.exports.search = function* search() {
	const params = this.request.body;
	const results = [];
	if (!params.searchString) {
		this.status = 400;
		return this.body = "Invalid request.";
	}
	user = this.state.user.user;
	if (!user) {
		this.status = 401;
		return this.body = "Unauthorized request";
	}
	const recipes = yield db.getAllRecipes();
	if (recipes.error === true) {
		this.status = 400;
		return this.body = recipes.message;
	}
	for (const recipe of recipes) {
		console.log(recipe.value);
		if ((recipe.value.isPublic === true || recipe.value.author === user._id)
			&& recipe.value.name.includes(params.searchString)) {
			results.push(recipe);
		}
	}
	return this.body = results;
};
