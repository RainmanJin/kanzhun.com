define(function(){
  //创建邮箱dialog
  function createEmailDialog(isLogin,cid){
    var h='';
    h+='<section class="maskui_dialog email_dialog" data-type="email">'+
    '<div class="dialog_con">'+
    '<a href="javascript:;" class="dialog_close" data-action-type="close" ka="email_dialog_close"></a>'+
    '<h3>留下您的邮箱，<span>方便您持续获取该公司最新动态</span></h3>'+
    '<form action="/miniugc/subscribe.json" method="post">'+
    '<div class="field_div mt30">'+
    '<input class="v" type="hidden" name="companyId" value=' + cid + '>'+
    '<input class="ifd v" style="width:200px;" type="text" placeholder="请输入邮箱" name="email"/><input class="btn_grey_b ml10" type="submit" value="立即订阅" ka="email_dialog_submit"><a class="maskuiclose ml20" data-action-type="close" href="javascript:;" ka="email_dialog_close">以后再说</a>'+
    '<p class="err" data-msg="请输入邮箱!"></p>'+
    '</div>'+
    '</form>'+
    '</div>'+
    '</section>';
    $.maskUI.open({
      elem: $(h),
      destroy:true
    });
    valiEmail(isLogin);
    closeEmail();
  }
  //邮箱dialog校验
  function valiEmail(isLogin){companyId=$("#companyId").val();
    var dialog=$('.email_dialog[data-type="email"]');
    var oEmail=$('[name="email"]',dialog);
    oEmail.focus(function(){
      $(this).siblings(".err").hide();
    })
    $('form',dialog).validatorAll({
      elems:'.v',
      prompt:{
        succ:function(target){
          target.siblings(".err").hide();
        },
        err:function(target,msg){
          var prompt=target.siblings(".err");
          prompt.html((msg||prompt.data("msg")) ).show();
        },
        normal:function(target){nmm
          target.siblings(".err").hide();
        }
      },
      more:{
        email: {
          type: 'isMail',
          msg: '邮箱格式不对！'
        }
      },
      ajaxSubmit: {
        elems: '.v',
        beforeSend: function(){},
        dataType:'html',
        success: function(result){
          $.maskUI.open({
            elem: $(result),
            destroy:true
          });
          //关注与收藏
          $('a.pop_follow').hover(function(){
            if( $(this).data('hadAttention') == 'yes' ){
              $(this).html('取消关注');
            }
          }, function(){
            if( $(this).data('hadAttention') == 'yes' ){
              $(this).html('<i class="ok_s"></i>已关注');
            }
          })

          $('a.pop_follow').on('click',  function(e){
            e.preventDefault();
            /*if(!auth_dialog.isLogged()){
             auth_dialog.open('#login');
             return;
             }*/
            var self = $(this),
                mtype = $(this).data('mtype'),
                cid=$(this).data('cid');
            $.ajax({
              type: 'GET',
              url: CONTEXTPATH + '/user/'+ mtype +'?companyId='+ cid,
              dataType: 'json',
              success: function(ret){
                ret = ret || {};
                  //console.log(1)
                  if(ret.rescode == 1011){
                    auth_dialog.open('#login');
                  }else if(ret.rescode == '1'){
                    if("follow.json" == mtype){
                      self.data('mtype','cancelfollow.json');
                      self.data('hadAttention', 'yes').html('<i class="ok_s"></i>已关注');
                      var createEmailDialog=require('c/company/email_dialog');
                      if(ret.isSubscribe==1){
                        createEmailDialog(result.isLogin);
                      }
                    }else if("cancelfollow.json" == mtype){
                      self.data('mtype','follow.json');
                        self.data('hadAttention', 'no').html('<i class="add_s"></i>关注');
                    }
                  }
              }
            });
          });
        }
      }
    }).init().submit(function() {
      var flag=true;
      //改成非登录情况下也校验邮箱是否存在
      //if(isLogin==1){
        var account= $.trim($('[name="email"]',dialog).val());
        $.ajax({
          url:'/account/checkAccountBind.json',
          async:false,
          type:'get',
          data:{
            account:account
          },
          success:function(result){
            var prompt=oEmail.siblings(".err");
            if(result.result){
              prompt.html('该邮箱已被注册！请用该邮箱登录或输入其他邮箱！').show();
              flag=false;
            }else{
              prompt.hide();
              flag=true;
            }
          }
        });
      //}
      return flag;
    });
  }
  //邮箱以后再说或者关闭
  function closeEmail(){
    var dialog=$('.email_dialog[data-type="email"]');
    $('[data-action-type="close"]',dialog).on('click',function(){
      $('.maskuiclose',dialog).trigger('click');
      $.ajax({
        url:'/miniugc/subscribeemail.json'
      });
    })
  }
  return createEmailDialog;
});

