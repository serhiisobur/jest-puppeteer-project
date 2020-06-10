module.exports = {
  diff: true,
  spec: "./specs/**/*.js",
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 3000,
  ui: 'bdd',
  'watch-files': ['specs/**/*.js'],
};
