<#assign templateId = "51059" />
<div class="autofit-float autofit-row autofit-row-center autofit-padded-no-gutters-x">
    <div class="autofit-col autofit-col-expand">
        <#if entries?has_content>
            <#list entries as curEntry>
            ${articleService.getContentByClassPK(curEntry.getClassPK()?number, templateId)}
            </#list>
        </#if>
    </div>
</div>