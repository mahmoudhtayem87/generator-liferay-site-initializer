/**
 * @author Peter Richards
 * @description this job is used to pull the Commerce channel
 */
const request = require('request');

const config = require('../config');
const helper = require('../helper');

const rootDir = './output/resources/site-initializer';

async function start() {
    await helper.checkFolder(rootDir);
    var channel = await getCommerceChannel();
    if (channel == null) {
      console.info(`No Commerce channel found!`);
      return;
    } else if (channel.siteGroupId != config.config().siteId) {
        console.info(`The Commerce channel does not match the site id!`);
    }
    console.log("Processing Commerce Channel");
    var channelData = {
        "currencyCode": channel.currencyCode,
        "externalReferenceCode": channel.externalReferenceCode,
        "name": channel.name,
        "type": channel.type
      };
      await helper.createFile(JSON.stringify(channelData), rootDir, "commerce-channel.json");
}

async function getCommerceChannel() {
    return new Promise(function (resolve, reject) {
        var options = {
          'method': 'GET',
          'url': `${config.config().liferay.host}/o/headless-commerce-admin-channel/v1.0/channels/${config.config().commerceChannelId}`,
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
}

module.exports = {
    start
  }
  