/**
 * @author Peter Richards
 * @description this job is used to pull the Commerce catalog
 */
const request = require('request');

const applications = require('../services/applications');
const config = require('../config');
const commerceContext = require('../commerceContext');
const helper = require('../helper');

const rootDir = './output/resources/site-initializer/commerce-catalogs';

async function start() {
  await helper.checkFolder(rootDir);
  var rows = await applications.getCommerceCatalogs();
  if (rows == null || rows.items == null || rows.items.length <= 0) {
    console.info(`No Commerce Catalogs found!`);
    return;
  }
  for (let index = 0; index < rows.items.length; index++) {
    const element = rows.items[index];
    processCatalog(element);
  }
}

async function processCatalog(element) {
  const catalogName = element.name.replace(/\s+/g, '-').toLowerCase() + '-commerce-catalog';
  console.log(`Processing ${catalogName}`);
  commerceContext.addCatalog({
    "id": element.id,
    "name": element.name,
    "filePrefix": catalogName,
    "code": element.externalReferenceCode
  });
  exportCatalog(catalogName, element);
}

async function exportCatalog(catalogName, element) {
  var catalogData = {
    "assetVocabularyName": element.name,
    "currencyCode": element.currencyCode,
    "defaultLanguageId": element.defaultLanguageId,
    "externalReferenceCode": element.externalReferenceCode,
    "name": element.name
  };
  await helper.createFile(JSON.stringify(catalogData), rootDir, catalogName + ".json");
}

module.exports = {
  start
}
