<p align="center">
  <img src="https://raw.githubusercontent.com/eugeneford/streader/master/.github/streader-logo.png" width="100" height="100">
</p>

<h3 align="center">
  Streader
</h3>

<p align="center">
  A simple String Reader for a convenient way to read through strings
</p>

<p align="center">
  <a href="https://travis-ci.org/eugeneford/streader">
    <img src="https://travis-ci.org/eugeneford/streader.svg?branch=master" alt="Build Status">
  </a>
  <a href='https://coveralls.io/github/eugeneford/streader?branch=master'>
    <img src='https://coveralls.io/repos/github/eugeneford/streader/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://www.npmjs.com/package/streader'>
    <img src='https://img.shields.io/npm/v/streader.svg' alt='NPM Version' />
  </a>
</p>

## Basic Overview
Streader is a String Reader which simplifies the way we read through strings.

Library can be used both in Node.js and directly in Browser.
It is well-documented and completely covered with test specs (excluding webpack bundling definitions and expressions).

If you want to add some features or to suggest any idea, feel free ? [contributions are always welcome](#contributing-to-streader).

## How to Install
#### Using NPM
To use Streader with NPM simply call:
```js
npm install --save streader
```

#### In Browser
To use Streader directly in browser simply download this repository and copy dist/streader.js into your project.
Next, include it on your .html page:
```html
<script src="path/to/your/js/streader.js"></script>
```

## Get Started
You are able to use Streader as the importable npm package or directly in browser.

#### In Node.js
```js
import Streader from "streader";

var reader = new Streader("example");

while( !reader.eof() ) {
 var char = reader.read();
 // Do something with each char
}
```

#### In Browser
```html
<script>
var reader = new Streader("example");

while( !reader.eof() ) {
 var char = reader.read();
 // Do something with each char
}
</script>
```

## API
### read(count)
Reads the next characters. Count - optional count of characters to read
```js
var reader = new Streader("Example");

var chars = reader.read(7); // chars => "Example"
```

### peek(count, offset)
Reads the next character without advancing the cursor. Count - optional count of characters to read; Offset - optional offset to start read at
```js
var reader = new Streader("Example");

var chars = reader.peek(3, 2); // chars => "amp"
```

### skip(count)
Skips the next characters. Count - optional count of characters to read.
```js
var reader = new Streader("Example");

var skipped = reader.skip(3); // skipped => 3
```

### readPattern(pattern)
Reads characters that match either string or regexp pattern.
```js
var reader = new Streader("Pattern Example");

var chars = reader.readPattern("Pattern"); // chars => "Pattern"
var index = reader.getIndex(); // index => 7

var chars = reader.readPattern(/\s+/); // chars => " "
var index = reader.getIndex(); // index => 8
```

### peekPattern(pattern, offset)
Reads characters that match either string or regexp pattern without advancing the cursor.
```js
var reader = new Streader("Pattern Example");

var chars = reader.peekPattern("Ex", 8); // chars => "Ex"
var index = reader.getIndex(); // index => 0

var chars = reader.peekPattern(/\w+/); // chars => "Pattern"
var index = reader.getIndex(); // index => 0
```

### skipPattern(pattern)
Skips characters that match either string or regexp.
```js
var reader = new Streader("Pattern Example");

var skipped = reader.skipPattern("Pattern"); // skipped => 7

var skipped = reader.skipPattern(/\s|\n/); // skipped => 1
```

### eof()
Checks if we're at the end of the source
```js
var reader = new Streader("example");
reader.read(100); // Read all characters

var isEof = reader.eof(); // isEof => true
```

### reset()
Resets current cursor position
```js
var reader = new Streader("example");
reader.read(5); // Read 5 characters for example

reader.reset();

var index = reader.getIndex(); // index => 0
```

### getSource() 
Gets the current reader's source string.
```js
var reader = new Streader("example");

var source = reader.getSource(); // source => "example"
```

### getIndex()
Gets the current index of the cursor.
```js
var reader = new Streader("example");
reader.read(5); // shift cursor for example

var index = reader.getIndex(); // index => 5
```

### setSource(text)
Loads the new text source to StringReader. Method resets current cursor data. Useful for deferred read.
```js
var reader = new Streader("old");
reader.read(2); // shift cursor for example

reader.setSource("new");

var source = reader.getSource(); // source => "new"
var index = reader.getIndex(); // index => 0
```

## Contributing to Streader
Contributions are always welcome.
Before contributing please read the [code of conduct](https://js.foundation/community/code-of-conduct) &
[search the issue tracker](https://github.com/eugeneford/streader/issues) (your issue may have already been discussed or fixed).

To contribute, follow next steps:
* Fork Streader
* Commit your changes
* Open a Pull Request.

### Feature Requests
Feature requests should be submitted in the issue tracker, with a description
of the expected behavior & use case, where they?ll remain closed until sufficient interest (e.g. ? reactions).
Before submitting a feature request, please search for similar ones in the closed issues.

## License
Released under the [MIT License](https://github.com/eugeneford/collit/blob/master/LICENSE)
