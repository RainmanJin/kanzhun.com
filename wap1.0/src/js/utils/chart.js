(function() {
    $.fn.doughnutChart=function(o){
		this.each(function(m, n){
			var target = $(n),
				ratio = target.data('ratio').split('_'),
				colors = o.colors,
				ctx = n.getContext('2d'),
				center = Math.floor(target.height()/2),	
				radius = center,
				startAngle = Math.PI * 1.5,
		        endAngle = Math.PI * 1.5;

			$.each(ratio, function(i, v){
				//弧度 = 角度 * Math.PI / 180 
				//v*360*Math.PI/180 =  v * Math.PI * 2
	    		endAngle = endAngle - v * Math.PI * 2;
		        ctx.fillStyle = colors[i];
		        ctx.beginPath();

		        ctx.moveTo(center, center);
		        ctx.arc(center, center, radius, startAngle, endAngle, true);
		        ctx.closePath();
		        ctx.fill();
		        startAngle = endAngle;
	    	});

	    	ctx.fillStyle = o.centerColor;
		    ctx.beginPath();
		    ctx.arc(center, center, radius-o.borderWidth, 0, Math.PI * 2, true);
	        ctx.fill();
		});
	}
})();
