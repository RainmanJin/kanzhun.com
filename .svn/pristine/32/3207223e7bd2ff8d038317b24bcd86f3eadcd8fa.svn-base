$(function(){
  $(".js_selectPeople").on("click","li a",function(){
    var li=$(this).parent();
    var index=li.index();
    li.siblings().toggleClass("on","");
    li.addClass("on");
    $(".js_tipForm").hide();
    $(".js_tipForm").eq(index).show();
  })
  $(".js_tips").on("click","li a",function(){
    var li=$(this).parent();
    li.siblings(".on").removeClass("on");
    li.addClass("on");

    var form=$(this).closest(".js_tipForm form");
    var text=form.find("[type=text]");
    text.parent().removeClass("err");
    form.find("[name=tag]").val($(this).html());
  })
  $(".js_tips").on("focus","li input",function(){
    var li=$(this).parent().parent();
    li.siblings(".on").removeClass("on");

    var form=$(this).closest(".js_tipForm form");
    var text=form.find("[type=text]");
    text.parent().removeClass("err");
    form.find("[name=tag]").val("");
  })
  $(".js_submit").on("click",function(){
    var form=$(this).closest(".js_tipForm form");
    var text=form.find("[type=text]");
    var sText=$.trim(text.val());

    var sTag=form.find("[name=tag]").val();
    if(sTag==""){
      if(sText==""){
        text.parent().addClass("err");
      }else{
        text.parent().removeClass("err");
        form.find("[name=tag]").val(sText);
        form.submit();
      }
    }else{
      form.submit();
    }

  })
});