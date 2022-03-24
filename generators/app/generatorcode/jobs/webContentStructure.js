/**
 * @author Mahmoud Hussein Tayem
 * @description this job is used to pull all of  Web Content Structures
 * and store them in the site initializer required format
 */
var dir = './output/resources/site-initializer/ddm-structures';
const webContentArticle = require('./webContentArticle.js');
const applications = require('../services/applications');
const webContentTemplates = require('./webcontentTemplates.js');
const helper = require('../helper');
const config = require('../config');
fs = require('fs');
var builder = require('xmlbuilder');
const { XMLParser } = require('fast-xml-parser');

async function getXMLData(element) {
    const parser = new XMLParser();
    var structureName = element.name;
    console.info(`Processing Web Content Structure ${structureName}`);
    var root = builder.create('root');
    root = root.ele("structure");
    root = root.ele("name").text(helper.replaceSpace(element.name));
    root = root.up();
    root = root.ele("description").text(element.description == "" ? "" : element.description);
    root = root.up();
    root = root.ele("definition").cdata(JSON.stringify(await applications.getContentStructureWebDav(element.id)));
    root = root.end({ pretty: true });
    await helper.checkFolder(dir);
    await helper.createFile(root, dir, structureName + ".xml");
}

async function start() {
    var data = await applications.getContentStructures();
    webContentTemplates.start(data);
    console.info(`${data.length} Web Content Structures Found!`);
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        getXMLData(element);
        webContentArticle.start(element);
    }
}
module.exports = {
    start
}
