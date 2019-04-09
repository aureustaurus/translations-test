
# Quick start

## System requirements

NodeJs - v.10.1.0 or later
Mocha - v.6.0.2 or later

This packeges should be installed globaly in the system

## To use server

```npm install``` - upload all dependency
```npm start``` - start the server
```npm test``` - run the tests


## Request Examples

curl -F 'file=@mocks/text-1.txt' 'http://localhost:5000/api/v1/raw'
curl -F 'file=@mocks/text-1.txt' 'http://localhost:5000/api/v1/words/revers'

Where mocks/text-1.txt is your file source

# Tasks

Create a service with 2 API endpoints using expressJS
1. Service can accept text file in English of any size and return the count of unique words and count of all punctuation characters.
2. Service should return uploaded file with reversed words.

1. Example of a file (*test.txt*):

Lorem ipsum dolor sit amet, consectetur adipiscing elit

Response:

{
  "uniqueWords":8,
  "punctuationCharacters":2
}


2. Example of a downloaded file (test.txt):

meroL muspi rolod tis tema, rutetcesnoc adipiscing tile.
