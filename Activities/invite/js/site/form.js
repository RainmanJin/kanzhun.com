$(function(){$("#submit1").on("click",function(){var a=!1;$("ul.data input").each(function(b,c){return $("ul.data input").removeClass("error"),""==$.trim($(c).val())&&0==b?($("#feedback").html("* 嘉宾姓名不能为空!"),$(c).addClass("error"),a=!0,!1):""==$.trim($(c).val())&&1==b?($("#feedback").html("* 企业名称不能为空!"),$(c).addClass("error"),a=!0,!1):""==$.trim($(c).val())&&2==b?($(c).addClass("error"),$("#feedback").html("* 嘉宾职位不能为空!"),a=!0,!1):""==$.trim($(c).val())&&3==b?($(c).addClass("error"),$("#feedback").html("* 联系方式不能为空!"),a=!0,!1):void 0}),a||($("#feedback").html(""),alert("报名成功!"),$("#form1").submit())})});