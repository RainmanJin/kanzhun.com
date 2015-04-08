

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
	$('#sfSubmit').on('click',function(){
		var _t=$(this),
				form=_t.closest('form'),
				phone=$('input[name=phone]',form).val(),
				openId=$('input[name=openId]',form).val();
		if(!(/^1\d{10}$/).test(phone)){
			alert('请输入正确的手机号！');
      return false;
		}

    if($('input[name=type]').val() === ''){
      alert('请选择优惠券类型！');
      return false;
    }

    form.submit();
	});

  $('#sfType').on('click', 'button', function(){
    $(this).addClass('active').siblings('button').removeClass('active').siblings('input[type=hidden]').val($(this).val());
  });

  $('div.sf-mask').on('click', function(){
    $(this).addClass('hidden');
  });
	initPhoneList();
})