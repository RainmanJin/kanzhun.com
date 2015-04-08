(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    //css3 property support
    $.support.css3Property = function(prop){
        var div = document.createElement('div'),
            vendors = ['Webkit', 'Moz', 'O', 'Ms'],
            len = vendors.length;
        if(prop in div.style){
            return true;
        }

        prop = prop.replace(/^[a-z]/, function(str){
            return str.toUpperCase();
        });
        while(len--){
            if(vendors[len] + prop in div.style){
                return true;
            }
        }
        return false;
    };
}));
