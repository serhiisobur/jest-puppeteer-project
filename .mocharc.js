module.exports = {
  diff: true,
  parallel: false,
  reporter: 'mochawesome',
  'reporter-option': [
    'overwrite=true',
    'reportDir=reports',
    'reportFilename=report',
    'reportTitle=My\ Custom\ Title',
    'showPassed=false'
],
  spec: ["./specs/**/*.js"],
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 10000,
  ui: 'bdd',
  'watch-files': ['specs/**/*.js'],
};
