

$(function(){
	function initPhoneList(){
		var index=0;
				listInner=$('#phoneList .inner'),
				list=listInner.find('ul'),
				count=list.find('li').length,
				cloneList=list.clone();
		listInner.append(cloneList);
		setInterval(function(){
			if(index==count){
				index=0;
				listInner.css({'margin-top':0});
			}
			index++;
			listInner.animate({'margin-top':-(41*index)});
		},2000);
	}
	$('[action-type="sbm"]').on('click',function(){
		var _t=$(this),
				form=_t.closest('form'),
				phone=$('[data-type=phone]',form).val(),
				openId=$('[name=openId]',form).val();
		if((/^1\d{10}$/).test(phone)){
			$.ajax({
				url:'/activity/car/check.json',
				data:{
					openId:openId
				},
				dataType:'json',
				success:function(res){
					var res=res.rescode;
					if(res==1){
						form.submit();
					}else{
						alert('您已经领取过洗车券了');
					}
				}
			});			
		}else{
			alert('请输入正确的手机号');
		}
	})
	initPhoneList();
})