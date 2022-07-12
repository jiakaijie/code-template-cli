const path = require('path');

module.exports = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: 'node',
  target: ['node10.4'],
  outfile: "dist/codeTemplateCli.js",
  treeShaking: true,
  // resolveExtensions: ['.ts', '.js'],
  // tsconfig: 'tsconfig.json',
};