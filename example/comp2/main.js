define(['jquery', 'when/when'], function($, when){
    return function(html){
        return when($("<p>").html(html));
    };
});
