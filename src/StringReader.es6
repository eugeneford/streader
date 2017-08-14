/**
 * Convenient way to read through strings
 * @class StringReader
 */
class StringReader {
  /**
   * Creates a new instance of StringReader
   * @constructor
   * @param text
   */
  constructor(text) {
    if (text && typeof text !== "string") throw new TypeError("Text should be a String");
    this._source = text;
    this._index = 0;
  }

  /**
   * Loads the new text source to StringReader.
   * Note: method resets current cursor data.
   * @param text
   */
  setSource(text) {
    if (typeof text === "undefined") throw new Error("Text is missing");
    if (typeof text !== "string") throw new TypeError("Text should be a String");
    this._source = text;
    this.reset();
  }

  /**
   * Gets the current index of the cursor.
   * @returns {number}
   */
  getIndex() {
    return this._index;
  }

  /**
   * Gets the current reader's source string
   * @return {*}
   */
  getSource() {
    return this._source;
  }

  /**
   * Reads the next character without advancing the cursor
   * @param offset — optional offset to start read at
   * @param count — optional count of characters to read
   * @returns {string|null}
   */
  peek(count = 1, offset = 1) {
    // If we're at the end of the source
    if (offset > 0 && this.eof()) return null;

    const peekIndex = this._index + offset - 1;

    // Return null if peekIndex is larger than source length
    if (peekIndex >= this._source.length) return null;
    // Or try to return a single character
    if (count <= 1) return this._source.charAt(peekIndex);
    // Otherwise return sequence
    return this._source.substr(peekIndex, count);
  }

  /**
   * Reads characters that match either string or regexp pattern without advancing the cursor.
   * @param offset — optional offset to start read at
   * @param pattern — string of regexp to get matched
   * @throws TypeError — if {pattern} is not a string or regexp
   * @return {string|null}
   */
  peekPattern(pattern, offset = 1){
    // If we're at the end of the source
    if (this.eof()) return null;

    const sourceTrail = this._source.substring(this._index);

    // Try to read a string pattern
    if (typeof pattern === "string") {
      for (let i = 0; i < pattern.length; i++){
        if (pattern[i] !== sourceTrail[i + offset - 1]) return null;
      }
      return this.peek(pattern.length, offset);
    }
    // Or, read a RegExp pattern
    else if (pattern instanceof RegExp) {
      if (!this._normalizeRegExp(pattern).test(sourceTrail)) return null;
      return this.peek(RegExp.lastMatch.length, offset);
    }
    // Otherwise, throw an Error
    else throw new TypeError("Pattern must be a String or RegExp");
  }

  /**
   * Reads the next character
   * @param count — optional count of character to read
   * @returns {string|null}
   */
  read(count = 1) {
    // If we're at the end of the source
    if (this.eof()) return null;
    let str;

    // Try to get a single character
    if (count <= 1) str = this._source.charAt(this._index);
    // Otherwise, get a sequence
    else str = this._source.substr(this._index, count);

    // Increment cursor position
    this._index = this._index + count;

    return str;
  }

  /**
   * Reads characters that match either string or regexp pattern.
   * @param pattern — string of regexp to get matched
   * @throws TypeError — if {pattern} is not a string or regexp
   * @return {string|null}
   */
  readPattern(pattern){
    // If we're at the end of the source
    if (this.eof()) return null;

    const sourceTrail = this._source.substring(this._index);

    // Try to read a string pattern
    if (typeof pattern === "string") {
      for (let i = 0; i < pattern.length; i++){
        if (pattern[i] !== sourceTrail[i]) return null;
      }
      return this.read(pattern.length);
    }
    // Or, read a RegExp pattern
    else if (pattern instanceof RegExp) {
      if (!this._normalizeRegExp(pattern).test(sourceTrail)) return null;
      return this.read(RegExp.lastMatch.length);
    }
    // Otherwise, throw an Error
    else throw new TypeError("Pattern must be a String or RegExp");
  }

  /**
   * Skips the next character
   * @param count — optional count of character to skip
   * @return {number} — count of actually skipped characters
   */
  skip(count = 1) {
    // If we're at the end of the source
    if (this.eof()) return 0;
    let skipped;

    // Try to skip available count
    if (this._index + count > this._source.length) {
      skipped = this._source.length - this._index;
      this._index = this._source.length;
      return skipped;
    }
    // Otherwise, skip specified count
    this._index = this._index + count;
    return count;
  }

  /**
   * Skips characters that match either string or regexp
   * @param pattern — string or regexp to get matched
   * @throws TypeError — if {pattern} is not a string or regexp
   * @return {number} — count of skipped characters
   */
  skipPattern(pattern){
    // If we're at the end of the source
    if (this.eof()) return 0;

    const sourceTrail = this._source.substring(this._index);

    // Try to read a string pattern
    if (typeof pattern === "string") {
      for (let i = 0; i < pattern.length; i++){
        if (pattern[i] !== sourceTrail[i]) return 0;
      }
      return this.skip(pattern.length);
    }
    // Or, read a RegExp pattern
    else if (pattern instanceof RegExp) {
      if (!this._normalizeRegExp(pattern).test(sourceTrail)) return 0;
      return this.skip(RegExp.lastMatch.length);
    }
    // Otherwise, throw an Error
    else throw new TypeError("Pattern must be a String or RegExp");
  }

  /**
   * Checks if we're at the end of the source
   * @returns {boolean}
   */
  eof() {
    return this._index >= this._source.length;
  }

  /**
   * Reset current cursor position
   */
  reset() {
    this._index = 0;
  }

  /**
   * Normalizes target RegExp to be matched with the start of the source
   * @param regexp
   * @return {RegExp}
   * @private
   */
  _normalizeRegExp(regexp){
    if (regexp.source.indexOf("^") > -1) return regexp;
    return new RegExp(`^${regexp.source}`, regexp.flags);
  }
}

export default StringReader;
