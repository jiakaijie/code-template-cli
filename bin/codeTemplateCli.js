#!/usr/bin/env node

var path = require('path');
var commander = require('commander');

var Command = commander.Command;
var PROGRAM = new Command();

var abPath = function (dir) {
  return path.resolve(__dirname, '../', dir);
}

var codeTemplateCli = require(abPath('./dist/codeTemplateCli.js'));

PROGRAM
  .version(require('../package').version);
PROGRAM
  .usage('[option] [...value]')

PROGRAM
  .command('create')
  .action((a, obj) => {
    codeTemplateCli.create(a, obj);
  });

PROGRAM.parse(process.argv);
