<#assign date = .vars['reserved-article-display-date'].data>
<#setting time_zone = languageUtil.get(locale, "template-timezone")>
<#assign originalLocale = locale>
<#-- Set locale to en_US to be able to parse the date string and make it a date object -->
<#setting locale = 'en_US'>
<#assign date = date?datetime("EEE,dd MMM yyyy")>
${date?string("dd MMMM, yyyy")}