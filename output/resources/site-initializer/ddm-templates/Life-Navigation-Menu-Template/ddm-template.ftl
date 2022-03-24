<#if entries?has_content>
    <#list entries as navigationEntry>
        <#if navigationEntry.hasChildren()>
            <#assign uniqueId=.now?string["HHmmssSSS"]?number />
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="item_${uniqueId}" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    ${navigationEntry.getName()} <i class="icofont-thin-down"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="item_${uniqueId}">
                    <#list navigationEntry.getChildren() as SubEntry>
                        <#assign subActive="" />
                        <#if SubEntry.isSelected()>
                            <#assign subActive="active">
                        </#if>
                        <li>
                            <a class="dropdown-item" href="${SubEntry.getURL()}"> ${SubEntry.getName()}</a>
                        </li>
                    </#list>
                </ul>
            </li>
            <#else>
            <li class="nav-item">
                <a class="nav-link" href="${navigationEntry.getURL()}">${navigationEntry.getName()}</a>
            </li>
        </#if>
    </#list>
</#if>