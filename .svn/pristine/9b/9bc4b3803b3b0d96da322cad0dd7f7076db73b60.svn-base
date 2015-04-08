$(function(){
  var steps = $('div.steps section');
  var step = 0;
  var infos = $('input[type=text]');
  $('div.wrapper').on('click', 'button', function(){
    var current = infos.eq(step);

    if($.trim(current.val()) === ''){
      current.addClass('shine').one('animationEnd webkitAnimationEnd', function(){
        current.removeClass('shine').focus();
      });
      return;
    }
    if(step < 2){
      steps.eq(step).hide();
      step ++ ;
      steps.eq(step).show();
    }else{
      $('#keywordForm').submit();
    }
  });
});