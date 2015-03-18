define([ "jquery", "./bootstrap" ], function($, bootstrap){
    function load(name, require, onload, config){
        require([ "text!" + name ], function(template){
            bootstrap($(template)).then(function($el){
                onload($el);
            }, onload.error);
        }, onload.error);
    }

    return {
        load: load
    };
});
