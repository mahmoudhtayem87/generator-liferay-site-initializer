/**
 * @author Mahmoud Hussein Tayem
 * @description a simple questionnaire  will be triggered once this file is executed
 * to get the required configurations from the end user to connect to liferay
 */
const _global = require('./global');
const inquirer = require('inquirer');
const config = require('./config');
const commerceContext = require('./commerceContext');
const start = require('./jobs/start');
const docs = require('./jobs/documents');


const applications = require('./services/applications');
var fs = require('fs');


async function selectSite() {
    var SitesMap = [];
    var sites = await applications.getSites();
    var _choices = [];
    var char = 'A';
    for (index = 0; index < sites.length; index++) {
        var choice = sites[index].key;
        SitesMap.push({
            key: char,
            groupId: sites[index].id,
            value: sites[index].key,
            friendlyUrlPath:sites[index].friendlyUrlPath
        });
        _choices.push(choice);
        char = String.fromCharCode(char.charCodeAt(char.length - 1) + 1);
    }
    inquirer.prompt([
        {
            type: 'list',
            name: 'groupId',
            message: 'Which site you are trying to export?',
            choices: _choices,
        },
    ]).then(respo => {
        var site = SitesMap.filter(site => site.value === respo.groupId)[0];
        config.setSiteId(site.groupId);
        config.setFriendlyUrlPath(site.friendlyUrlPath);
        if (config.config().exportCommerce) {
            selectCommerceChannel();
        } else {
            start.start();
        }
    });
}

async function selectCommerceChannel() {
    try {
        var ChannelMap = [];
        var channels = await applications.getCommerceChannels();
        var _choices = [];
        var char = 'A';
        for (index = 0; index < channels.length; index++) {
            var choice = channels[index].name;
            ChannelMap.push({
                key: char,
                id: channels[index].id,
                value: channels[index].name,
            });
            _choices.push(choice);
            char = String.fromCharCode(char.charCodeAt(char.length - 1) + 1);
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which channel you are trying to export?',
                choices: _choices,
            },
        ]).then(respo => {
            var channel = ChannelMap.filter(channel => channel.value === respo.name)[0];
            commerceContext.setup(channel.id);
            start.start();
        });
    } catch (ex) {
        console.error("Unable to get list of Commerce channels");
        config.setExportCommerce(false);
        start.start();
    }
}
async function setup() {
    inquirer.prompt([
        {
            name: 'LRHost',
            message: 'What is your Liferay Portal URL?',
            default: config.config().liferay.host
        }, {
            name: 'LRUser',
            message: 'What is your Liferay Portal admin user?',
            default: config.config().liferay.user
        }, {
            name: 'LRPassword',
            message: 'What is your Liferay Portal admin password?',
            default: config.config().liferay.password,
            type: 'password'
        }, {
            name: 'GenerateThumbnail',
            message: 'Would you like to generate a thumnbnail image?',
            default: true,
            type: 'confirm'
        }, {
            name: 'exportCommerce',
            message: 'Would you like to export Commerce?',
            default: true,
            type: 'confirm'
        }
    ]).then(answers => {
        config.setup(answers.LRHost, answers.LRUser, answers.LRPassword,answers.GenerateThumbnail,answers.exportCommerce);
        selectSite();
    });

}

module.exports = {
  setup
}
