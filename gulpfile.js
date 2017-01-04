"use strict";

const gulp = require("gulp");
const babel = require("babelify");
const browserify = require("browserify");
const fs = require("fs");
const gls = require("gulp-live-server");

const paths = {
	inputReact : "./client/App.js",
	outputReact : "./public/assets/js",
	dirReact : "./client/**/*.js",
	app : "./server.js"
};

function swallowError(error) {
	console.log(error.message);
	this.emit("end");
}

gulp.task("babel", () => {
	browserify(paths.inputReact)
	.transform("babelify", { presets: ["es2015", "react", "stage-0"], plugins: ["transform-runtime"]})
	.bundle()
	.on("error", swallowError)
	.pipe(fs.createWriteStream(`${paths.outputReact}/bundle.js`));
});

gulp.task("babel:w",["babel"] , () => {
	gulp.watch(paths.dirReact , ["babel"]);
});

gulp.task("set",["babel:w"], () => {
	const server = gls.new(paths.app);
	server.start();
	gulp.watch([`${paths.outputReact}/*.js`], (file) => {
		server.start.bind(server)();
		server.notify.bind(server)(file);
	});
});
