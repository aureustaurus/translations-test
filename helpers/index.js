const getClearBody = req => {
	const files = req.files ? req.files : {};
	const { file = {} } = files;
	const { data = "" } = file;

	return data.toString();
};

const getRawData = text => {
	const wordsArr = text.match(/(\w+)/g);
	return wordsArr;
};

const countUniqWordsFromText = text => {
	const wordsResult = {};

	if (!text) return wordsResult;

	const wordsArr = text.match(/(\w+)/g);
	if (wordsArr && wordsArr.length > 0) {
		wordsArr.forEach(word => {
			const clearWord = word.toLowerCase();
			wordsResult[clearWord] = wordsResult[clearWord]
				? wordsResult[clearWord] + 1
				: 1;
		});
	}

	return wordsResult;
};

const countPunctuationsFromText = text => {
	if (!text) return 0;

	const wordsArr = text.match(/[,.!?;:]/g);
	const result = wordsArr ? wordsArr.length : 0;

	return result;
};

const getCounterUniqWordsAndPunctuations = text => {
	const wordsResult = countUniqWordsFromText(text);
	const wordsKeys = Object.keys(wordsResult);
	const uniqWordCounter = wordsKeys ? wordsKeys.length : 0;

	const uniqPunctuationCounter = countPunctuationsFromText(text);

	const result = {
		uniqueWords: uniqWordCounter,
		punctuationCharacters: uniqPunctuationCounter
	};

	return result;
};

const getAllWordsFromText = text => {
	const wordsArr = text.match(/\w+|[,.!?;:]/g);
	return wordsArr || [];
};

const reversedWord = word => {
	const reversedWord = [];

	for (let i = word ? word.length : 0; i >= 0; i--) {
		const chart = word[i];
		reversedWord.push(chart);
	}

	return reversedWord.join("");
};

const reversedWordsInArr = wordsArr => {
	const newWordsArr = [];

	if (!wordsArr || wordsArr.length <= 0) return newWordsArr;

	wordsArr.forEach(word => {
		if (/\w+/g.test(word)) {
			newWordsArr.push(reversedWord(word));
		} else {
			const prewWordIndex =
				newWordsArr && newWordsArr.length > 0 ? newWordsArr.length - 1 : 0;

			if (
				newWordsArr[prewWordIndex] &&
				/[,.!?;:]/g.test(newWordsArr[prewWordIndex])
			) {
				newWordsArr.push(word);
			} else {
				newWordsArr[prewWordIndex] = newWordsArr[prewWordIndex]
					? `${newWordsArr[prewWordIndex]}${word}`
					: word;
			}
		}
	});

	return newWordsArr;
};

const getReversedText = text => {
	const wordsArr = getAllWordsFromText(text);
	let result = [];

	result = reversedWordsInArr(wordsArr);

	return result.join(" ");
};

module.exports = {
	getRawData,
	getClearBody,
	getCounterUniqWordsAndPunctuations,
	countUniqWordsFromText,
	countPunctuationsFromText,
	getReversedText,
	getAllWordsFromText,
	reversedWord,
	reversedWordsInArr
};
