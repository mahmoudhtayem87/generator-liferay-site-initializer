/**
 * @author Mahmoud Hussein Tayem
 * @description this job is used to pull all of the web content templates for a specific web content 
 * structure and store them in the site initializer required format
 */
var dir = './output/resources/site-initializer/ddm-templates';
const applications = require('../services/applications');

const config = require('../config');
const helper = require('../helper');
fs = require('fs');
var builder = require('xmlbuilder');
const { XMLParser } = require('fast-xml-parser');
var _structures;
async function checkSubFolder(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function processTemplate(template) {
    var templateScript = template.templateScript;
    var folderName = helper.replaceSpace(template.name);
    var structure = _structures.filter(str => str.id === template.contentStructureId)[0];
    var template_json =
    {
        "ddmStructureKey": helper.replaceSpace(structure.name),
        "ddmTemplateKey": helper.replaceSpace(template.name),
        "name": template.name
    };
    await checkSubFolder(`${dir}/${folderName}`);
    await createFile(templateScript, `/${folderName}/ddm-template.ftl`);
    await createFile(JSON.stringify(template_json), `/${folderName}/ddm-template.json`);
}

async function createFile(filedata, filename) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`${dir}/${filename}`, filedata.toString(), function (err) {
        if (err) return console.error(err);
    });
}

async function start(structures) {
    console.info(`Processing web content templates!`);
    _structures = structures;
    var data = await applications.getWebContentTemplates();
    for (let index = 0; index < data.items.length; index++) {
        const element = data.items[index];
        processTemplate(element);
    }
}
module.exports = {
    start
}
