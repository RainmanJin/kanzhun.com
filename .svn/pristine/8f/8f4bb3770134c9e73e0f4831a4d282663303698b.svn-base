require.config({
  urlArgs: "v=1.0.1",
  baseUrl: '/js',
  paths: {
    jquery: 'utils/jquery-1.11.0.min',
    u: 'utils',
    s: 'site'
  }
});

require(['jquery', 'u/upload_portrait','s/widgets'], function($, upload_portrait){
  $(function(){

    upload_portrait({
      elems: $('#rsmPortrait a'),
      portrait: $('#portrait'),
      show: $('#profilePortrait, #profilePortraitAlias'),
    });

    $('.modifyhead a').hover(function(){
      $('em#modifybg').css('opacity','0.5');
    },function(){
      $('em#modifybg').css('opacity','0.35');
    })
    
    
  //职位类型 3级导航
    $('#industry_selecte').DIYSelect({
      listSelector: 'div>a',
      listCallback: function(list, field, target){
        $(this).parent().css({'visibility':'hidden'}).parent().css('z-index', '');
        $('input:hidden',field.parent()).val($(this).data('val')).parent().parent().parent().find('>.err').hide();
      },
      showCallback: function(list, field, target){
        target.addClass('select_light');
      },
      hideCallback: function(list, field, target){
        target.removeClass('select_light');
      }
    });

    var levelOne = $('#industry_selecte li'),
      levelTwo = $('#jobMenu div');
    $('#industry_selecte').on('click', 'dd', function(e){
      levelTwo.css('visibility', 'hidden');
      e.preventDefault();
      e.stopPropagation();
    }).on('click', 'li>a', function(e){
      e.stopPropagation();
      var self = $(this);
      //visibility & z-index used to fix IE7
      levelOne.css({'z-index': ''});
      self.parent().css('z-index', '3');
      levelTwo.css({'visibility': 'hidden'});
      self.next('div').css('visibility', 'visible');
    });



    function selectCheck(){
      if($.trim(this.value) === ''){
        return false;
      }else{
        return true;
      }
    }
    
    
    //submit form
    var v = $('#baseForm').validatorAll({
      elems: 'input:text',
      prompt: {
        succ: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('>.err', target.parent());
          }
          err.hide();
        },
        err: function(target, msg, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('.err', target.parent());
          }
          err.html(msg || err.data('msg')).show();
        },
        normal: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('.err', target.parent());
          }
          err.hide();
        }
      },
      
      more: {
    	position: function(){
          if($.trim(this.value) === ''){
            return false;
          }else{
            return true;
          }
        }
      }
    });

    v.init().submit();

    $('input:text, textarea', v.form).on('focus', function(){
      $(this).addClass('light');
    }).on('blur', function(){
      $(this).removeClass('light');
    });

    $('dl#industry_selecte').DIYSelect({
      listCallback: function(list, field, target){
        $('input:hidden',field.parent()).val($(this).data('val')).parent().parent().parent().find('>.err').hide();
      },
      showCallback: function(list, field, target){
        target.addClass('select_light');
      },
      hideCallback: function(list, field, target){
        target.removeClass('select_light');
      }
    });
  });
});




