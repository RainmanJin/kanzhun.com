require.config({
    urlArgs: "v=1.0"
});

require(['../utils/general', '../utils/fn'], function(general){
	$(function(){
		$.uaMatch = (function() {
			ua = navigator.userAgent.toLowerCase();
			var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
				/(msie) ([\w.]+)/.exec( ua ) ||	[];
			return {
				b: match[ 1 ] || "",
				v: match[ 2 ] || "0"
			};
		})();

		$('input:text').placeholder();

		$('strong.tooltip_pic').tooltip({
			html: '<dt><span class="arrow"></span><a href="#" class="close"></a></dt><dd>'+
					'<ul class="logo_list"> '+
						'<li> '+
							'<img src="images/company.jpg" width="64" height="64" /> '+
							'<p><strong>User-0</strong></p> '+
							'<p>【当前】</p> '+
						'</li> '+
						'<li> '+
							'<img src="images/company.jpg" width="64" height="64" /> '+
							'<p><strong>User-0</strong></p> '+
							'<p>【<a href="#" class="blue">替换</a>】【<a href="#" class="blue">忽略</a>】</p> '+
						'</li> '+
						'<li> '+
							'<img src="images/company.jpg" width="64" height="64" /> '+
							'<p><strong>User-0</strong></p> '+
							'<p>【<a href="#" class="blue">新建并替换</a>】</p> '+
						'</li> '+
					'</ul></dd>',
			callback: function(coord){
				this.css({'left': coord.l-45, 'top': coord.t+10});
			}
		});


		$('strong.tooltip_cp').tooltip({
			html: '<dt><span class="arrow"></span><a href="#" class="close"></a></dt><dd>'+
					'<ul class="info_list"> '+
						'<li> '+
							'<p><strong>User-0: 互联网</strong></p> '+
							'<p>【当前】</p> '+
						'</li> '+
						'<li> '+
							'<p><strong>User-1247：电子商务</strong></p> '+
							'<p>【<a href="#" class="blue">替换</a>】</p> '+
						'</li> '+
						'<li> '+
							'<p><strong>User-127：IT服务</strong></p> '+
							'<p>【<a href="#" class="blue">替换</a>】【<a href="#" class="blue">忽略</a>】</p> '+
						'</li> '+
					'</ul></dd>',
			callback: function(coord){
				this.css({'left': coord.l-45, 'top': coord.t+10});
			}
		});




		$('#companyDescField').textareaCompare(function(same){
			if(!same){
                $(this).addClass('hightlight'); 
            }else{
                $(this).removeClass('hightlight');  
            }
		});
	});
});













