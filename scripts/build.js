const esbuild = require('esbuild');

const commonObj = require("./common.js");

const buildOptions = Object.assign(commonObj, {
  minify: true,
});

esbuild
  .build(buildOptions)
  .then(result => {
    console.log('build success')
  });