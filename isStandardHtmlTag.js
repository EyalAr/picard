define([], function(){
    function isStandardHtmlTag(tag){
        var e = document.createElement(tag);
        return e.constructor.toString().indexOf("HTMLUnknownElement") === -1;
    }

    return isStandardHtmlTag;
});
