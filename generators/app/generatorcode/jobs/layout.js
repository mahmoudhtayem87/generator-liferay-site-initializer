/**
 * @author Mahmoud Hussein Tayem
 * @description this job is used to pull all of the site widget display templates and 
 * store them in the site initializer required format
 */
var xmldom = require('xmldom');
var xpath = require('xpath');
const Axios = require('axios').default;
var request = require('request');
var dir = './output/resources/site-initializer/layouts';
const applications = require('../services/applications');
const config = require('../config');
const helper = require('../helper');
fs = require('fs');
var builder = require('xmlbuilder');
const { XMLParser } = require('fast-xml-parser');

async function processWidget(element) {
    console.log(`Processing Widget ${element.nameCurrentValue}!`);
    var collectionDir = `${dir}/${helper.replaceSpace(element.nameCurrentValue)}`;
    await checkSubFolder(collectionDir);

    var widget_Info = {
        "className": (await applications.getResourceClassName(element.classNameId)).value,
        "ddmTemplateKey": element.templateKey,
        "name": element.nameCurrentValue,
        "resourceClassName": (await applications.getResourceClassName(element.resourceClassNameId)).value
    };
    createFile(element.script, `/${helper.replaceSpace(element.nameCurrentValue)}/ddm-template.ftl`);
    createFile(JSON.stringify(widget_Info), `/${helper.replaceSpace(element.nameCurrentValue)}/ddm-template.json`);

}
async function createFile(filedata, filename) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`${dir}/${filename}`, filedata.toString(), function (err) {
        if (err) return console.error(err);
    });
}
async function checkFolder() {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
async function checkSubFolder(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
async function getLayoutNameTree(xml)
{
    var parser = new xmldom.DOMParser();
    var root = parser.parseFromString(xml, 'text/xml');
    var nodes = xpath.select('//Name', root);
    titleObject = {};
    for (var index = 0; index < nodes.length; index++) {
        var language_key = nodes[index].getAttribute("language-id");
        titleObject[language_key] = nodes[index].textContent;
    }
    return titleObject;
}
async function getLayoutTypeSettings(settings)
{
    var typeSettingsList = settings.split("\n");
    var settings = [] ;
    for(var index = 0 ; index < typeSettingsList.length -1 ; index++)
    {
        var typeSettingsParts = typeSettingsList[index].split("=");
        settings.push({
            key:typeSettingsParts[0],
            value: typeSettingsParts[1]
        });
    }
    return settings;
}
async function processLayout(element) {
    var layoutFolder = `${helper.replaceSpace(element.nameCurrentValue)}`;
    await checkSubFolder(`${dir}/${layoutFolder}`);
    var page_json = {
        "hidden": element.hidden,
        "name_i18n": await getLayoutNameTree(element.name),
        "private": element.privateLayout,
        "system": element.system,
        "type": `${element.type}`,
        "typeSettings": await getLayoutTypeSettings(element.typeSettings)
    };
    getLayoutTypeSettings(element.typeSettings);
    await createFile(JSON.stringify(page_json), `${layoutFolder}/page.json`)

}
async function processPrivatePages() {
    var rows = await applications.getLayouts(true);

    if (rows == null || rows == null || rows.length <= 0) {
        console.info(`No Private Pages found!`);
        return;
    }
    for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        processLayout(rows[index]);
    }
}
async function processPublicPages() {
    var rows = await applications.getLayouts(false);

    if (rows == null || rows == null || rows.length <= 0) {
        console.info(`No Private Pages found!`);
        return;
    }
    for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        processLayout(rows[index]);
    }
}

async function start() {
    await checkFolder();
    processPrivatePages();
    processPublicPages();
}

module.exports = {
    start
}



