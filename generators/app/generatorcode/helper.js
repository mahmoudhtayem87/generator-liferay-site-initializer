const Axios = require('axios').default;
const fs = require('fs');
var builder = require('xmlbuilder');
const { XMLParser } = require('fast-xml-parser');
var xmldom = require('xmldom');
var xpath = require('xpath');

const config = require('./config');

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
function replaceSpace(item) {
    return item.split(' ').join('-');
}
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

async function getLocalizedValue(value, languageId) {
    const defaultLanguageId = languageId ? languageId : config.config().defaultLanguageId;
    return value[defaultLanguageId] ? value[defaultLanguageId] : '';
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
    checkFolder(dir);
    fs.writeFile(`${dir}/${filename}`, filedata, function (err) {
        if (err) return console.error(err);
    });
}

async function downloadFile(fileUrl, outputLocationPath, enableAuth = false) {
    const writer = fs.createWriteStream(outputLocationPath);
    const axiosCfg =
        enableAuth ? {
            method: 'get',
            url: fileUrl,
            responseType: 'stream',
            withCredentials: true,
            auth: {
                username: config.config().liferay.user,
                password: config.config().liferay.password
            }
        } :
            {
                method: 'get',
                url: fileUrl,
                responseType: 'stream'
            };

    return Axios(axiosCfg).then(response => {
        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;
            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
            });
        });
    });
}

module.exports = {
    getOffset,
    emptyOrRows,
    replaceSpace,
    getAuthHeader,
    checkFolder,
    createFile,
    getLocalizedValue,
    getNameTree,
    downloadFile
}