/**
 * @author Mahmoud Hussein Tayem
 * @description in this file you will be injecting your exporting jobs, make sure to follow 
 * the same pattern and to make your start method async method
 */
const thumbnail = require('./thumbnail');
const webcontent = require('./webContentStructure.js');
const documents = require('./documents');
const layout = require('./layout');
const vocabularies = require('./vocabularies');
const channel = require('./commerce-channel');
const catalogs = require('./commerce-catalogs');
const commerceOptions = require('./commerce-options');
const commerceWarehoses = require('./commerce-inventory-warehouses');
const products = require('./commerce-products');
const fragments = require('./fragments');
const widget = require('./widgetTemplate.js');
const applications = require('../services/applications');
const accounts = require("./accounts");
const config = require('../config');
const roles = require("./roles");
const usersAccounts = require('./useraccounts');
const siteConfig = require('./siteconfiguration');
const navMenus = require('./navigationmenus');
const sap = require('./serviceaccesspolicies');
const buildfiles = require('./buildfiles');
const picklists = require('./picklists');
const objects = require('./objects');
async function start() {

    await setupUserInformation();

    const cfg = config.config();

    buildfiles.start();

    sap.start();
    objects.start();
    picklists.start();
    navMenus.start();
    roles.start();
    siteConfig.start();
    usersAccounts.start();
    accounts.start();
    widget.start();
    layout.start();

    if (cfg.generateThumbnail) {
        thumbnail.start();
    }
    
    vocabularies.start();
    webcontent.start();
    documents.start();
    fragments.start();

    if (cfg.exportCommerce) {
        channel.start();
        commerceOptions.start();
        await commerceWarehoses.start();
        await catalogs.start();
        products.start();
    }
}
async function setupUserInformation() {
    const currentAccount = await applications.getMyUser();
    const userAccount = await applications.getUserAccountJSONAPIs(currentAccount.id);
    config.setUserId(currentAccount.id);
    config.setCompanyId(userAccount.companyId);
    config.setDefaultLanguage(userAccount.languageId);
}
module.exports = {
    start
}