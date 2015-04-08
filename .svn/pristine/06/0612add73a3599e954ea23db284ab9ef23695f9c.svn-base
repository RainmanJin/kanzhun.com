require.config({
  paths: {
    u: '../utils'
  }
});

require([''], function(){
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

      if(confirm('问题提交后，无法删除哦，确定吗~')){
        $('#stepOne').hide();
        $('#stepTwo').show();
      }
    });


    $('li.state').on('click', 'button', function(){
      $(this).addClass('sel').siblings('button').removeClass('sel');
      $(this).parent().find('input[type=hidden]').val(this.value);
    });

    $('#profilesForm').on('submit', function(){
      if($.trim($('input[name=position]').val()) == ''){
        alert('请输入职位！');
        $('input[name=position]').focus();
        return false;
      }else if($.trim($('input[name=email]').val()) == ''){
        alert('请输入邮箱！');
        $('input[name=email]').focus();
        return false;
      }else if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test($.trim($('input[name=email]').val()))){
        alert('您输入的邮箱格式不正确！');
        $('input[name=email]').focus();
        return false;
      }

      return true;
    });
  });
});