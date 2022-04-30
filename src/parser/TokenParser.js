
let parseTokens = (data) => {
  let tokens = []

  let characters = data.split('')
  let token = ''

  characters.forEach((c) => {
    
    if (isToken(token, c)) {
      tokens.push(token)
      token = ''
    }

    token += c
  })

  return tokens
}

let delimiter = /[^A-Za-z0-9\s]+/g
let notWhiteSpace = /[^\s+]/g
let whiteSpace = /\s+/g
let lettersAndNumbers = /[A-Za-z0-9]/g

let isToken = (token, nextChar) => {
  return isWhiteSpaceFollowedByDelimiter(token, nextChar) || 
          isDelimiter(token) ||
          isLettersAndNumbersFollowedByDelimiter(token, nextChar)
}

let isWhiteSpaceFollowedByDelimiter = (token, nextChar) => {
  return nextChar.match(delimiter) != null && token.match(whiteSpace) != null
}

let isLettersAndNumbersFollowedByDelimiter = (token, nextChar) => {
  return token.match(lettersAndNumbers) != null && 
  (nextChar.match(delimiter) != null || nextChar.match(whiteSpace) != null)
}

let isDelimiter = (token) => {
  return token.match(delimiter) != null
}

module.exports = {
  parseTokens,
  isToken,
  isWhiteSpaceFollowedByDelimiter,
  isDelimiter,
  isLettersAndNumbersFollowedByDelimiter
}