module.exports = {
  diff: true,
  parallel: true,
  spec: ["./specs/**/*.js"],
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 10000,
  ui: 'bdd',
  'watch-files': ['specs/**/*.js'],
};
