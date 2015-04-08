require.config({
  baseUrl: '../js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/widgets'], function () {
	$(function(){
		var form=$('#createAccountForm');
		$('.account_step [data-step="step_1"]').on('click','li',function(){
			var _t=$(this);
			_t.siblings('.check_on').removeClass('check_on');
			_t.toggleClass('check_on');
			$('[name=order_id]',form).val(_t.data('hidorderid'));
			$('[name=job_id]',form).val(_t.data('hidjobid'));
			$('[name=define_job_id]',form).val(_t.data('hiddefinejobid'));
		});

		$('.account_step [data-step="step_2"]').on('click','li',function(){
			var _t=$(this);
			_t.toggleClass('check_on');
			//var hid=_t.find('input:hidden');
			//hid.val(_t.data('hidtoolid'));
			var cBox=_t.find('input:checkbox');
			if(cBox.attr('checked')=='checked'){
				cBox.removeAttr('checked');
			}else{
				cBox.attr('checked','checked');
			}

		});
		$('#cNav_tab').on('click','li',function(){
			var _t=$(this);
			_t.siblings('.current').removeClass('current');
			_t.addClass('current');
			var _index=_t.index();
			$('div[data-type^="main_"').hide();
			$('div[data-type="main_'+_index+'"]').show();
		});
		$('[data-type=sbm]',form).on('click',function(){
			var flag=true;
			var order_id=$('[name="order_id"]',form);
			if(order_id.val()==''){
				$.maskUI.alert('请选择测评岗位');
				flag=false;
				return false;
			}
			var target_tool=$('[name="target_tool[]"]:checked',form);
			if(target_tool.length==0){
				$.maskUI.alert('请添加测评工具');
				flag=false;
				return false;				
			}
			var account_total=$('[name="account_total"]',form);
			var atVal=$.trim(account_total.val());
			var reg = /^(0|([1-9]\d*))$/;
			if(atVal==''){
				$.maskUI.alert('请输入测量数量');
				flag=false;
				return false;		
			}else{
				if(!reg.test(atVal)){
					$.maskUI.alert('测评数量必须输入[整数]');
					flag=false;
					return false;
				}
			}
			if(flag){
				form.submit();
			}
		});
	})
});