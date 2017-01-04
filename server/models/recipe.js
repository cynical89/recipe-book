"use strict";

module.exports = {
	newRecipe: (name, description, author, ingredients = [], directions = "", isPublic = true) => {
		const recipe = {
			error: false,
			name: name,
			description: description,
			author: author,
			isPublic: isPublic,
			ingredients: [],
			directions: directions
		};
		return recipe;
	},
	editIngredients: (recipe, ingredients) => {
		recipe.ingredients = ingredients;
		return recipe;
	},
	editDirections: (recipe, directions) => {
		recipe.directions = directions;
		return recipe;
	},
	editPrivacy: (recipe, isPublic) => {
		recipe.isPublic = isPublic;
		return recipe;
	}
};
