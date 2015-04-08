require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/auth_dialog','c/widgets','u/validator'],function(){
	$.maskUI.config = {
		wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
		alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
		confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p class="t-center f_14 mt10">{0}</p><p class="t-center mt20"><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
	};		
	$(".js_joboffline").on("click",function(){
		var _this=$(this);
		$.maskUI.confirm({	
			msg: '确定要下线吗',
			callback: function(){
				var jid=_this.attr("data-jid");
				$.ajax({
					url:"/job/offline.json",
					type:"post",
					data:{
						jid:jid
					},
					dataType:"json",
					success:function(result){
						location.href="/job/available/";
					}
				})
			}  
		})
	});

	$(".js_deljob").on("click",function(){
		var _this=$(this);
		$.maskUI.confirm({	
			msg: '确定要删除吗',
			callback: function(){
				var jid=_this.attr("data-jid");
				$.ajax({
					url:"/job/delete.json",
					type:"post",
					data:{
						jid:jid
					},
					dataType:"json",
					success:function(result){
						location.href="/job/offline/";
					}
				})
			}  
		})
	});
});