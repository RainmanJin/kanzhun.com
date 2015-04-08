require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});


require(['c/auth_dialog', 'c/widgets'],function(){
  $(function(){
    var field = $('textarea[name=content]');
    var errPrompt = $('#slicePrompt');

    field.on('keyup', function(){
      var remain = $.trim(this.value).length - 140;
      if (remain <= 0) {
        errPrompt.html('您还可以输入<strong class="orange">' + Math.abs(remain) + '</strong>字');
      } else {
        errPrompt.html('您已超出输入<strong class="red">' + remain + '</strong>字');
      }
    });

    $('#nextStep').on('click', function(){
      var val = $.trim(field.val()),
        button = $(this);

      if(val === '' || val.length > 140){
        field.addClass('shine').one('animationend webkitAnimationEnd', function(){
          $(this).removeClass('shine');
        });
        return;
      }

      $.maskUI.confirm({
        msg:'问题提交后，无法删除哦，确定吗~',
        callback:function(){
          $('#stepOne').hide();
          $('#stepTwo').show();   
        }
      });
    });
  });  
	$(function(){
    $('.ali_select').DIYSelect();
    $('li.radio').on('click','a',function(){
      var _t=$(this);
      _t.siblings('a').removeClass('on');
      _t.addClass('on');
      $('[name="onJob"]').val(_t.attr('value'));
    });
    $('.bt_submit').on('click',function(){
      var flag=true;
      if($.trim($('input[name=companyId]').val())==''){
        $.maskUI.alert('请选择公司！');
        flag=false; 
        return;     
      }
      if($.trim($('input[name=position]').val()) == ''){
        $.maskUI.alert('请输入职位！');
        $('input[name=position]').focus();
        flag=false;
        return; 
      }else if($.trim($('input[name=email]').val()) == ''){
        $.maskUI.alert('请输入邮箱！');
        $('input[name=email]').focus();
        flag=false;
        return; 
      }else if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test($.trim($('input[name=email]').val()))){
        $.maskUI.alert('您输入的邮箱格式不正确！');
        $('input[name=email]').focus();
        flag=false;
        return; 
      }
      if(flag){
        $('form').submit();
      }
    });
	}); 
});