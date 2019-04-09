const assert = require("assert");

const {
	getClearBody,
	countUniqWordsFromText,
	countPunctuationsFromText,
	getCounterUniqWordsAndPunctuations,
	getAllWordsFromText,
	reversedWord,
	reversedWordsInArr,
	getReversedText
} = require("../helpers/index.js");

describe("Unit tests:", () => {
	describe("helper: getClearBody", () => {
		it("should get clear body from request without file", () => {
			const req = {};
			const clearBody = getClearBody(req);

			assert.deepEqual(clearBody, "");
		});

		it("should get clear body from request with empty file body", () => {
			const req = { files: { file: { data: Buffer.from("") } } };
			const clearBody = getClearBody(req);

			assert.deepEqual(clearBody, "");
		});

		it("should get clear body from request with filled file body", () => {
			const req = { files: { file: { data: Buffer.from("Hello word") } } };
			const clearBody = getClearBody(req);

			assert.deepEqual(clearBody, "Hello word");
		});
	});

	describe("helper: countUniqWordsFromText", () => {
		it("should get amount of words from empty string", () => {
			const text = "";
			const countedWords = countUniqWordsFromText(text);
			const expectedResponse = {};

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get amount of words from string without words", () => {
			const text = "! , . : ; ? !!";
			const countedWords = countUniqWordsFromText(text);
			const expectedResponse = {};

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get amount of words", () => {
			const text = "dd ff ee, tt; Ll ll";
			const countedWords = countUniqWordsFromText(text);
			const expectedResponse = {
				dd: 1,
				ff: 1,
				ee: 1,
				tt: 1,
				ll: 2
			};

			assert.deepEqual(countedWords, expectedResponse);
		});
	});

	describe("helper: countPunctuationsFromText", () => {
		it("should get amount of punctuations from empty string", () => {
			const text = "";
			const countedWords = countPunctuationsFromText(text);
			const expectedResponse = 0;

			assert.equal(countedWords, expectedResponse);
		});

		it("should get amount of punctuations", () => {
			const text = "! , . : ; ? !!";
			const countedWords = countPunctuationsFromText(text);
			const expectedResponse = 8;

			assert.equal(countedWords, expectedResponse);
		});

		it("should get amount of punctuations from string with other words", () => {
			const text = "dd ff ee, tt; Ll ll.";
			const countedWords = countPunctuationsFromText(text);
			const expectedResponse = 3;

			assert.equal(countedWords, expectedResponse);
		});
	});

	describe("helper: getCounterUniqWordsAndPunctuations", () => {
		it("should get counter from empty string", () => {
			const text = "";
			const countedWords = getCounterUniqWordsAndPunctuations(text);
			const expectedResponse = { uniqueWords: 0, punctuationCharacters: 0 };

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get counter from string without words", () => {
			const text = "! , . : ; ? !!";
			const countedWords = getCounterUniqWordsAndPunctuations(text);
			const expectedResponse = { uniqueWords: 0, punctuationCharacters: 8 };

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get counter from string with other words", () => {
			const text = "dd ff ee, tt; Ll ll.";
			const countedWords = getCounterUniqWordsAndPunctuations(text);
			const expectedResponse = { uniqueWords: 5, punctuationCharacters: 3 };

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get counter from string without punctuations", () => {
			const text = "dd ff ee tt Ll ll";
			const countedWords = getCounterUniqWordsAndPunctuations(text);
			const expectedResponse = { uniqueWords: 5, punctuationCharacters: 0 };

			assert.deepEqual(countedWords, expectedResponse);
		});
	});

	describe("helper: getAllWordsFromText", () => {
		it("should get all words from text like array from empty string", () => {
			const text = "";
			const countedWords = getAllWordsFromText(text);
			const expectedResponse = [];

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get all words from text like array from string without words", () => {
			const text = ", . !";
			const countedWords = getAllWordsFromText(text);
			const expectedResponse = [",", ".", "!"];

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get all words from text like array", () => {
			const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
			const countedWords = getAllWordsFromText(text);
			const expectedResponse = [
				"Lorem",
				"ipsum",
				"dolor",
				"sit",
				"amet",
				",",
				"consectetur",
				"adipiscing",
				"elit",
				"."
			];

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get all words from text like array from string without punctuation", () => {
			const text = "Lorem ipsum dolor sit amet consectetur adipiscing elit";
			const countedWords = getAllWordsFromText(text);
			const expectedResponse = [
				"Lorem",
				"ipsum",
				"dolor",
				"sit",
				"amet",
				"consectetur",
				"adipiscing",
				"elit"
			];

			assert.deepEqual(countedWords, expectedResponse);
		});
	});

	describe("helper: reversedWord", () => {
		it("should get reversed word from empty string", () => {
			const text = "";
			const countedWords = reversedWord(text);
			const expectedResponse = "";

			assert.equal(countedWords, expectedResponse);
		});

		it("should get reversed word from string", () => {
			const text = "test";
			const countedWords = reversedWord(text);
			const expectedResponse = "tset";

			assert.equal(countedWords, expectedResponse);
		});

		it("should get reversed word from string with capital letter", () => {
			const text = "Test";
			const countedWords = reversedWord(text);
			const expectedResponse = "tseT";

			assert.equal(countedWords, expectedResponse);
		});

		it("should get reversed word from string with specialCharacters", () => {
			const text = "Test!";
			const countedWords = reversedWord(text);
			const expectedResponse = "!tseT";

			assert.equal(countedWords, expectedResponse);
		});
	});

	describe("helper: reversedWordsInArr", () => {
		it("should get reversed word from array", () => {
			const text = [
				"Lorem",
				"ipsum",
				"dolor",
				"sit",
				"amet",
				",",
				"consectetur",
				"adipiscing",
				"elit",
				"."
			];
			const countedWords = reversedWordsInArr(text);
			const expectedResponse = [
				"meroL",
				"muspi",
				"rolod",
				"tis",
				"tema,",
				"rutetcesnoc",
				"gnicsipida",
				"tile."
			];

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get reversed word from array without punctuations", () => {
			const text = [
				"Lorem",
				"ipsum",
				"dolor",
				"sit",
				"amet",
				"consectetur",
				"adipiscing",
				"elit"
			];
			const countedWords = reversedWordsInArr(text);
			const expectedResponse = [
				"meroL",
				"muspi",
				"rolod",
				"tis",
				"tema",
				"rutetcesnoc",
				"gnicsipida",
				"tile"
			];

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get reversed word from empty array", () => {
			const text = [];
			const countedWords = reversedWordsInArr(text);
			const expectedResponse = [];

			assert.deepEqual(countedWords, expectedResponse);
		});

		it("should get reversed word from array without words", () => {
			const text = [".", ",", "!"];
			const countedWords = reversedWordsInArr(text);
			const expectedResponse = [".", ",", "!"];

			assert.deepEqual(countedWords, expectedResponse);
		});
	});

	describe("helper: getReversedText", () => {
		it("should get reversed word from string", () => {
			const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
			const countedWords = getReversedText(text);
			const expectedResponse =
				"meroL muspi rolod tis tema, rutetcesnoc gnicsipida tile.";

			assert.equal(countedWords, expectedResponse);
		});

		it("should get reversed word from string without punctuations", () => {
			const text = "Lorem ipsum dolor sit amet consectetur adipiscing elit";
			const countedWords = getReversedText(text);
			const expectedResponse =
				"meroL muspi rolod tis tema rutetcesnoc gnicsipida tile";

			assert.equal(countedWords, expectedResponse);
		});

		it("should get reversed string from empty string", () => {
			const text = "";
			const countedWords = getReversedText(text);
			const expectedResponse = "";

			assert.equal(countedWords, expectedResponse);
		});

		it("should get reversed string from string without words", () => {
			const text = " . , !";
			const countedWords = getReversedText(text);
			const expectedResponse = ". , !";

			assert.equal(countedWords, expectedResponse);
		});
	});
});
