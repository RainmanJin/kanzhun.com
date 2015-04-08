$(function(){
  function gopage(pagenum){
    $("#pageHidden").val(pagenum);
    $('#searchForm').submit();
  }
  window.gopage=gopage;
  $(".js_jobreject").on("click",function(){
    if(confirm("确定要驳回么")){
      var url=$(this).attr("data-url");
      $.ajax({
        url:url,
        //type:"post",
        dataType:"json",
        success:function(result){
          if(result.rescode==1){
            location.reload();
          }else{
            alert(result.resmsg);
          }
        }
      });
    }
  });
  $(".js_freeze").on("click",function(){
    var msg=$(this).data("msg");
    if(confirm(msg)){
      var url=$(this).attr("data-url");
      $.ajax({
        url:url,
        //type:"post",
        dataType:"json",
        success:function(result){
          if(result.rescode==1){
            location.reload();
          }else{
            alert(result.resmsg);
          }
        }
      });
    }
  });
});













