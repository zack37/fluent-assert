var babel = require('babel');

module.exports = function(wallaby) {
  return {
    files: [
      'src/*.js',
      'lib/*.js'
    ],
    tests: [
      'test/*-spec.js'
    ],
    env: {
      type: 'node'
    },
    compilers: {
      'src/*.js': wallaby.compilers.babel({
        babel: babel
      })
    }
  };
};
