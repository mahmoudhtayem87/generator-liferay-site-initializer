/**
 * @author Peter Richards
 * @description this job is used to pull the Commerce options
 */
const request = require('request');

const applications = require('../services/applications');
const config = require('../config');
const helper = require('../helper');

const rootDir = './output/resources/site-initializer/commerce-catalogs';

async function start() {
  await helper.checkFolder(rootDir);
  var rows = await applications.getCommerceOptions();
  if (rows == null || rows.items == null || rows.items.length <= 0) {
    console.info(`No Commerce options found!`);
    return;
  }
  console.log("Processing Commerce options");
  var optionsData = [];
  for (let index = 0; index < rows.items.length; index++) {
    const option = rows.items[index];
    var optionValues = await getOptionValues(option.id);
    optionsData.push({
      "externalReferenceCode": option.externalReferenceCode,
      "facetable": option.facetable,
      "fieldType": option.fieldType,
      "key": option.key,
      "required": option.required,
      "skuContributor": option.skuContributor,
      "name": await getLocalizedValue(option.name),
      "values": optionValues
    });
  }
  await helper.createFile(JSON.stringify(optionsData), rootDir, "commerce-options.json");
}

async function getLocalizedValue(value) {
  const defaultLanguageId = config.config().defaultLanguageId;
  return value[defaultLanguageId] ? value[defaultLanguageId] : '';
}

async function getOptionValues(opionId) {
  const url = `${config.config().liferay.host}/o/headless-commerce-admin-catalog/v1.0/options/${opionId}/optionValues`;
  var rows = await new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': helper.getAuthHeader(config)
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve(JSON.parse(response.body));
    });
  });

  if (rows == null || rows.items == null || rows.items.length <= 0) {
    return [];
  }

  var optionValues = [];
  for (let index = 0; index < rows.items.length; index++) {
    var element = rows.items[index];
    optionValues.push({
      "externalReferenceCode": element.externalReferenceCode,
      "key": element.key,
      "name": await getLocalizedValue(element.name),
      "priority": element.priority
    });
  }
  return optionValues;
}

module.exports = {
  start
}