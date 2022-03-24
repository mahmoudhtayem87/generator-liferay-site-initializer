/**
 * @author Mahmoud Hussein Tayem
 * @description this job is used to pull all of the Journal Articles for a specific Web Content Structure
 * and store them in the site initializer required format
 */
var dir = './output/resources/site-initializer/journal-articles';
const applications = require('../services/applications');
const config = require('../config');
const helper = require('../helper');
fs = require('fs');
var builder = require('xmlbuilder');
const { XMLParser } = require('fast-xml-parser');
var _structure;
async function checkSubFolder(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function processArticle(element) {
    var articleContent = await applications.getJournalArticleById(element.key);
    await checkSubFolder(`${dir}/${articleContent.urlTitle}`);
    var jornal_article = {
        "articleId": `${articleContent.urlTitle}`,
        "ddmStructureKey": `${helper.replaceSpace(_structure.name)}`,
        "folder": `${articleContent.urlTitle}`,
        "name": `${articleContent.title}`
    };
    await createFile(JSON.stringify(jornal_article), `/${articleContent.urlTitle}/jornal_article.json`);
    await createFile(articleContent.content, `/${articleContent.urlTitle}/jornal_article.xml`);
}

async function createFile(filedata, filename) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`${dir}/${filename}`, filedata.toString(), function (err) {
        if (err) return console.error(err);
    });
}
async function start(structure) {
    _structure = structure;
    var data = await applications.getJournalArticleByStructureId(structure.id);
    console.info(`${data.items.length} Web Content Articles for Structure ID ${structure.name} Found!`);
    for (let index = 0; index < data.items.length; index++) {
        const element = data.items[index];
        processArticle(element);
    }
}
module.exports = {
    start
}
