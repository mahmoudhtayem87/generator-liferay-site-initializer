<#assign date = .vars['reserved-article-display-date'].data>
<#setting time_zone = languageUtil.get(locale, "template-timezone")>
<#assign originalLocale = locale>
<#-- Set locale to en_US to be able to parse the date string and make it a date object -->
<#setting locale = 'en_US'>
<#assign date = date?datetime("EEE,dd MMM yyyy")>

<div class="py-2">
    <span class="text-sm text-muted">${date?string("dd MMMM, yyyy")}</span>
    <h6 class="my-2">
        <a href="${friendlyURLs[themeDisplay.getLanguageId()]!""}">
            <#if (Title.getData())??>
                ${Title.getData()}
            </#if>
        </a>
    </h6>
</div>