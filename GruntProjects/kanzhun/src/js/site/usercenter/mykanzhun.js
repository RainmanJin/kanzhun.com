require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});
require(['c/auth_dialog', 'c/widgets', 'u/upload_portrait', 'c/job_searcher', 'c/mini_search'], function(auth_dialog, widget, upload_portrait, jobSearcher) {
	$(function() {
		//upload portrait
        upload_portrait({
            elems: $('#profilePortraitBtn'),
            portrait: $('#portrait'),
            show: $('#profilePortrait, #profilePortraitAlias')
        });

//		$.maskUI.config = {
//			wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
//			alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
//			confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
//		};
//
		$(".collection_send_type").on(
				'click',
				function(e) {
					$.ajax({
						url : "/usercenter/jobcollection/update.json",
						type : "POST",
						dataType : "json",
						data : "id=" + $(this).data("collection-id") + "&type=" + $(this).val() + "&token=" + $("#token").val(),
						success : function(result) {
							if (result.rescode != 1) {
								var html = '<h3>更新失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
								$.maskUI.open({
									content: html
								});
							}
						}
					});
				});

		$(".collection_delete_btn").on('click', function() {
			var _this = $(this);
			$.maskUI.confirm({
				msg: '确定要删除吗?',
				callback: function(){
					$.ajax({
						url : "/usercenter/jobcollection/delete.json",
						type : "POST",
						dataType : "json",
						data : "id=" + _this.data("collection-id") + "&token=" + $("#token").val(),
						success : function(result) {
							if (result.rescode == 1) {
								$("#collection_" + _this.data("collection-id")).remove();
							}
							else {
								var html = '<h3>删除失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
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
		
		$("#job_searcher_table").on(
				'click', 'input.searcher_send_type',
				function(e) {
					$.ajax({
						url : "/usercenter/jobsearcher/update.json",
						type : "POST",
						dataType : "json",
						data : "id=" + $(this).data("searcher-id") + "&type=" + $(this).val() + "&token=" + $("#token").val(),
						success : function(result) {
							if (result.rescode != 1) {
								var html = '<h3>更新失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
								$.maskUI.open({
									content: html
								});
							}
						}
					});
				});

		$("#job_searcher_table").on('click', 'a.searcher_delete_btn' , function(e) {
			e.preventDefault();
			var _this = $(this);
			$.maskUI.confirm({
				msg: '确定要删除吗?',
				callback: function(){
					$.ajax({
						url : "/usercenter/jobsearcher/delete.json",
						type : "POST",
						dataType : "json",
						data : "id=" + _this.data("searcher-id") + "&token=" + $("#token").val(),
						success : function(result) {
							if (result.rescode == 1) {
								$("#searcher_" + _this.data("searcher-id")).remove();
							}
							else {
								var html = '<h3>删除失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
								$.maskUI.open({
									content: html
								});
							}
						}
					});
				}
			});

		//编辑
		}).on('click', 'a.searcher_edit_btn', function(e){
			e.preventDefault();
			jobSearcher.create($(this).data('searcher-id'));
		});
		
		
		$("#city").autocomplete({
			serviceUrl:'/autocomplete/city.json'
		});
		
		$("#position").autocomplete({
			serviceUrl:'/autocomplete/job.json'
		});
		
		
		$('.follow_btn').on('click',  function(e){
			e.preventDefault();
			var self = $(this);
			var action = $(this).data('action');
			var cid = $(this).data('cid');
			var requestUrl = "/user/follow.json";
			if(action =="unfollow") {
				requestUrl = "/user/cancelfollow.json";
			}
			$.ajax({
				type: 'POST',
				url: requestUrl,
				data:"companyId=" + cid,
				dataType: 'json',
				success: function(ret){
					if(ret && ret.rescode == '1'){
						if("follow" == action){
							self.data('action','unfollow');
							self.html('<em class="ok"></em> 已关注');
						}else if("unfollow" == action){
							self.data('action','follow');
							self.html('<b>+</b> 关注');
						}
					}
				}
			});
		});
		

		$('#create_searcher_form').ajaxForm({
			selector : 'input:text,input:hidden',
			validate : function() {
				
				//验证字段
				var position= this.find('input[name=position]').val();
				if(position == null || position==""){
					var html = '<h3>错误</h3><p class="center_p"><i class="err_p"></i>请输入职位名称</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
					$.maskUI.open({
						content: html
					});
					return false;
				}
				
				var city = this.find(
				'input[name=city]').val();
				if(city == null || city ==""){
					var html = '<h3>错误</h3><p class="center_p"><i class="err_p"></i>请输入城市信息</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
						$.maskUI.open({
							content: html
						});
					return false;
				}
				
				
				return true;
			},
			success : function(ret) {
				if(ret.rescode == 1) {
					$("#job_searcher_div").show();
					$("#job_searcher_table_title").after(ret.html);
					$('#create_searcher_form')[0].reset();
				}
				else {
					var html = '<h3>错误</h3><p class="center_p"><i class="err_p"></i>' + ret.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
						$.maskUI.open({
							content: html
						});
				}
			}
		});

		jobSearcher.init();
	});
});