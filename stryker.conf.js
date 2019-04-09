module.exports = function(config) {
	config.set({
		// mutate: ["test/**/*.js"],
		files: ["test/index.js", "test/unit-tests.js"],
		filesToMutate: ["test/index.js", "test/unit-tests.js"],
		mochaOptions: {
			files: ["test/index.js", "test/unit-tests.js"],
			ui: "bdd",
			timeout: 3000,
			asyncOnly: false,
			grep: /.*/
		},

		mutator: "javascript",
		packageManager: "npm",
		reporters: ["clear-text", "progress"],
		testRunner: "mocha",
		transpilers: [],
		testFramework: "mocha",
		coverageAnalysis: "perTest",
		clearTextReporter: {
			maxTestsToLog: 2
		}
	});
};
