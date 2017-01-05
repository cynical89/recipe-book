"use strict";
const Chance = require("chance");
const chance = new Chance();

/**
* Recipe Model
* In charge of all things dealing with the recipes
*
*/

module.exports = {
	/**
	* newRecipe
	* Creates a new recipe and returns it
	*
	* @param {string} name - name of the recipe
	* @param {string} description - a quick summary of the recipe
	* @param {array} ingredients - a list of ingredients for the recipe
	* @param {string} directions - the directions to make the recipe
	* @param {boolean} isPublic - can the recipe be viewed by others?
	* @returns {object} recipe - the full recipe
	*/
	newRecipe: (name, description, author, ingredients, directions, isPublic) => {
		const recipe = {
			error: false,
			id: chance.guid(),
			name: name,
			description: description,
			author: author,
			isPublic: isPublic,
			ingredients: [],
			directions: directions
		};
		return recipe;
	},
	/**
	* editName
	* Modifies the name of the recipe and returns it
	*
	* @param {object} recipe - the recipe object to modify
	* @param {string} name - the name to modify the object with
	* @returns {object} recipe - the full recipe
	*/
	editName: (recipe, name) => {
		recipe.name = name;
		return recipe;
	},
	/**
	* editDescription
	* Modifies the description of the recipe and returns it
	*
	* @param {object} recipe - the recipe object to modify
	* @param {string} description - the description to modify the object with
	* @returns {object} recipe - the full recipe
	*/
	editDescription: (recipe, desc) => {
		recipe.description = desc;
		return recipe;
	},
	/**
	* editIngredients
	* Modifies the ingredients of the recipe and returns it
	*
	* @param {object} recipe - the recipe object to modify
	* @param {string} ingredients - the ingredients to modify the object with
	* @returns {object} recipe - the full recipe
	*/
	editIngredients: (recipe, ingredients) => {
		recipe.ingredients = ingredients;
		return recipe;
	},
	/**
	* editDirections
	* Modifies the directions of the recipe and returns it
	*
	* @param {object} recipe - the recipe object to modify
	* @param {string} directions - the directions to modify the object with
	* @returns {object} recipe - the full recipe
	*/
	editDirections: (recipe, directions) => {
		recipe.directions = directions;
		return recipe;
	},
	/**
	* editPrivacy
	* Modifies the privacy of the recipe and returns it
	*
	* @param {object} recipe - the recipe object to modify
	* @param {string} privacy - the privacy to modify the object with
	* @returns {object} recipe - the full recipe
	*/
	editPrivacy: (recipe, isPublic) => {
		recipe.isPublic = isPublic;
		return recipe;
	}
};
