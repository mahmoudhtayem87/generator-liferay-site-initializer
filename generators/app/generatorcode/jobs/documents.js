/**
 * @author Mahmoud Hussein Tayem
 * @description this job is used to pull all of the site documents and media 
 * into the site initializer required format, this include the folders and sub folders
 */
const Axios = require('axios').default;
var request = require('request');
var dir = './output/resources/site-initializer/documents/group';
const applications = require('../services/applications');
const config = require('../config');
var builder = require('xmlbuilder');
const { XMLParser } = require('fast-xml-parser');
const helper = require('../helper');

async function processSubFolderFile(element, basePath) {
  var fileName = `${element.title}`;
  fileName = fileName.indexOf('.') === -1?`${fileName}.${element.fileExtension}`:fileName;
  fileName=`${basePath}/${fileName}`
  try {
    await downloadFile(`${config.config().liferay.host}/${element.contentUrl}`, `${fileName}`)
  } catch (exp) {
    fs.unlink(`${fileName}`, function (err) {
      if (err) throw err;
    });
    console.error(`Error while downloading file: ${element.title}`)
  }
}
async function processFile(element) {
  var fileName = `${dir}/${element.title}`;
  fileName = fileName.indexOf('.') == -1?`${fileName}.${element.fileExtension}`:fileName;
  try {
    await downloadFile(`${config.config().liferay.host}/${element.contentUrl}`, `${fileName}`)
  } catch (exp) {
    fs.unlink(`${fileName}`, function (err) {
      if (err) throw err;
    });
    console.error(`Error while downloading file: ${element.title}`)
  }
}

async function start() {
  var rows = await applications.getRootDocuments();
  await helper.checkFolder(dir);
  processRootFolders();
  if (rows == null || rows.items == null || rows.items.length <= 0) {
    console.info(`No Documents and Media found!`);
    return;
  }
  for (let index = 0; index < rows.items.length; index++) {
    const element = rows.items[index];
    processFile(rows.items[index]);
  }
}

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);
  return Axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {
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
async function processRootFolders() {
  var basePath = dir;
  var rootFolders = (await applications.getRootFolders()).items;
  for (index = 0; index < rootFolders.length; index++) {
    processSubFolder(basePath, rootFolders[index]);
  }
}
async function processSubFolder(basePath, folderEelement) {
  basePath = `${basePath}/${folderEelement.name}`;
  await helper.checkFolder(basePath);
  if (folderEelement.numberOfDocumentFolders > 0) {
    var subFolders = await applications.getSubFolders(folderEelement.id);
    for (index = 0; index < subFolders.items.length; index++) {
      processSubFolder(basePath, subFolders.items[index]);
    }
  }
  var files = await applications.getSubFoldersFiles(folderEelement.id);
  for (index = 0; index < files.items.length; index++) {
    processSubFolderFile(files.items[index], basePath);
  }
}
module.exports = {
  start
}



