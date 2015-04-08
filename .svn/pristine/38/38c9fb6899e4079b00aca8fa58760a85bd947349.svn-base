require.config({
  baseUrl: '../js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/widgets'], function () {
	$(function(){
		$('.select').DIYSelect();

		$('.tempUl .hover').hover(function(){
		var _t=$(this);   	
					url=_t.data('url'),
					tips=_t.find('.tips .p1');
			$.ajax({
				url:url,
				success:function(result){
					tips.html(result);
				}
			});
		});

		$('.tempUl li>span').on('click',function(){
			var _t=$(this),
					ipt=_t.siblings('input:checkbox');
			ipt.trigger('click');		
		});

		$('#form1').on('click','input:submit',function(){
			var form=$('#form1'),
					flag=true;

			var jobId=$('[name="job_id"]',form);
			if(jobId.val()==''){
				$.maskUI.alert(jobId.data('msg'));
				flag=false;
				return false;
			}
			var defineName=$('[name="define_name"]',form);
			if($.trim(defineName.val())==''){
				$.maskUI.alert(defineName.data('msg'));
				flag=false;
				return false;
			}
			var dimChoiceLen_1=$('[name="dim_choice[]"]:checked','#tempUl_1').length;
			if(dimChoiceLen_1!=4){
				$.maskUI.alert('请选择 4 个人格测试纬度');
				flag=false;
				return false;
			}
			var dimChoiceLen_2=$('[name="dim_choice[]"]:checked','#tempUl_2').length;
			if(dimChoiceLen_2!=2){
				$.maskUI.alert('请选择 2 个能力测试纬度');
				flag=false;
				return false;
			}
			return flag;
		})
  });
});