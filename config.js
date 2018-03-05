const minimist = require('minimist');

let options = minimist(process.argv.slice(2), {
  string: ['env', 'dir'],
  alias: {
    env: 'e',
    dir: 'd'
  },
  boolean: ['prod', 'dev', 'test'],
  default: {
    env: process.env.NODE_ENV || 'production',
    dir: 'dist'
  }
});

config = {
  env: options.env === 'production' || options.env === 'prod'
}

module.exports = options