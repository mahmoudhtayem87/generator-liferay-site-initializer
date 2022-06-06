/**
 * @author Mahmoud Hussein Tayem
 * @description in this file you will be injecting your code which will be responsible to call liferay apis
 */
const config = require('../config');

var digestRequest = require('request-digest')(config.config().liferay.user
  , config.config().liferay.password);

const helper = require('../helper');
const request = require('request');

async function getContentStructureWebDav(structureId) {
  return new Promise(function (resolve, reject) {
    const DigestFetch = require('digest-fetch')
    const client = new DigestFetch(config.config().liferay.user, config.config().liferay.password, { algorithm: 'MD5' })
    client.fetch(`${config.config().liferay.host}/webdav/${config.config().friendlyUrlPath}/journal/Structures/${structureId}`, {})
      .then(res =>
        res.json()
      ).then(data =>
        resolve(data));
  });
}
async function getContentStructures() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/content-structures`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve((JSON.parse(response.body)).items);
    });
  });
}
async function getMyUser() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-user/v1.0/my-user-account`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve((JSON.parse(response.body)));
    });
  });
}
async function getUserAccountJSONAPIs(userId) {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/user/get-user-by-id/user-id/${userId}`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve((JSON.parse(response.body)));
    });
  });
}
async function getSites() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-user/v1.0/my-user-account/sites`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve((JSON.parse(response.body)).items);
    });
  });
}
async function getRootDocuments() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/documents?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getRootFolders() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/document-folders?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getSubFolders(folderId) {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery//v1.0/document-folders/${folderId}/document-folders?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getSubFoldersFiles(folderId) {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery//v1.0/document-folders/${folderId}/documents?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getJournalArticleById(articleId) {
  var url = `${config.config().liferay.host}/api/jsonws/journal.journalarticle/fetch-article/group-id/${config.config().siteId}/article-id/${articleId}`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getJournalArticleByStructureId(id) {
  var url = `${config.config().liferay.host}/o/headless-delivery/v1.0/content-structures/${id}/structured-contents?page=0&pageSize=999999`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getWebContentTemplates() {
  var url = `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/content-templates?page=0&pageSize=999999`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getFragmentCollections() {
  var url = `${config.config().liferay.host}/api/jsonws/fragment.fragmentcollection/get-fragment-collections/group-ids/${config.config().siteId}`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getFragmentsByCollectionId(collectionId) {
  var url = `${config.config().liferay.host}/api/jsonws/fragment.fragmententry/get-fragment-entries/fragment-collection-id/${collectionId}`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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

async function getWidgetDisplayTemplates() {
  var url = `${config.config().liferay.host}/api/jsonws/ddm.ddmtemplate/get-templates?companyId=${config.config().companyId}&groupIds=${config.config().siteId}&classNameIds=&classPKs=0&resourceClassNameId=41966&start=0&end=9999&-orderByComparator=`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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

async function getResourceClassName(key) {
  var url = `${config.config().liferay.host}/api/jsonws/classname/fetch-by-class-name-id/class-name-id/${key}`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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

async function getLayouts(privateLayout) {
  var url = `${config.config().liferay.host}/api/jsonws/layout/get-layouts/group-id/${config.config().siteId}/private-layout/${privateLayout}/keywords/types/start/0/end/99999/-order-by-comparator`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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


async function getCommerceCatalogs() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-commerce-admin-catalog/v1.0/catalogs?page=0&pageSize=999999`,
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

async function getCommerceChannels() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-commerce-admin-channel/v1.0/channels?page=0&pageSize=999999`,
      'headers': {
        'Authorization': helper.getAuthHeader(config)
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve(JSON.parse(response.body).items);
    });
  });
}
async function getCategories(vocabularyId) {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-taxonomy/v1.0/taxonomy-vocabularies/${vocabularyId}/taxonomy-categories?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getSubCategories(parentCatId) {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-taxonomy/v1.0/taxonomy-categories/${parentCatId}/taxonomy-categories?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getVocabularies() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-taxonomy/v1.0/sites/${config.config().siteId}/taxonomy-vocabularies?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getCommerceOptions() {
  var url = `${config.config().liferay.host}/o/headless-commerce-admin-catalog/v1.0/options?page=0&pageSize=999999`;
  return new Promise(function (resolve, reject) {
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
}
async function getLayouts(privateLayout) {
  var url = `${config.config().liferay.host}/api/jsonws/layout/get-layouts/group-id/${config.config().siteId}/private-layout/${privateLayout}/keywords/types/start/0/end/99999/-order-by-comparator`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getLayoutDefinition(pageUrl) {
  var url = `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/site-pages/${pageUrl}`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getLayoutDefinition(pageUrl) {
  var url = `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/site-pages/${pageUrl}`;
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': url,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getAccounts() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-user/v1.0/accounts?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
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
async function getCommerceWarehouses() {
  var url = `${config.config().liferay.host}/o/headless-commerce-admin-inventory/v1.0/warehouses?page=0&pageSize=999999`;
  return new Promise(function (resolve, reject) {
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
}
async function getRoles(roleType) {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/role/get-roles?type=${roleType}&subtype`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getUsersAccounts() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-user/v1.0/user-accounts`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getUserRoles(accountId)
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/role/get-user-roles/user-id/${accountId}`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getSiteConfiguration()
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/group/get-group/group-id/${config.config().siteId}`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getNavigationMenus()
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/navigation-menus`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getServiceAccessPolicies()
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/sap.sapentry/get-company-sap-entries/company-id/${config.config().companyId}/start/0/end/99999/-order-by-comparator`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getPickLists()
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/listtype.listtypedefinition/get-list-type-definitions/start/0/end/99999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getPickListEntires(listId)
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/listtype.listtypeentry/get-list-type-entries/list-type-definition-id/${listId}/start/0/end/999999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getObjectDefinitions()
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/object-admin/v1.0/object-definitions`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getObjectEntires(object)
{
  return new Promise(function (resolve, reject) {

    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/c/${object}/`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
async function getObjectDefinition(objectId)
{
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/api/jsonws/object.objectdefinition/get-object-definition/object-definition-id/${objectId}`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
            + ":" + config.config().liferay.password).toString("base64")
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
  getRoles,
  getContentStructures,
  getRootDocuments,
  getSites,
  getRootFolders,
  getSubFolders,
  getContentStructureWebDav,
  getCommerceCatalogs,
  getCommerceChannels,
  getSubFoldersFiles,
  getJournalArticleByStructureId,
  getJournalArticleById,
  getWebContentTemplates,
  getFragmentsByCollectionId,
  getFragmentCollections,
  getMyUser,
  getVocabularies,
  getUserAccountJSONAPIs,
  getWidgetDisplayTemplates,
  getResourceClassName,
  getCommerceOptions,
  getCategories,
  getSubCategories,
  getLayouts,
  getLayoutDefinition,
  getAccounts,
  getCommerceWarehouses,
  getUsersAccounts,
  getUserRoles,
  getSiteConfiguration,
  getNavigationMenus,
  getServiceAccessPolicies,
  getPickLists,
  getPickListEntires,
  getObjectDefinitions,
  getObjectEntires,
  getObjectDefinition
}