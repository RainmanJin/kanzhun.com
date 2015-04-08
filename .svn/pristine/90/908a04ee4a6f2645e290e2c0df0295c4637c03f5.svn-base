$(function(){
  $.fn.ajaxForm = function(opts){
    var o = $.extend({
      //selector: 'input:text, input:hidden, textarea, select, input:radio, input:checkbox'
    }, opts);

    var form = $(this);

    form.on('submit', function(e){
      e.preventDefault();
      e.stopPropagation();

      var components = form.find(o.selector).filter(function(){
        return !!$(this).attr('name');
      });

      if(components.length == 0){ return false; }

      if(o.validate){
        if(!o.validate.call(form, components)){
          return false;
        }
      }

      $.ajax({
        type: (form.attr('method')||'get').toUpperCase(),
        url: form.attr('action'),
        //data: $.param(components),
        //增加data 扩展方法
        data: $.param(components) + (o.data ? o.data() : ''),
        dataType: o.dataType || 'json',
        beforeSend: function(){
          if(o.beforeSend){
            o.beforeSend.call(form, components);
          }
        },
        success: function(ret){
          if(o.success){
            o.success.call(form, ret, components);
          }
        },
        error: function(){
          if(o.error){
            o.error.call(form, components);
          }
        }
      });


      return false;
    });
  }


  $('#addText').on('click', function(){
    var len = $('input[name=content]').length;
    if(len < 5){
      if(len === 4){
        $(this).before('<input type="text" name="content" placeholder="弹出文字'+ (len + 1) +'" maxlength="20">')
        $(this).remove();
      }else{
        $(this).before('<input type="text" name="content" placeholder="弹出文字'+ (len + 1) +'" maxlength="20"><p class="line"></p>')
      }
    }
  });

  var title = $('input[name=title]');
  $('#recursionForm').ajaxForm({
    selector: 'input[type=text], select',
    validate: function(components){
      if($.trim(title.val()) === ''){
        alert('填写一个吸引人的标题，吸引TA上钩！');
        title.focus();
        return false;
      }

      var bool = false;
      $('input[name=content]').each(function(i, v){
        if($.trim(v.value) !== ''){
          bool = true;
          return false;
        }
      });

      if(!bool){
        alert('至少填一条文字吧！');
        $('input[name=content]').eq(0).focus();
        return false;
      }

      return true;
    },
    success: function(ret, components){
      if(ret && ret.rescode == 1){
        $('div.share-to-wx').show();
        if(shareTitle && descContent){
          shareTitle = descContent = title.val();
        }

        if(lineLink){
          lineLink = 'http://wx.kanzhun.com/activity/tt/index/?id=' + ret.id;
        }
      }else{
        alert('提交失败！');
      }
    },

    error: function(){
      alert('提交失败！');
    }
  });

  document.querySelector('div.share-to-wx').addEventListener('click', function(){
    this.style.display = 'none';
    document.querySelector('#recursionForm').reset();
  }, false)
});