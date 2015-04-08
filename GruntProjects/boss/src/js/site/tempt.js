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
    $.maskUI.config = {
      wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
      alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
      confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
    };

    $(".chat_fild").on('keyup', function (e) {
      e.stopPropagation();
      var remain = this.value.length - 1000;
      if (remain <= 0) {
        $(".attention").html('您还可以输入<strong class="ok">' + Math.abs(remain) + '</strong>字');
      } else {
        $(".attention").html('您已超出输入<strong class="err">' + remain + '</strong>字');
      }
    });
    //submit form
    var v = $('#temptForm').validatorAll({
      elems: 'input:hidden, textarea',
      prompt: {
        succ: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('>.err', target.parent());
          }
          $('>.attention', target.parent()).show();
          err.hide();
        },
        err: function(target, msg, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('.err', target.parent());
          }
          $('>.attention', target.parent()).hide();
          err.html(msg || err.data('msg')).show();
        },
        normal: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('.err', target.parent());
          }
          $('>.attention', target.parent()).show();
          err.hide();
        }
      },

      more: {
        lureContent: function(){
          if($(this).val().length > 1000){
            return false;
          }else{
            return true;
          }
        }
      }
    });

    v.init().submit();


    //input highlight on focus
    $('input:text, textarea', v.form).on('focus', function(){
      $(this).addClass('light');
    }).on('blur', function(){
      $(this).removeClass('light');
    });

    //add Temptations
    var addTemptationsField = $('#addTemptationsField'),
      temptationsList = $('#temptationsList');

    var addTemptationFn = function(val){
       if(temptationsList.find('a').length > 4){
         $.maskUI.alert('最多只能选择5个关键字！');
         return;
       }
       temptationsList.append('<a href="javascript:;" class="keyword">'+ val +'<input name="lureKeywords" type="hidden"  value="'+ val +'" ><i></i></a>');
    };
    addTemptationsField.on('keyup', function(){
      $(this).val(this.value.replace(/[^0-9a-zA-Z\u4e00-\u9faf\s]/g, ''));
    });
    $('#addTemptations').on('click', function(){
      var val = $.trim(addTemptationsField.val());
      if(val === ''){
        addTemptationsField.val('').focus();
        return;
      }else{
        addTemptationFn(val.replace(/[^0-9a-zA-Z\u4e00-\u9faf\s]/g, ''));
        addTemptationsField.val('').focus();
      }
    });

    $('ul.keywords').on('click', 'span', function(){
      addTemptationFn($(this).html());
    });

    //del
    temptationsList.on('click', 'i', function(){
      var self = $(this),
          id = self.data('val');
      if(id){
        $.getJSON('/user/deleteKeyword.json?keywordId=' + id, function(ret){
          if(ret && ret.rescode == 1){
            self.parent().remove();
          }
        });
      }else{
        $(this).parent().remove();
      }
    });
  });
});




