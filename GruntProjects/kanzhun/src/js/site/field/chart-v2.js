(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    $.fn.extend({
    	//<canvas id="pie" width="100" height="100" data-ratio="0.65_0.15_0.20" ></canvas>

    	doughnutChart: function(o){
				this.each(function(m, n){
					try{
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
							endAngle = endAngle + v * Math.PI * 2;
							ctx.fillStyle = colors[i];
							ctx.beginPath();
							ctx.moveTo(center, center);
							ctx.arc(center, center, radius, startAngle, endAngle, false);
							ctx.closePath();
							ctx.fill();
							startAngle = endAngle;
						});

						ctx.fillStyle = o.centerColor;
						ctx.beginPath();
						ctx.arc(center, center, radius-o.borderWidth, 0, Math.PI * 2, false);
						ctx.closePath();
						ctx.fill();

						ctx.beginPath();
						ctx.lineWidth = 1;
						ctx.strokeStyle = colors[0];
						ctx.arc(center, center, radius-8, startAngle,endAngle + ratio[0] * Math.PI * 2 , false);
						ctx.stroke();
					}catch(err){
					}
				});
			}
			/*
			doughnutChart: function(o){
				this.each(function(m, n){
					try{
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
					}catch(err){}
				});
			}*/

    });
}));
