define(['jquery', 'when/when', "picard/template!./template.html"], function($, when, template){
    return function(html, params){
        return when($("<span>").html(html).append(template, $("<p>").text(params.username)));
    };
});
