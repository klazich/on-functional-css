/** @format */

var through = require('through2')

function NoopPlugin(file, encoding, done) {
  this.push(file)
  return done()
}

function noop() {
  return through.obj(NoopPlugin)
}

module.exports = noop
