'use strict'

const {dirname} = require('path')

module.exports = dirname(require.resolve('./dist/bundle.js'))
