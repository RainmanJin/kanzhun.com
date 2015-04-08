require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts',
    v2: 'v2/js'
  }
});

require(['c/auth_dialog', 'c/user_response', 'c/mini_search', 'comp/fav/js/collection'], function(auth_dialog, user_response){
  $(function(){

    if($("#deliverResumePop").attr("data-show")){
      $.maskUI.open({
        elem: $('#deliverResumePop')
      });
    }

    //从邮箱点击链接进来直接弹出成功提示的弹层，关闭自动删除
    $.maskUI.open({
      elem: $('#automaticalDialog'),
      destroy: true
    });

    //收藏
    var fav = require('comp/fav/js/collection');
    fav({
      elem: $('#jdFavorite')
    });

    //分享
    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share',
      config: function(){
        $('#shareTextHid').val($(this).data('desc') +'，快来看看吧！http://'+ window.location.host + $(this).data('url') +' #看准网#@看准 ');
      }
    });

    //右侧点薪面切换
    $('dl.co-alias-tabs').tabs({
      tabSelector: 'dt>span',
      tabPanel: 'dd'
    });


    var boxFlag = true,
      deliverResumePop = $('#deliverResumePop'),
      deliverResume = $('#deliverResumeTop, #deliverResumeBot');


    //固定
    if(deliverResume.length === 2){
      var jdTTFixed = $('div.jd-tt');
      var navPos = jdTTFixed.offset().top + 200;
      $(window).on('mousewheel DOMMouseScroll', function(event){
        var delta = 0;
        var e = event.originalEvent;
        var st = $(document).scrollTop() ;

        //delta为浏览器滚动方向 -1为向下 1为向上
        //向下滚动不fixed 向上才fixed
        if (e.wheelDelta) {
          delta = e.wheelDelta / 120;   // IE and Opera.
        } else if (e.detail) {
          //In Mozilla, sign of delta is different than in IE. Also, delta is multiple of 3.
          delta = - e.detail / 3;
        }

        if(st > navPos){
          if(delta > 0){
            jdTTFixed.addClass('jd-tt-fixed');
          }else{
            jdTTFixed.removeClass('jd-tt-fixed');
          }
        }else{
          jdTTFixed.removeClass('jd-tt-fixed');
        }

      });
    }


    deliverResume.on('click', function(){
      //投递完成的增加禁止状态
      if( $(this).hasClass('had_deliver')){
        return false;
      }

      $.maskUI.open({
        elem: deliverResumePop
      });

      var boxType = $('div.deliver_resume_option').data('boxtype');

      if( boxType == 'uploader' ){
        intiWebUpload('#pickers', '上传简历');
        boxFlag = true;
      }else {
        intiWebUpload('#picker', '重新上传');
        boxFlag = false;
      }
    });

    //上传简历
    function intiWebUpload(itemId, itemText){
      var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '/images/Uploader.swf',
        // 文件接收服务端。

        server: '/resume/upload.json',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
          id: itemId,
          label: itemText
        },
        fileSingleSizeLimit: 2097152,
        // 控制上传文件类型。
        accept: {
          title: 'Applications',
          extensions: 'doc,docx,pdf',
          mimeTypes: 'application/msword,application/pdf'
        }
      });

      uploader.on( 'error', function( type ) {
        if( type == 'F_EXCEED_SIZE' ){
          alert('上传简历不能超过2M!');
        }
      });

      uploader.on( 'uploadSuccess', function( file , response ) {
        if(response.rescode == 1){
          $("#license").val(response.docData);
          $('#fileName').val(response.docName);
          if( boxFlag ){
            $('#uploaders').addClass('none');
            $('#uploader').removeClass('none');
            intiWebUpload('#picker', '重新上传');
            $('#rDeliverResume').trigger('click').attr('checked', true);
          }
        }else {
          alert(response.resmsg)
        }
      });
    }

    //单选按钮判断
    $('input.radio_ipt').click(function(){
      $('input.radio_ipt').parent().find('input').removeClass('v');
      $(this).parent().find('input').addClass('v');
      $('p.hide_err').hide();
    });


    //登录注册完成的回调
    window.finishDeliver = function(){
      //删除登陆框
      $('#authFrame').remove();
      $('#deliverFrm').trigger('submit');
    }


    //验证邮箱
    var deliverEmailFn = function(data, automatical){
      $.maskUI.open({
        content:
          '<div class="success_con deliver_resume_way">' +
          '<h3 class="mb15">还差一步就能成功申请职位</h3><p class="grey_99">请验证邮箱，以便企业人事部联系您。</p>' +
          '<p class="mb20"><strong>'+ data.email +'</strong></p>' +
          '<p><input type="button"  value="验证邮箱" class="deliver_btn" id="verifyDeliverRequest"></p>' +
          '<p class="t-center f_12 pt10"><a href="javascript:;" class="maskui_close">我不申请了</a></p></div>',

        //保留dialog 并添加id
        destroy: false,
        id: 'deliverEmailDialog'
      });

      $('#verifyDeliverRequest').on('click', function(){
        var $this = $(this);

        setTimeout(function(){
          if(data.loginEmail){
            window.open(data.loginEmail);
          }
        }, 100);

        $this.prop('disabled', true);
        $.ajax({
          type: 'post',
          url: '/resume/verifydeliver.json',
          data: data,
          beforeSend: function(){
            $this.val('正在发送验证...');
          },
          success: function(ret){
            $this.prop('disabled', false).val('验证邮箱');
            if(ret.rescode == '1'){
              $.maskUI.open({
                content:
                  '<div class="success_con deliver_resume_way">' +
                  '<h3 class="mb15">邮箱是否验证成功？</h3><p class="clearfix mb20"><a href="javascript:;" class="green-btn fleft" id="deliverSuccess">是</a>'+
                  '<a href="javascript:;" class="btn_grey_l cancel-bind" id="deliverFailure">否</a></p><p class="f_12 grey_99">稍等几分钟，若没有收到验证邮件，怎么办？ <br/>'+
                  '1、<a href="javascript:;" id="deliverAgain">重新发送验证邮件</a>；<br/>' +
                  '2、看看是否在邮箱的垃圾邮件、广告邮件目录里</p></div>'
              });

              //验证成功
              $('#deliverSuccess').on('click', function(){
                window.location.reload();
              });

              //验证失败
              $('#deliverFailure').on('click', function(){
                $.maskUI.open({
                  elem: 'deliverEmailDialog'
                })
              });

              $('#deliverAgain').on('click', function(){
                $('#verifyDeliverRequest').trigger('click');
              })

            }else{
              alert(ret.resmsg || '服务器异常！');
            }
          },
          error: function(){
            alert('服务器异常！');
            $this.prop('disabled', false).val('验证邮箱');;
          }
        });
      });

      if(automatical){
        $('#verifyDeliverRequest').trigger('click');
      }
    };



    //投递简历表单验证
    var accountCheck = $('input[name=accountCheck]');

    //已登录并且邮箱未绑定状态
    var isEmailUsed = isLogged && $('input[name=email]').data('unbound');
    $('#deliverFrm').validatorAll({
      elems: 'input.v',
      prompt: {
        succ: function(target, e){
          $('>p.err', target.parent().addClass('focus')).hide();
        },
        err: function(target, msg, e){
          var err = $('>p.err', target.parent().removeClass('focus').addClass('error'));
          err.html(msg || err.data('msg')).show();
        },
        normal: function(target, e){
          $('>p.err', target.parent().removeClass('focus err')).hide();
        }
      },
      more: {
        email: {
          type: 'isMail',
          msg: '邮箱格式不对！',
          fn: function (_this, prompt, e) {

            //只有已登录才验证
            if(!isEmailUsed){
              return true;
            }
            var self = $(this),
              val = this.value;

            if(accountCheck.val() == val){
              prompt.err(self, '此邮箱已被注册！');
              return false;
            }
            $.getJSON(CONTEXTPATH + '/account/checkAccountBind.json?account=' + encodeURIComponent(val), function (ret) {
              ret = ret || {};
              if (ret.rescode == 1) {
                if (!ret.result) {
                  prompt.succ(self);

                  accountCheck.val('');
                } else {
                  prompt.err(self, '此邮箱已被注册！');
                  accountCheck.val(val);
                }
              } else {
                prompt.err(self, ret.resmsg || '服务器异常！');
                accountCheck.val('');
              }

            });
            return true;
          }
        }
      },
      ajaxSubmit: {
        elems: '.v',
        dataType: 'json',
        beforeSend: function(){},
        success: function(data){
          if(data.rescode =='1' && data.resumeData){
            switch (data.resumeData.type){

              // @verifyEmail 未登录邮箱未注册
              case 'verifyEmail':
                deliverEmailFn(data.resumeData);
                break;

              //@emailLogin 未登录邮箱已注册
              case 'emailLogin':
                auth_dialog.open('?authcb=finishDeliver&third=no&loginAccount='+ encodeURIComponent(data.resumeData.email) + '#login');
                break;

              //@bindEmail 已登录邮箱未绑定
              case 'bindEmail':
                //绑定邮箱
                $.maskUI.open({
                  content:
                    '<h3 class="mb15"><i class="suc_p"></i>成功申请职位！</h3><form action="/account/bindEmail.json" method="post" id="setNewPwdForm">' +
                    '<p>请绑定并验证邮箱，以便企业人事部联系您。</p><p class="prompt mt10 mb15 success">邮箱地址：'+ data.resumeData.email +'</p>' +
                    '<input type="hidden" name="jobId" value="'+ data.resumeData.jobId +'">'+
                    '<input id="account" name="account" type="hidden" value="'+ data.resumeData.email +'">' +
                    '<input id="token" name="token" type="hidden" value="ZjfNok87biFN1ivQ6iDniwi6kw8Vs8IM">' +
                    '<div class="mb10"><input type="password" name="password" placeholder="新的密码" class="ifd mb10">' +
                    '<p class="red mb20 none" data-msg="请输入新的密码！"></p></div><div class="mb10">' +
                    '<input type="password" name="repassword" placeholder="确认密码" class="ifd mb10">' +
                    '<p class="red mb20 none" data-msg="请输入确认密码！"></p></div><div>' +
                    '<input type="submit" value="确定" class="btn_grey_s mr10"></div></form>',
                  onOpen: function(){
                    this.find('a.dialog_close').remove();
                  }
                });

                $('#setNewPwdForm').validatorAll({
                  elems: 'input:password',
                  prompt: {
                    succ: function (target) {
                      $('p', target.parent()).html('').hide();
                    },
                    err: function (target, msg) {
                      var elem = $('p', target.parent());
                      elem.html(msg || elem.data('msg')).show();
                    },
                    normal: function (target) {
                      $('p', target.parent()).html('').hide();
                    }
                  },
                  more: {
                    password: {
                      type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
                      msg: '请输入6-14位密码，必须包含数字和字母！',
                      fn: function (_this, prompt) {
                        var re = _this.form.find('input[name=repassword]'), val = $.trim(re.val());
                        if (val !== '' && this.value != val) {
                          prompt.err($(this), '两次输入的密码不一致！');
                          prompt.normal(re);
                          return false;
                        } else {
                          prompt.succ($(this));

                          if (val !== '') {
                            prompt.succ(re);
                          }
                          return true;
                        }
                      }
                    },
                    repassword: {
                      type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
                      msg: '请输入6-14位密码，必须包含数字和字母！',
                      fn: function (_this, prompt) {
                        var pwd = _this.form.find('input[name=password]'), val = $.trim(pwd.val());
                        if (val !== '' && this.value != val) {
                          prompt.err($(this), '两次输入的密码不一致！');
                          prompt.normal(pwd);
                          return false;
                        } else {
                          prompt.succ($(this));

                          if (val !== '') {
                            prompt.succ(pwd);
                          }
                          return true;
                        }
                      }
                    }
                  },

                  ajaxSubmit: {
                    elems: 'input:password, input:hidden',
                    success: function(ret){
                      if(ret && ret.rescode == 1){
                        if(ret.loginEmail){
                          window.open(ret.loginEmail);
                        }
                        deliverEmailFn(data.resumeData, true);
                      }else{
                        alert(ret.resmsg || '提交失败！');
                      }
                    }
                  }
                }).init().submit();
                break;

              //@bindedEmail 已登录邮箱已绑定
              case 'bindedEmail':
                $.maskUI.open({
                  content:
                    '<div class="deliver_resume_way"><h3 class="deliver_suc"><i class="suc_p"></i>成功申请职位！</h3>' +
                    '<p class="grey_66 mt20">用人单位将通过以下邮箱和您联系</p>'+
                    '<p class="mb20"><strong>'+ data.resumeData.email +'</strong></p><p><a href="/jobl/p/?q='+ encodeURIComponent($('input[name=jobName]').val()) +'" class="deliver_btn">哪些公司正在招聘相同岗位？</a></p></div>',
                  onClose: function(){
                    window.location.reload();
                  },
                  onOpen: function(){
                    this.find('a.dialog_close').remove();
                  }
                });
                deliverResume.removeClass('btn_o_l').addClass('had_deliver').html('已投递');
                $('input.parameters').val('null');
                break;
            }

          }else {
            alert(data.resmsg);
            return false;
          }
        }
      }
    }).init().submit(function(){
      if (isEmailUsed && accountCheck.val() !== '') {
        return false;
      } else {
        return true;
      }
    });
  });
});