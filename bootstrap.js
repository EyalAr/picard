define(['require', 'jquery', 'when/when', './isStandardHtmlTag'], function(require, $, when, isStandardHtmlTag){
    function load(comp){
        comp = comp.toLowerCase();
        if (isStandardHtmlTag(comp)) return when(function(html){
            return when($("<" + comp + ">").html(html));
        });
        return when.promise(function(resolve, reject){
            require([comp], resolve, reject);
        }).otherwise(function(reason){
            if (reason.requireType === "scripterror")
                throw Error("Unable to load component '" + comp + "'");
            throw reason;
        });
    }

    function bootstrap($el){
        var tag = $el.get(0).tagName,
            data = $el.data(),
            html = $el.html();
        return load(tag).then(function(factory){
            return factory.call(null, html, data).then(function($comp){
                var attributes = $el.prop("attributes");
                $.each(attributes, function() {
                    $comp.attr(this.name, this.value);
                });
                return $comp;
            });
        }).then(function($comp){
            return when.map($comp.children().map(function(i, child){
                return $(child);
            }), bootstrap).tap(function(){
                $el.replaceWith($comp);
            }).yield($comp);
        });
    }

    return bootstrap;
});
