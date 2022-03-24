<style>
.languageSelector .icon {
    position: unset!important;
    left: unset!important;
    top: unset!important;
    line-height: unset!important;
    z-index: 3;
    display: inline-flex!important;
}
.languageSelector .form-select {
    height: unset!important;
    left: unset!important;
    top: unset!important;
    line-height: unset!important;
    z-index: 3;
    display: inline-flex!important;
    width:unset!important;
}
.languageSelector select
{
    background: transparent;
    border: none!important;
    text-transform: uppercase;
    max-width: 90px;
    font-size: 13px;
    color: #919191;
}
.languageSelector select:focus
{
    outline:none!important;
}
.languageSelectorDropDown
{
    text-transform: uppercase!important;
}
</style>
<script>
    function onChange(event)
    {
		 		e = event || window.event;
        var target = e.target || e.srcElement;
				document.location = target.value;
    }
</script>
<div class="input-group-icon languageSelector">
        <div class="icon">
				<i class="icofont-globe" aria-hidden="true"></i></div>
        <div class="form-select" id="default-select">
            <select class="languageSelectorDropDown" onChange="onChange(event)">
                <#list entries as curLanguage>
                    <#if !curLanguage.isSelected() >
                    <option value='${curLanguage.getURL()!''}'  >
                    </#if>
                    <#if curLanguage.isSelected() >
                    <option selected value='${curLanguage.getURL()!''}'  >
                    </#if>
                        ${curLanguage.longDisplayName}
                    </option>
                </#list>
            </select>
        </div>
    </div>