/**
 * Created by zcy on 2015/3/28.
 */
$(function(){
	/*$("#prize").on("change",function(){
		var index = $("#prize option:selected").index();
		$(".items").eq(index).addClass("actived").siblings(".items").removeClass("actived").find("input[type=checkbox]").removeAttr("checked")
	});*/

	$('#prize').on('click',function(){
		var reasonDialog=$('section.reason_dialog');
		$.maskUI.open({
			elem:reasonDialog
		});
		reasonDialog.one('click','li',function(){
			var _t=$(this);
			var index = _t.index();
			$("#prizeId").val(index + 1);

			$('#prize').html(_t.find('.h2').html()).val(_t.data('val'));
			$.maskUI.close();

			$(".items").eq(index).addClass("actived").siblings(".items").removeClass("actived").find("input[type=checkbox]").removeAttr("checked")

		});

	});

	$(".next").on("click",function(){


		var length = $(".center-wrap input:checkbox:checked").length;

		if(length < 1){
			alert("请选择至少一条提名理由!")
			return false;
		}

	});

	$("#protocol").on("click",function(){

		console.log($(this).is(":checked"))

		if($(this).is(":checked")){

			$(".next").attr("disabled",false).removeClass("disabled");
		}else{

			$(".next").attr("disabled",true).addClass("disabled");
		}
	});




});