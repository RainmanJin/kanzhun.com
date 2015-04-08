require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts',
    v2: 'v2/js'
  }
});


require(['c/auth_dialog','comp/auth/auth'], function(auth_dialog){
  $(function(){
    var ugcSucRedirect = $('div.ugc-suc-redirect button'),
      countdown = 5;
    if(ugcSucRedirect.length){
      setInterval(function(){
        if(countdown == 1){
          window.location.href = ugcSucRedirect.val();
        }else{
          countdown --
          ugcSucRedirect.html(countdown);
        }
      }, 1000);
    }

    var $loginDiv=$('#loginDiv'),
        $regDiv=$('#regDiv');
    $loginDiv.on('click','.jump',function(e){
      e.preventDefault();
      $loginDiv.addClass('none');
      $regDiv.removeClass('none');
    });
    $regDiv.on('click','.jump',function(e){
      e.preventDefault();
      $regDiv.addClass('none');
      $loginDiv.removeClass('none');
    });
  });
});