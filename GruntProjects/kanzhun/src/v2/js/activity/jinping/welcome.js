require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});
require(['c/widgets'], function () {
  $(function () {
    //倒计时
    $.fn.countdown=function(params){
      var o=$.extend({
        endCallback:null
      },params);
      var _t=(this);
      var cSeconds=_t.data('leavetime')||60*60*24*10;
      var ivId=setInterval(function(){
        cSeconds--;
        if(cSeconds==0){
          clearInterval(ivId);
          if(o.endCallback){
            o.endCallback();
          }
        }
        formartTime.call(_t);
      },1000);
      function formartTime(){
        var _t=$(this);
        var _seconds=cSeconds;
        var sec=_seconds% 60,
          min=Math.floor(_seconds / 60) % 60,
          hour= Math.floor(_seconds/ 60 / 60) % 24,
          day=Math.floor(_seconds/ 60 / 60 / 24);
        sec=sec<10?'0'+sec:sec;
        min=min<10?'0'+min:min;
        hour=hour<10?'0'+hour:hour;
        day=day<10?'0'+day:day;
        var h=''+
          '<em>'+day+'<i class="i_line"></i></em><span>天</span>'+
          '<em>'+hour+'<i class="i_line"></i></em><span>时</span>'+
          '<em>'+min+'<i class="i_line"></i></em><span>分</span>'+
          '<em>'+sec+'<i class="i_line"></i></em><span>秒</span>';
        _t.html(h);
      }
    };
    $('#slipTime').countdown({
      endCallback:function(){
        //location.reload();
      }
    });



    $("#email").bind("focus",function(){
        $(this).removeClass();
        $("span.tip").html("");
    });

    $("#btnBook").bind("click",function(){
          var email = $.trim($("#email").val());
          var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

          if(email.length < 1){
             $("#email").addClass("error");
             $(".tip").html("* 邮箱不能为空!");
              return false;
          }else if(!(reg.test(email))){
            $("#email").addClass("error");
            $(".tip").html("* 邮箱格式不正确!");
          }else{
            $.get("/activity/blacklist/sub.json?email="+email,function(data){
              if(data.rescode == 1){
                $.maskUI.alert("订阅成功!");
              }else{
                $.maskUI.alert("订阅失败!");
              }
            });
          }
    });
  });
});