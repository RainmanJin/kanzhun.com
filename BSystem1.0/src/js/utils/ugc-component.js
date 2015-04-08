(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    $.fn.extend({
    	//<canvas id="pie" width="100" height="100" data-ratio="0.65_0.15_0.20" ></canvas>
    	rating: function(classname){
			this.each(function(i, v){
				var target = $(v);

				target.on('mouseenter', 'a', function(){
					target.attr('class', classname + parseInt(target.find('a').index(this)+1));
				}).on('mouseleave', function(){
					target.attr('class', classname.split(' ')[0]);
				}).one('click', 'a', function(){
					target.off('mouseenter').off('mouseleave');
				});
		    });	

		}
    });
}));
