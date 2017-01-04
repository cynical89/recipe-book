"use strict";

module.exports = {
	newUser: (username, password, email, firstName, lastName) => {
		const user = {
			error: false,
			id: username,
			username: username,
			password: password,
			email: email,
			firstName: firstName,
			lastName: lastName,
			recipes: []
		};
		return user;
	},
	addRecipe: (user, recipe) => {
		user.recipes.push(recipe.id);
		return user;
	},
	deleteRecipe: (user, recipe) => {
		const index = user.recipes.indexOf(recipe.id);
		if (index > -1) {
			user.recipes.splice(index, 1);
		}
		return user;
	}
};
