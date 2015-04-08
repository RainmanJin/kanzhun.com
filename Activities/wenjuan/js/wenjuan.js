$(function(){
	var oForm=$("#wjForm");
	//校验
	function validate(){
		var flag=true;
		$("input[type=radio],input[type=checkbox],.v").each(function(){
			var _t=$(this);
			var type=_t.attr("type");
			var dl=_t.closest("dl");
			switch(type){
				case "radio":
					var len=dl.find("[type="+type+"]:checked").length;
					if(len>0){
						dl.find("dt .err").html("");
						flag=true;
					}else{
						dl.find("dt .err").html("请选择选项");
						$(window).scrollTop(dl.offset().top - 30);
						flag=false;
						return false;
					}
					break;
				case "checkbox":
					var len=dl.find("[type="+type+"]:checked").length;
					if(len>0){
						dl.find("dt .err").html("");
						flag=true;
					}else{
						dl.find("dt .err").html("请选择选项");
						$(window).scrollTop(dl.offset().top - 30);
						flag=false;
						return false;
					}
					break;
				default:
					var val=$.trim(_t.val());
					if(val==""){
						dl.find("dt .err").html("请输入内容");
						$(window).scrollTop(dl.offset().top - 30);
						flag=false;
						return false;
					}else{
						dl.find("dt .err").html("");
						flag=true;
					}
			}
		});
		return flag;
	}
	function bind(){
		//单选框事件绑定
		oForm.on("click",".radio",function(){
			var _t=$(this);
			var dd=_t.closest("dd");
			var dl=dd.parent();
			dd.siblings().find(".on").removeClass("on");
			dd.find(".radio").addClass("on");
			
			dd.find("[type=radio]").prop("checked",true);
			dl.find("dt .err").html("");
		});
		//多选框事件绑定
		oForm.on("click",".checkbox",function(){
			var _t=$(this);
			var dd=_t.closest("dd");
			var dl=dd.parent();
			dd.find(".checkbox").toggleClass("on");

			dd.find("[type=checkbox]").prop("checked",true);
			dl.find("dt .err").html("");
		});
		oForm.on("focus",".v",function(){
			var _t=$(this);
			var dl=_t.closest("dl");
			dl.find("dt .err").html("");
		});
		//提交
		oForm.on("click",".js_bt_submit",function(){
			var flag=true;
			flag=validate();
			if(flag){
				oForm.submit();
			}
		})
	}
	function init(){
		bind();
	}
	init();
});