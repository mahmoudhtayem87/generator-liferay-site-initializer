
function setup(LRHost,LRUser,LRPassword)
{
    global._config.liferay.host=LRHost;
    global._config.liferay.user=LRUser;
    global._config.liferay.password=LRPassword;
}

function setSiteId(siteId)
{
    global._config.siteId = siteId;
}
function setCompanyId(companyId)
{
    global._config.companyId = companyId;
}
function setUserId(userId)
{
    global._config.userId = userId;
}
function setFriendlyUrlPath(friendlyUrlPath)
{
    global._config.friendlyUrlPath = friendlyUrlPath;
}
function setDefaultLanguage(languageId)
{
    global._config.defaultLanguageId = languageId;
}
function config()
{
    return global._config;
}
module.exports = {
    config,
    setup,
    setSiteId,
    setCompanyId,
    setFriendlyUrlPath,
    setUserId,
    setDefaultLanguage
};