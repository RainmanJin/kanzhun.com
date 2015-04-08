require.config({
  baseUrl: '../js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/widgets'], function () {
	$(function(){
		$('.select[data-type=select_product]').DIYSelect({
			listCallback: function (l, field, select) {
				var _t=$(this),
						productid=_t.data('val'),
						exam_part_id=_t.data('ids');
	    	$.ajax({
	    		url:'?_a=ajax_report_manage_time_choose1',
	    		type:'post',
	    		data:{
	    			productid:productid
						//exam_part_id:exam_part_id
	    		},
	    		success:function(result){
	    			$('.select[data-type=select_time]').html(result);
	    		}
	    	});
	    }
		});
		$('.select[data-type=select_time]').DIYSelect();
		$('[data-type="account_info"]').on('click',function(){
			var _t=$(this);
			var account_info_id=_t.data('account-id');
			$.ajax({
				url:'?_a=ajax_report_manage_account_info',
				type:'post',
				data:{
					account_info_id:account_info_id
				},
				success:function(result){
					$.maskUI.open({
						elem: $(result),
						destroy: true
					});
				}
			});
		})
		var product_id=$('[name="product_id"]').val();
		$('.select[data-type="select_product"] dd a[data-val='+product_id+']').trigger('click');
  });
});