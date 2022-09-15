const path = require('path')

const process = filename => `module.exports = ${JSON.stringify(path.basename(filename))};`

module.exports = { process }
