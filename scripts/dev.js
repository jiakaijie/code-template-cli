const esbuild = require('esbuild');

const commonObj = require("./common.js");

const buildOptions = Object.assign(commonObj, {
  watch: {
    onRebuild(error, result) {
      if (error) {
        console.error('watch build failed:', error);
      } else {
        console.log('watch build succeeded');
      }
    },
  },
});

esbuild
  .build(buildOptions)
  .then(result => {
    console.log('watching...');
  });