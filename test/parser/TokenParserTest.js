
const assert = require('assert')
const tokenParser = require('../../src/parser/TokenParser')

describe("Token Parser Test Suite", () => {
  before(() => {
    console.log("Executing tests...")
  })
  after(() => {
    console.log("Done executing tests...")
  })

  describe("Validate white space", () => {
    it("Token is white space followed by delimiter", () => {
      let token = "     "
      let nextChar = "("

      assert.equal(tokenParser.isWhiteSpaceFollowedByDelimiter(token, nextChar), true)
    })

    it("Token is white space followed by white space", () => {
      token = " "
      nextChar = " "

      assert.equal(tokenParser.isWhiteSpaceFollowedByDelimiter(token, nextChar), false)
    })

    it("Token is letters or numbers followed by white space", () => {
      let token = "a342dfds"
      let nextChar = " "

      assert.equal(tokenParser.isLettersAndNumbersFollowedByDelimiter(token, nextChar), true)
    })
  })

  describe("Validate delimiters", () => {
    it("Check delimiter characters", () => {
      let delimiters = [
        ';', ',', '\'', '"', '^', 
        '#', '!', '@', '$', '%', 
        '&', '*', '(', ')', '[', 
        ']', '+', '=', '-', '_',
        '{', '}', '|', '\\', '/',
        '.', '<', '>', '~', '`',
        ':', '?'
      ]

      delimiters.forEach((d) => {
        console.log("Validating " + d + " is a delimiter")
        assert.equal(tokenParser.isDelimiter(d), true)
      })
    })

    it("Validate not delimiters", () => {
      let notDelimiters = [
        'ase2', '2', 'aocnso', 'int', 'float',
        'double', 'qw', '     ', ' ', '\n', '\r'
      ]

      notDelimiters.forEach((nd) => {
        console.log("Validating " + nd + " is not a delimiter")
        assert.equal(tokenParser.isDelimiter(nd), false)
      })
    })
  })

  describe("Validating isToken", () => {

    describe("Simple tokens", () => {
      it("Validate identifier", () => {
        let token = "num"
        let nextChar = "="

        assert.equal(tokenParser.isToken(token, nextChar), true)
      })

      it("White space followed by white space is not a complete token", () => {
        let token = "   "
        let nextChar = " "

        assert.equal(tokenParser.isToken(token, nextChar), false)
      })

      it("Anything followed by delimiter is a token", () => {
        let tokenList = ["asdf", "   ", " ", "=", "12"]
        let delimiterList = [";", "(", "&", "=", "*"]

        for (let i = 0; i < tokenList.length && i < delimiterList.length; i++) {
          let token     = tokenList[i]
          let delimiter = delimiterList[i]

          let tokenWithDelimiter = token + delimiter

          console.log("Validating the following statement has a token followed by a delimiter " + tokenWithDelimiter)

          assert.equal(tokenParser.isToken(token, delimiter), true)
        }
      })
    })

  })
})