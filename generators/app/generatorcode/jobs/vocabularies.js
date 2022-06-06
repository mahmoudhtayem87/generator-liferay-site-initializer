const config = require('../config');
const helper = require('../helper');
const applications = require('../services/applications');
var dir = './output/resources/site-initializer/taxonomy-vocabularies/group';

//http://localhost:8080/o/api?endpoint=http://localhost:8080/o/headless-admin-taxonomy/v1.0/openapi.json

async function createVocabulary(vocabulary) {

    const vocabularyDir = dir + "/" + vocabulary.name.toLowerCase();

    let vocJson = {
        "description": vocabulary.description,
        "externalReferenceCode": vocabulary.name.toUpperCase().replace(/\s/g, ''),
        "name": vocabulary.name,
        "viewableBy": "Anyone"
    };

    await helper.createFile(JSON.stringify(vocJson),dir,vocabulary.name.toLowerCase() + ".json");
    await helper.checkFolder(vocabularyDir);
    await createCategories(vocabularyDir,vocabulary.id);
}
async function createCategory(dir, parentCatId) {
    var data = await applications.getSubCategories(parentCatId);
    processCategories(dir,data);
}
async function createCategories(dir, vocabularyId) {
    var data = await applications.getCategories(vocabularyId);
    processCategories(dir,data);    
}
async function processCategories(dir, data) {
    for (let index = 0; index < data.items.length; index++) {
        const category = data.items[index];
        if (category.numberOfTaxonomyCategories > 0) {
            const catDir = dir + "/" + category.name;
            await helper.checkFolder(catDir);
            createCategory(catDir,category.id);
        }

        let categoryJson = {
            "description": category.description,
            "externalReferenceCode": category.name.toUpperCase().replace(/\s/g, ''),
            "name": category.name,
            "viewableBy": "Anyone"
        };
        helper.createFile(JSON.stringify(categoryJson),dir,category.name + ".json");
    }
}
async function start() {
    console.log('Creating vocabularies');
    await helper.checkFolder(dir);
    var data = await applications.getVocabularies();

    //loop items and create json file and folder
    for (let index = 0; index < data.items.length; index++) {
        const vocabulary = data.items[index];
        await createVocabulary(vocabulary);        
    }
}

module.exports = {
    start
}