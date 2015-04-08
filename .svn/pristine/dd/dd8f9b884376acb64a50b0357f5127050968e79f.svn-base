require.config({
  baseUrl: '../js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/widgets'], function () {
	$(function(){
		function getTimeSelect(productid,exam_id){
			$.ajax({
				url:'?_a=ajax_account_list_time_choose',
				type:'post',
				data:{
					productid:productid,
					exam_id:exam_id
				},
				success:function(result){
					$('.select[data-type=select_time]').html(result);
				}
			});
		}

		$('.select[data-type=select_product]').DIYSelect({
			listCallback: function (l, field, select) {
				var _t=$(this),
						productid=_t.data('val'),
						exam_id=_t.data('exam-id');
				getTimeSelect(productid,exam_id);
	    }
		});
		$('.select[data-type=select_time]').DIYSelect();

		$('#chkall').on('click',function(){
			var _t=$(this);
			var form=$('#export_chose_form');

			form.find('input:checkbox').each(function(k,v){
				v.checked=_t.is(':checked');
			});
			/*
			if(_t.is(':checked')){
				form.find('input:checkbox').attr('checked',true);
			}else{
				form.find('input:checkbox').attr('checked',false);
			}
			*/
		});

		var product_id=$('[name="product_id"]').val();
		$('.select[data-type="select_product"] dd a[data-val='+product_id+']').trigger('click');
  });
});