/**
 * @author Mahmoud Hussein Tayem
 * @description this job is used to pull all of the site widget display templates and 
 * store them in the site initializer required format
 */
 const Axios = require('axios').default;
 var request = require('request');
 var dir = './output/resources/site-initializer/ddm-templates';
 const applications = require('../services/applications');
 const config = require('../config');
 const helper = require('../helper');
 fs = require('fs');
 var builder = require('xmlbuilder');
 const { XMLParser } = require('fast-xml-parser');
 
 async function processWidget(element) {
     console.log(`Processing Widget ${element.nameCurrentValue}!`);
     var collectionDir = `${dir}/${helper.replaceSpace(element.nameCurrentValue)}`;
     await checkSubFolder(collectionDir);
     
     var widget_Info = {
        "className": (await applications.getResourceClassName(element.classNameId)).value,
        "ddmTemplateKey": element.templateKey,
        "name": element.nameCurrentValue,
        "resourceClassName": (await applications.getResourceClassName(element.resourceClassNameId)).value
     };
     createFile(element.script, `/${helper.replaceSpace(element.nameCurrentValue)}/ddm-template.ftl`);
     createFile(JSON.stringify(widget_Info), `/${helper.replaceSpace(element.nameCurrentValue)}/ddm-template.json`);
 
 }
 async function createFile(filedata, filename) {
     if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
     }
     fs.writeFile(`${dir}/${filename}`, filedata.toString(), function (err) {
         if (err) return console.error(err);
     });
 }
 async function checkFolder() {
     if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
     }
 }
 async function checkSubFolder(dir) {
     if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
     }
 }
 async function start() {
     var rows = await applications.getWidgetDisplayTemplates();
     await checkFolder();
     if (rows == null || rows == null || rows.length <= 0) {
         console.info(`No Widget Template  found!`);
         return;
     }
     for (let index = 0; index < rows.length; index++) {
         const element = rows[index];
         processWidget(rows[index]);
     }
 }
 
 module.exports = {
     start
 }
 
 
 
 