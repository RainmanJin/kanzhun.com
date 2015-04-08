require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});
require(['c/auth_dialog', 'u/upload_portrait', 'c/widgets', 'c/mini_search'], function(auth_dialog, upload_portrait) {
	$(function() {
		//upload portrait
        upload_portrait({
            elems: $('#profilePortraitBtn'),
            portrait: $('#portrait'),
            show: $('#profilePortrait, #profilePortraitAlias')
        });

		
		$(".delete_btn").on('click', function() {
			var _this = $(this);
			$.maskUI.confirm({
				msg: '确定要删除吗?',
				callback: function(){
					$.ajax({
						url : "/usercenter/content/delete.json",
						type : "POST",
						dataType : "json",
						data : "id=" + _this.data("content-id") + "&token=" + $("#token").val(),
						success : function(result) {
							if (result.rescode == 1) {
								$("#content_" + _this.data("content-id")).remove();
							}
							else {
								var html = '<h3>删除失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>'
								$.maskUI.open({
									content: html
								});
							}
						}
					});
				}
			});
			
			return false;
		});
		
		$(".delete_index_btn").on('click', function() {
			var _this = $(this);
			$.maskUI.confirm({
				msg: '确定要删除吗?',
				callback: function(){
					$.ajax({
						url : "/usercenter/content/index/delete.json",
						type : "POST",
						dataType : "json",
						data : "id=" + _this.data("content-id") + "&token=" + $("#token").val(),
						success : function(result) {
							if (result.rescode == 1) {
								$("#content_" + _this.data("content-id")).remove();
							}
							else {
								var html = '<h3>操作失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>'
								$.maskUI.open({
									content: html
								});
							}
						}});
				}
			});
			return false;
		});
		
	});
});