$(function(){$("#prize").on("click",function(){var a=$("section.reason_dialog");$.maskUI.open({elem:a}),a.one("click","li",function(){var a=$(this),b=a.index();$("#prizeId").val(b+1),$("#prize").html(a.find(".h2").html()).val(a.data("val")),$.maskUI.close(),$(".items").eq(b).addClass("actived").siblings(".items").removeClass("actived").find("input[type=checkbox]").removeAttr("checked")})}),$(".next").on("click",function(){var a=$(".center-wrap input:checkbox:checked").length;return 1>a?(alert("请选择至少一条提名理由!"),!1):void 0}),$("#protocol").on("click",function(){console.log($(this).is(":checked")),$(this).is(":checked")?$(".next").attr("disabled",!1).removeClass("disabled"):$(".next").attr("disabled",!0).addClass("disabled")})});