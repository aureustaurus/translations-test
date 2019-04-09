const request = require("supertest");
const app = require("../server.js");
const assert = require("assert");

function binaryParser(res, callback) {
	res.setEncoding("binary");
	res.data = "";
	res.on("data", function(chunk) {
		res.data += chunk;
	});
	res.on("end", function() {
		callback(null, new Buffer.from(res.data, "binary"));
	});
}

// request examples from 'translations-test' root directory
//curl -F 'file=@mocks/text-1.txt' 'http://localhost:5000/api/v1/raw'
//curl -F 'file=@mocks/text-1.txt' 'http://localhost:5000/api/v1/words/revers'

describe("GET /raw", () => {
	it("should get response with json from raw data", done => {
		request(app)
			.post("/api/v1/raw")
			.attach("file", "./test/mocks/text-1.txt")
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				const { body } = res;
				const expectedResponse = {
					allWordsArr: [
						"Lorem",
						"ipsum",
						"dolor",
						"sit",
						"amet",
						"consectetur",
						"adipiscing",
						"elit"
					]
				};

				assert.deepEqual(body, expectedResponse);
				done();
			});
	});
});

describe("POST /words/uniq", () => {
	it("should get response with json raw data", done => {
		request(app)
			.post("/api/v1/words/uniq")
			.attach("file", "./test/mocks/text-1.txt")
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				const { body } = res;
				const expectedResponse = {
					uniqueWords: 8,
					punctuationCharacters: 2
				};

				assert.deepEqual(body, expectedResponse);
				done();
			});
	});

	it("should get response zero result if file is empty", done => {
		request(app)
			.post("/api/v1/words/uniq")
			.attach("file", "./test/mocks/text-4.txt")
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				const { body } = res;
				const expectedResponse = {
					uniqueWords: 0,
					punctuationCharacters: 0
				};

				assert.deepEqual(body, expectedResponse);
				done();
			});
	});

	it("should get response with zero punctuation", done => {
		request(app)
			.post("/api/v1/words/uniq")
			.attach("file", "./test/mocks/text-2.txt")
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				const { body } = res;
				const expectedResponse = {
					uniqueWords: 8,
					punctuationCharacters: 0
				};

				assert.deepEqual(body, expectedResponse);
				done();
			});
	});

	it("should get response with zero uniq words but with punctuation", done => {
		request(app)
			.post("/api/v1/words/uniq")
			.attach("file", "./test/mocks/text-3.txt")
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				const { body } = res;
				const expectedResponse = {
					uniqueWords: 0,
					punctuationCharacters: 3
				};

				assert.deepEqual(body, expectedResponse);
				done();
			});
	});

	it("should get response where all words are the same", done => {
		request(app)
			.post("/api/v1/words/uniq")
			.attach("file", "./test/mocks/text-6.txt")
			.expect(200)
			.end((err, res) => {
				if (err) done(err);

				const { body } = res;
				const expectedResponse = {
					uniqueWords: 1,
					punctuationCharacters: 2
				};

				assert.deepEqual(body, expectedResponse);
				done();
			});
	});
});

describe("POST /words/revers", () => {
	it("should get response with reversed string", done => {
		request(app)
			.post("/api/v1/words/revers")
			.attach("file", "./test/mocks/text-1.txt")
			.expect(200)
			.buffer()
			.parse(binaryParser)
			.end((err, res) => {
				if (err) done(err);
				const { body } = res;

				assert.ok(Buffer.isBuffer(body));

				const actualResult = body.toString();
				const expectedResponse =
					"meroL muspi rolod tis tema, rutetcesnoc gnicsipida tile.";

				assert.equal(actualResult, expectedResponse);
				done();
			});
	});

	it("should get response with reversed string from empty string", done => {
		request(app)
			.post("/api/v1/words/revers")
			.attach("file", "./test/mocks/text-4.txt")
			.expect(200)
			.buffer()
			.parse(binaryParser)
			.end((err, res) => {
				if (err) done(err);
				const { body } = res;

				assert.ok(Buffer.isBuffer(body));

				const actualResult = body.toString();
				const expectedResponse = "";

				assert.equal(actualResult, expectedResponse);
				done();
			});
	});

	it("should get response with reversed string from string without punctuation", done => {
		request(app)
			.post("/api/v1/words/revers")
			.attach("file", "./test/mocks/text-2.txt")
			.expect(200)
			.buffer()
			.parse(binaryParser)
			.end((err, res) => {
				if (err) done(err);
				const { body } = res;

				assert.ok(Buffer.isBuffer(body));

				const actualResult = body.toString();
				const expectedResponse =
					"meroL muspi rolod tis tema rutetcesnoc gnicsipida tile";

				assert.equal(actualResult, expectedResponse);
				done();
			});
	});

	it("should get response with reversed string from string without words", done => {
		request(app)
			.post("/api/v1/words/revers")
			.attach("file", "./test/mocks/text-3.txt")
			.expect(200)
			.buffer()
			.parse(binaryParser)
			.end((err, res) => {
				if (err) done(err);
				const { body } = res;

				assert.ok(Buffer.isBuffer(body));

				const actualResult = body.toString();
				const expectedResponse = ", . !";

				assert.equal(actualResult, expectedResponse);
				done();
			});
	});
});
