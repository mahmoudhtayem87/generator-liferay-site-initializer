'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const generator = require('./generatorcode/index');

module.exports = class extends Generator {
  async prompting() {
   await generator.setup();
  }
};
