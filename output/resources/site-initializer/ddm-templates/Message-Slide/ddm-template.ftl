<#assign date =  .vars['reserved-article-modified-date'].data>
<#assign originalLocale = .locale>
<#setting locale = localeUtil.getDefault()>
<#assign date = date?datetime("EEE, d MMM yyyy HH:mm:ss Z")>
<#assign locale = originalLocale>
<div class="testimonial-block style-2  gray-bg">
    <i class="icofont-quote-right"></i>

    <div class="testimonial-thumb mx-2" style="background-position: center;width:50px;height:50px;border-radius:50%;border-style:solid;border-color:var(--gray);background-image: url('${Avatar.getData()}');background-size: cover!important;">
       
    </div>

    <div class="client-info ">
        <h4>
            <#if (CustomerName.getData())??>
                ${CustomerName.getData()}
            </#if>
        </h4>
        <span>
         
               ${date?string["MMM d, yyyy"]}
          
        </span>
        <p>
           <#if (Message.getData())??>
	${Message.getData()}
</#if>
        </p>
    </div>
</div>