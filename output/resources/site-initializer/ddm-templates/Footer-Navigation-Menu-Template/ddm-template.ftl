<#if entries?has_content>
    <#list entries as navigationEntry>
        <#if navigationEntry.hasChildren()>
            <#assign uniqueId=.now?string["HHmmssSSS"]?number />
						<div class="col-20 autofit-col autofit-col-expand ">
            <div class="widget mb-5 mb-lg-0">
                <h4 class="text-capitalize mb-3">${navigationEntry.getName()}</h4>
                <div class="divider mb-4"></div>
                <ul class="list-unstyled footer-menu lh-35">
                    <#list navigationEntry.getChildren() as SubEntry>
                    <li>
                        <a href="${SubEntry.getURL()}">
                            ${SubEntry.getName()} 
                        </a>
                    </li>
                    </#list>
                </ul>
            </div>
						</div>
        </#if>
    </#list>
</#if>