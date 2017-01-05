"use strict";

const expect = require("chai").expect;
const recipeModel = require("../models/recipe");

let recipe;

describe("Recipe Model - New Recipe", () => {
	before(() => {
		recipe = recipeModel.newRecipe("name", "description", "author", [], "directions", true);
	});

	it("recipe should be a valid object", (done) => {
		expect(recipe).to.not.be.an("undefined");
		expect(recipe).to.be.an("object");
		return done();
	});

	it("recipe should have required properties", (done) => {
		expect(recipe).to.have.property("error");
		expect(recipe).to.have.property("id");
		expect(recipe).to.have.property("name");
		expect(recipe).to.have.property("description");
		expect(recipe).to.have.property("author");
		expect(recipe).to.have.property("isPublic");
		expect(recipe).to.have.property("ingredients");
		expect(recipe).to.have.property("directions");
		return done();
	});

	it("recipe should have the correct starting values", (done) => {
		expect(recipe.error).to.be.a("boolean");
		expect(recipe.error).to.equal(false);
		expect(recipe.id).to.be.a("string");
		expect(recipe.id.length).to.equal(36);
		expect(recipe.name).to.be.a("string");
		expect(recipe.name).to.equal("name");
		expect(recipe.description).to.be.a("string");
		expect(recipe.description).to.equal("description");
		expect(recipe.author).to.be.a("string");
		expect(recipe.author).to.equal("author");
		expect(recipe.isPublic).to.be.a("boolean");
		expect(recipe.isPublic).to.equal(true);
		expect(recipe.ingredients).to.be.an("array");
		expect(recipe.ingredients.length).to.equal(0);
		expect(recipe.directions).to.be.a("string");
		expect(recipe.directions).to.equal("directions");
		expect(recipe.isPublic).to.be.a("boolean");
		expect(recipe.isPublic).to.equal(true);
		return done();
	});
});

describe("Recipe Model - Edit Name", () => {
	before(() => {
		recipe = recipeModel.editName(recipe, "new name");
	});

	it("returned recipe should be a valid object", (done) => {
		expect(recipe).to.not.be.an("undefined");
		expect(recipe).to.be.an("object");
		return done();
	});

	it("returned recipe should have modified name", (done) => {
		expect(recipe.name).to.equal("new name");
		return done();
	});
});

describe("Recipe Model - Edit Description", () => {
	before(() => {
		recipe = recipeModel.editDescription(recipe, "new desc");
	});

	it("returned recipe should be a valid object", (done) => {
		expect(recipe).to.not.be.an("undefined");
		expect(recipe).to.be.an("object");
		return done();
	});

	it("returned recipe should have modified description", (done) => {
		expect(recipe.description).to.equal("new desc");
		return done();
	});
});

describe("Recipe Model - Edit Ingredients", () => {
	before(() => {
		recipe = recipeModel.editIngredients(recipe, ["pork", "chicken"]);
	});

	it("returned recipe should be a valid object", (done) => {
		expect(recipe).to.not.be.an("undefined");
		expect(recipe).to.be.an("object");
		return done();
	});

	it("returned recipe should have modified ingredients", (done) => {
		expect(recipe.ingredients.length).to.equal(2);
		expect(recipe.ingredients[0]).to.equal("pork");
		expect(recipe.ingredients[1]).to.equal("chicken");
		return done();
	});
});

describe("Recipe Model - Edit Directions", () => {
	before(() => {
		recipe = recipeModel.editDirections(recipe, "testing");
	});

	it("returned recipe should be a valid object", (done) => {
		expect(recipe).to.not.be.an("undefined");
		expect(recipe).to.be.an("object");
		return done();
	});

	it("returned recipe should have modified directions", (done) => {
		expect(recipe.directions).to.equal("testing");
		return done();
	});
});

describe("Recipe Model - Edit Privacy", () => {
	before(() => {
		recipe = recipeModel.editPrivacy(recipe, false);
	});

	it("returned recipe should be a valid object", (done) => {
		expect(recipe).to.not.be.an("undefined");
		expect(recipe).to.be.an("object");
		return done();
	});

	it("returned recipe should have modified ingredients", (done) => {
		expect(recipe.isPublic).to.equal(false);
		return done();
	});
});
