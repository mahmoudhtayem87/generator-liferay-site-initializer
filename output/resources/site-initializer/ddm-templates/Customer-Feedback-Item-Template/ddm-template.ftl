<div class="testimonial-block style-2  gray-bg">
    <i class="icofont-quote-right"></i>

    <div class="testimonial-thumb">
        <img src="${Avatar.getData()}" alt="" class="img-fluid">
    </div>

    <div class="client-info ">
        <h4>
            <#if (Title.getData())??>
                ${Title.getData()}
            </#if>
        </h4>
        <span>
            <#if (Name.getData())??>
                ${Name.getData()}
            </#if>
        </span>
        <p>
            <#if (Text38572526.getData())??>
                ${Text38572526.getData()}
            </#if>
        </p>
    </div>
</div>