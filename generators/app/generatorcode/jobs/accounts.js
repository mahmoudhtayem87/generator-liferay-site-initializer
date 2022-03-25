/**
 * @author Mahmoud Hussein Tayem
 * @description this job is used to pull all of the site pages (public and private) and
 * store them in the site initializer required format
 */
var dir = './output/resources/site-initializer/';
const applications = require('../services/applications');
const config = require('../config');
const helper = require('../helper');
fs = require('fs');


async function createFile(filedata, filename) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }
  fs.writeFile(`${dir}/${filename}`, filedata.toString(), function (err) {
    if (err) return console.error(err);
  });
}


async function processAccounts(accounts)
{
  var _account = [];
  for(let index = 0 ; index < accounts.length ; index++)
  {
    var account = {
        "externalReferenceCode": accounts[index].externalReferenceCode,
        "name": accounts[index].name,
        "type":  accounts[index].type,
      };
    _account.push(account);
  }
  await createFile(JSON.stringify(_account),"accounts.json");
}
async function start() {

  var accounts = await applications.getAccounts();
  processAccounts(accounts.items);

}

module.exports = {
  start
}



