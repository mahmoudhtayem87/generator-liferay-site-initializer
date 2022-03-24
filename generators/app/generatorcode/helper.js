const fs = require('fs');

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}
function replaceSpace(item)
{
    return item.split(' ').join('-');
}
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
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
    fs.writeFile(`${dir}/${filename}`, filedata, function (err) {
      if (err) return console.error(err);
    });
  }

module.exports = {
    getOffset,
    emptyOrRows,
    replaceSpace,
    getAuthHeader,
    checkFolder,
    createFile
}