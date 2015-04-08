require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});


require(['c/auth_dialog', 'c/widgets'],function(){
	$(function(){
		var qList=$('#q_list');
		qList.on('click','dl a',function(){
			var _t=$(this),
					ulObj=_t.closest('ul'),
					liObj=_t.closest('li'),
					num=parseInt(liObj.data('num')),
					w=700;
			var dataVal=_t.data('val');
			liObj.find('input:hidden').val(dataVal);					
			if(num<5){
				ulObj.animate({
					"margin-left":-w*(num)
				});
			}else if(num==5){
				$('form').submit();
			}
		})
		qList.on('click','.prev',function(){
			var _t=$(this),
					ulObj=_t.closest('ul'),
					liObj=_t.closest('li'),
					num=parseInt(liObj.data('num')),
					w=700;
			ulObj.animate({
				"margin-left":-w*(num-2)
			});
		})		
	});
});