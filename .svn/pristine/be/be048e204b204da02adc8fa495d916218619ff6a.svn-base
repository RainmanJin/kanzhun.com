
require.config({
    urlArgs: "v=1.0.1",
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components'
    }
});

require(['c/auth_dialog', 'c/widgets'], function(auth_dialog){
	$(function(){
		$(".index_info .js_reset").on("click",function(){
			/*
			$.maskUI.config = {
				wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>'
			};
			var html = '<h3>提示</h3>\
	      <p class="t-center mb10">
	      '+index_info+' 
	      </p>\
	      <p class="t-center mt25">
	        <a class="btn_grey_s" href="javascript:;">继续上次体检</a>&nbsp;&nbsp;\
	        <a class="btn_grey_s" href="javascript:;">重新开始体检</a>\
	      </p>';
	     */
			$.maskUI.open({
				elem: $("section.p_dialog")
			});
		});
		$(".js_resetSubmit").on("click",function(){
			$.delCookie("zuc");
			location.href="/zhiji/questions";
		});
		$(".index_info .js_del").on("click",function(){
//			$.maskUI.config = {
//				wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
//				alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
//				confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
//			};
			$.maskUI.confirm({	
 				msg: '确定要清除答题记录吗',
 				callback: function(){
 					$.delCookie("zuc");
 					window.location.reload();
 				}  
 			})
		});
		//隐藏头部信息
		$(".index_info a.close").on("click",function(){
			$(".index_info").hide();
		})
	});	
});
