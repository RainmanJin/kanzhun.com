require.config({
  urlArgs: "v=1.0.1",
  baseUrl: '/js',
  paths: {
    jquery: 'utils/jquery-1.11.0.min',
    u: 'utils',
    s: 'site'
  }
});

require(['jquery', 's/widgets'], function($){
  $(function(){

    $('dl.select').DIYSelect({
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
    //submit form
    var v = $('#eduForm').validatorAll({
      elems: 'input:text, input:hidden',
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
        degree: function(){
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

    //tab切换
    $('#tabugcr').tabs({
      tabSelector: 'div.tabnav a',
      current: 'current',
      tabPanel: 'div.basicinfo',
      callback: function(index, basicinfo){
          if($.support.css3Property('transition')){
              this.parent().css({'background-position': 184 * index + 'px bottom'});
          }else{
              this.parent().animate({'background-position-x': 184 * index}, 200);
          }
        },
        animate: 'fadeIn'
    });

  //获得href中的值
    var svalue = window.location.search.match( new RegExp( "[\?\&]aid=([^\&]*)(\&?)", "i" ) ); 
    var aid = svalue ? svalue[1] : svalue;   
    $('#tabugcr div.tabnav p').css({'background-position': 184 * aid + 'px bottom'});
    if(aid == 0){
      $('div.basicinfo').hide();
      $('div#addinfo').show();
    }else{
      $('div.basicinfo').hide();
      $('div#addedu').show();
    }
  });
});




