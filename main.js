define(['jquery', 'when/when', './bootstrap'], function(jQuery, when, bootstrap){

    var config = {
        mountAttr: 'mount'
    };

    function run(scope){
        return when.promise(function(resolve, reject){
            jQuery(function($){
                var bootstraps = [];
                $(scope || 'html').find('['+ config.mountAttr +']').each(function(i, root){
                    var $root = $(root);
                    if ($root.parents('['+ config.mountAttr +']').length){
                        reject(Error("Mounting points cannot be nested."));
                        return false;
                    }
                    bootstraps.push(bootstrap($root));
                });
                when.all(bootstraps).then(resolve, reject);
            });
        });
    }

    return run;

});
