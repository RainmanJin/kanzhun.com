require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets'],function(){
 $(function(){
  $.maskUI.config = {
    wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
    alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;;" class="dialog_close maskuiclose"></a><h3>提示</h3><p class="t-center grey_99 con">您今天已经使用了全部30次下载机会！ 请明天继续使用！</p><p class="t-center mt25"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p></div></section>',
    confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p class="t-center f_14 mt10">{0}</p><p class="t-center mt20"><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
  };  

  var userPhone, userEmail, user_phone = $('#user_phone'), user_email = $('#user_email')
  $('#contact_information').click(function(){
    var self = $('#contact_information');
    $.ajax({
      url: CONTEXTPATH + '/resume/follow.json?resumeId=' + resumeId,
      type: 'post',
      dataType: 'json',
      success:function(data){
        if(data.rescode='1'){
          var resume_count = $('#resume_count').text();
          $('#resume_count').text(resume_count - 1);
          user_phone.html('<span class="grey_99">Tel</span>' + data.phone);
          user_email.html('<span class="grey_99">E-mail</span>' + data.email);
          self.addClass('none');
          $('#download_pdf').removeClass('none');
        }else {
          $.maskUI.alert('您今天已经使用了全部30次查看机会！ 请明天继续使用！');
          self.css('cursor','no-drop');
        }
      }
    })
  });
    
 })
});