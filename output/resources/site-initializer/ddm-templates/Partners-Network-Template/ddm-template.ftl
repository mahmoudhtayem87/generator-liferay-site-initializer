<div class="autofit-float autofit-row clients-logo">
    <#assign templateId="46474" />
    <#if entries?has_content>
        <#list entries as curEntry>
            <div class="autofit-col autofit-col-expand testimonial-wrap-2">
                ${articleService.getContentByClassPK(curEntry.getClassPK()?number, templateId)}
            </div>
        </#list>
    </#if>
</div>

<style>
    .client-thumb img {
        max-height: 100px;
    }
		.slick-dots
		{display:none!important}
</style>