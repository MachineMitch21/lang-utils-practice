
let fs = require('fs')

global.__basedir = __dirname

fs.readFile('./index.js', 'utf8', (err, data) => {
  if (err) {
    return console.log(err)
  }
  console.log(data)
  let tokens = parseTokens(data)

  console.log(tokens)
})
