module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    coverageReporter: {
      type: 'lcov', dir: 'coverage/'
    },
    files: [
      'dist/strider.js',
      'test/*.js'
    ],
    preprocessors: {
      'dist/strider.js': ['coverage']
    },
    reporters: ['progress', 'coverage', 'coveralls'],
    port: 9876,
    browsers: ['PhantomJS'],
    // singleRun: true,
    autoWatch: true,
    captureTimeout: 4 * 60 * 1000
  })
};
