const express = require("express");
const config = require("./config");
const http = require("http");
const fileUpload = require("express-fileupload");
const {
	getClearBody,
	getRawData,
	getCounterUniqWordsAndPunctuations,
	getReversedText
} = require("./helpers");

const app = express();
const server = http.createServer(app);

app.use(fileUpload());

// get raw data for simple test
app.post("/api/v1/raw", (req, res, next) => {
	const body = getClearBody(req);
	const result = getRawData(body);

	if (!res.headersSent) res.json({ allWordsArr: result });
	return;
});

app.post("/api/v1/words/uniq", (req, res, next) => {
	const body = getClearBody(req);
	const result = getCounterUniqWordsAndPunctuations(body);

	if (!res.headersSent) res.json(result);
	return;
});

app.post("/api/v1/words/revers", (req, res, next) => {
	const body = getClearBody(req);
	const result = getReversedText(body);

	if (!res.headersSent) {
		const fileName = "reversed.txt";

		res.setHeader("Content-Type", "text/plain");
		res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
		res.send(result);
	}
	return;
});

// route for all empty get routes
app.get("*", (req, res) => {
	res.status(404);
	res.send(`Can\'t find route with url: ${req.path}, try another route please`);
});

// route for all empty get routes
app.post("*", (req, res) => {
	res.status(404);
	res.send(`Can\'t find route with url: ${req.path}, try another route please`);
});

const logErrors = (err, req, res, next) => {
	console.error(err.stack);
	next(err);
};
app.use(logErrors);

const errorHandler = (err, req, res, next) => {
	if (err) {
		res.json({ error: err.message });
	} else {
		next();
	}
};
app.use(errorHandler);

server.listen(config.port, () => {
	console.log(`App listening on port ${config.port}...`);
});

module.exports = app;
