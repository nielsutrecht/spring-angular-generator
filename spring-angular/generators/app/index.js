'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var SpringAngularGenerator = module.exports = function SpringAngularGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(SpringAngularGenerator, yeoman.generators.Base);

SpringGenerator.prototype.askFor = function askFor() {
    var cb = this.async();
    console.log(chalk.green('\nWelcome to the Spring/Angular Generator\n\n'));
    var prompts = [
        {
            type: 'string',
            name: 'bootVersion',
            message: '(1/6) What version of Spring Boot would you like to use?',
            default: '0.5.0.M5'
        },
        {
            type: 'string',
            name: 'packageName',
            message: '(2/6) What is your default package name?',
            default: 'com.myapp'
        },
        {
            type: 'string',
            name: 'baseName',
            message: '(3/6) What is the base name of app?',
            default: 'app'
        },
        {
            type: 'checkbox',
            name: 'starters',
            message: '(4/6) select your starters',

            choices: [
                {
                    name: 'Data-jpa',
                    value: 'jpa'
                },
                {
                    name: 'Logging',
                    value: 'logging'
                }
            ]
        }
    ];

    this.prompt(prompts, function (props) {
        this.packageName = props.packageName;
        this.baseName = props.baseName;
        this.bootVersion = props.bootVersion;
        this.useSpock = props.useSpock;
        this.starters = props.starters;

        var hasStarter = function (starter) { return props.starters.indexOf(starter) !== -1; };
        this.jpa = hasStarter('jpa');
        this.logging = hasStarter('logging');

        cb();
    }.bind(this));
};

SpringGenerator.prototype.app = function app() {
    var packageFolder = this.packageName.replace(/\./g, '/');
    var srcDir = 'src/main/java/' + packageFolder;
    this.mkdir(srcDir);
    this.template('templates/_pom.xml', 'pom.xml');
    this.template('Application.java', srcDir + '/Application.java');

    this.config.set('packageName', this.packageName);
    this.config.set('packageFolder', packageFolder);
};