describe("Streader", function () {
  var reader;

  beforeEach(function(){
    reader = new Streader("Dummy Text");
  });

  describe("constructor(text)", function () {
    it("Threw a TypeError when text was not a string", function () {
      expect(function(){new Streader(1)}).toThrowError(TypeError);
    });

    it("Successfully created new StringReader instance", function(){
      expect(new Streader() instanceof Streader).toBe(true);
    })
  });

  describe("setSource(text)", function(){
    it("Threw an Error when text was not specified", function () {
      expect(function(){reader.setSource()}).toThrowError(Error);
    });

    it("Threw a TypeError when text was not a string", function () {
      expect(function(){reader.setSource(1)}).toThrowError(Error);
    });

    it("Successfully set new source string", function(){
      var newSource = "NewSource";
      reader.setSource(newSource);
      expect(reader.getSource()).toEqual(newSource);
      expect(reader.getIndex()).toEqual(0);
    })
  });

  describe("read(count)", function(){
    it("Return 'D' when args was not passed and cursor was advanced", function(){
      expect(reader.read()).toEqual('D');
      expect(reader.getIndex()).toEqual(1);
    });

    it("Return 'Dummy Text' when count == 10", function(){
      expect(reader.read(10)).toEqual('Dummy Text');
      expect(reader.getIndex()).toEqual(10);
    });

    it("Return null when eof", function(){
      reader.read(10);
      expect(reader.read()).toEqual(null);
      expect(reader.getIndex()).toEqual(10);
    });
  });

  describe("peek(count, offset)", function(){
    it("Returned 'D' when args was not passed without advancing cursor", function () {
      expect(reader.peek()).toEqual('D');
      expect(reader.getIndex()).toEqual(0);
    });

    it("Returned 'Text' when count == 4 and offset = 7", function () {
      expect(reader.peek(4, 7)).toEqual('Text');
    });

    it("Returned null when offset was larger the source length", function () {
      expect(reader.peek(1, 15)).toEqual(null);
    });

    it("Returned null when reader was eof", function () {
      reader.read(15);
      expect(reader.peek()).toEqual(null);
    });
  });

  describe("skip(count)", function () {
    it("Skipped 5 characters when 10 available", function () {
      expect(reader.skip(5)).toEqual(5);
      expect(reader.getIndex()).toEqual(5);
    });

    it("Skipped 0 characters when eof", function () {
      reader.read(10);
      expect(reader.skip(5)).toEqual(0);
      expect(reader.getIndex()).toEqual(10);
    });

    it("Skipped 10 characters instead of 15 when 10 available", function () {
      expect(reader.skip(15)).toEqual(10);
      expect(reader.getIndex()).toEqual(10);
    });

    it("Skipped 1 character when args was not passed", function () {
      expect(reader.skip()).toEqual(1);
      expect(reader.getIndex()).toEqual(1);
    });
  });

  describe("readPattern(pattern)", function(){
    it("Successfully read a string pattern", function(){
      expect(reader.readPattern("Dummy")).toEqual("Dummy");
      expect(reader.getIndex()).toEqual(5);
    });

    it("Successfully read a regex pattern", function(){
      expect(reader.readPattern(/\w+/)).toEqual("Dummy");
      expect(reader.getIndex()).toEqual(5);
    });

    it("Returned null when eof", function(){
      reader.read(10);
      expect(reader.readPattern(/\w+/)).toEqual(null);
      expect(reader.getIndex()).toEqual(10);
    });

    it("Returned null when string pattern was not found", function(){
      expect(reader.readPattern("test")).toEqual(null);
      expect(reader.getIndex()).toEqual(0);
    });

    it("Returned null when regex pattern was not found", function(){
      expect(reader.readPattern(/Text/)).toEqual(null);
      expect(reader.getIndex()).toEqual(0);
    });

    it("Threw a TypeError when pattern was not either string of regexp", function(){
      expect(function(){ reader.readPattern(1) }).toThrowError(TypeError);
    });
  });


  describe("peekPattern(pattern)", function(){
    it("Successfully peek a string pattern with offset", function(){
      expect(reader.peekPattern("Text", 7)).toEqual("Text");
      expect(reader.getIndex()).toEqual(0);
    });

    it("Successfully peek a regex pattern", function(){
      expect(reader.peekPattern(/\w+/)).toEqual("Dummy");
      expect(reader.getIndex()).toEqual(0);
    });

    it("Returned null when eof", function(){
      reader.read(10);
      expect(reader.peekPattern(/^\w+/)).toEqual(null);
      expect(reader.getIndex()).toEqual(10);
    });

    it("Returned null when string pattern was not found", function(){
      expect(reader.peekPattern("test")).toEqual(null);
      expect(reader.getIndex()).toEqual(0);
    });

    it("Returned null when regex pattern was not found", function(){
      expect(reader.peekPattern(/Text/)).toEqual(null);
      expect(reader.getIndex()).toEqual(0);
    });

    it("Threw a TypeError when pattern was not either string of regexp", function(){
      expect(function(){ reader.peekPattern(1) }).toThrowError(TypeError);
    });
  });

  describe("skipPattern(pattern)", function(){
    it("Successfully skipped a string pattern", function(){
      expect(reader.skipPattern("Dummy")).toEqual(5);
      expect(reader.getIndex()).toEqual(5);
    });

    it("Successfully skipped a regex pattern", function(){
      expect(reader.skipPattern(/^\w+/)).toEqual(5);
      expect(reader.getIndex()).toEqual(5);
    });

    it("Returned null when eof", function(){
      reader.read(10);
      expect(reader.skipPattern(/^\w+/)).toEqual(0);
      expect(reader.getIndex()).toEqual(10);
    });

    it("Returned null when string pattern was not found", function(){
      expect(reader.skipPattern("test")).toEqual(0);
      expect(reader.getIndex()).toEqual(0);
    });

    it("Returned null when regex pattern was not found", function(){
      expect(reader.skipPattern(/Text/)).toEqual(0);
      expect(reader.getIndex()).toEqual(0);
    });

    it("Threw a TypeError when pattern was not either string of regexp", function(){
      expect(function(){ reader.skipPattern(1) }).toThrowError(TypeError);
    });
  });
});
