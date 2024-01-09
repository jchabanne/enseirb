const {cypher} = require("./cypher.js");

describe("Cypher", function() {
   test("Replace letters by hyphen", function () {
      const result = cypher("foo");
      expect(result).toEqual("---");
   });
});
