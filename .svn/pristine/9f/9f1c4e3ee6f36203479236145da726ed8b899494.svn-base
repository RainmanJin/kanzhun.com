require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.',
    comp: '../../components'
  }
});
require(['c/widgets'], function () {
  $(function () {

    var spanCountDown = $('#countdown'),
      countdown = 5;
      setInterval(function(){
        if(countdown == 1){
          if($('body').data('isopener')=='1'){
            window.opener.thirdpartyCallback();
            window.opener=null;
            window.close();
          }else{
            window.location.href = spanCountDown.data('redirect');
          }
        }else{
          countdown--;
          spanCountDown.html(countdown);
        }
      }, 1000);
  });
});