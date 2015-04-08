require.config({
  baseUrl: 'js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/widgets'], function () {
	$(function(){
		$('.orange_enter').on('click',function(){
			var html=''+
			'<section class="maskui_dialog dialog" style="display:block;">'+
				'<div class="dialog_con">'+
					'<a href="javascript:;" class="dialog_close maskuiclose"></a>'+
					'<h3><span>账户信息</span></h3>'+
					'<div class="dc_content">'+
						'<p class="p1">如果您对我们的专业评测感兴趣，欢迎您留下邮箱，或者发送邮件给 <em>liuna@kanzhun.com</em>，我们会在2-3个工作日主动与您联系。</p>'+
						'<div class="mt15">'+
							'<input class="ipt mr10" name="email" style="width: 200px" type="text" placeholder="请输入您的邮箱"><a class="dialog_btn" data-type="sbm" href="javascript:;">提交</a>'+
							'<p class="err red" style="display: none">请输入正确格式的邮箱！</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</section>';
			$.maskUI.open({
				elem: $(html),
				destroy: true
			});

			$('.dialog').on('click','[data-type="sbm"]',function(){
				var oEmail=$('[name="email"]');
				var email= $.trim(oEmail.val());
				var reg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
				if(reg.test(email)){
					oEmail.siblings('.err').hide();
					createEmailResultDialog();
					$.ajax({
						url:"corpadmin/join.php",
						data:{
							email:email
						}
					});
				}else{
					oEmail.siblings('.err').show();
				}
			})
		})

		function createEmailResultDialog(){
			var h=''+
			'<section class="maskui_dialog dialog" style="display:block;">'+
				'<div class="dialog_con">'+
					'<a href="javascript:;" class="dialog_close maskuiclose"></a>'+
					'<h3><span>加入我们</span></h3>'+
					'<div class="dc_content">'+
						'<p class="t-center"><i class="i i_hook"></i> 提交成功！</p>'+
						'<p class="t-center mt5">请您耐心等待，我们会尽快与您联系！</p>'+
						'<div class="t-center mt10">'+
						'<a class="dialog_btn maskui_close" href="javascript:;">确定</a>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</section>';
			$.maskUI.open({
				elem: $(h),
				destroy: true
			});
		}
  });
});