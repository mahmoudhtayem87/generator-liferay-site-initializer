const fs = require('fs');

var builder = require('xmlbuilder');
const {XMLParser} = require('fast-xml-parser');
var xmldom = require('xmldom');
var xpath = require('xpath');
async function getNameTree(xml) {
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


function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}
function replaceSpace(item)
{
    return item.split(' ').join('-');
}
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function getAuthHeader(config) {
    return "Basic " + new Buffer.from(config.config().liferay.user + ":" + config.config().liferay.password).toString("base64")
}

async function checkFolder(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
}

async function createFile(filedata, dir, filename) {
    fs.writeFile(`${dir}/${filename}`, filedata, function (err) {
      if (err) return console.error(err);
    });
  }

module.exports = {
    getOffset,
    emptyOrRows,
    replaceSpace,
    getAuthHeader,
    checkFolder,
    createFile,
    getNameTree
}