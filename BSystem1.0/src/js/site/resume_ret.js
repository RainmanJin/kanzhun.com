require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});
require(['c/auth_dialog', 'c/widgets', 'u/validator'], function(){
  $(function(){
    $.maskUI.config = {
      wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
      alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
      confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><div class="{1}">{0}</div><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
    };

    $('input:text').placeholderS();

    //待处理简历
    var resumeRetForm = $('#resumeRetForm');

    //判断是否是简历详情页 详情页在底部显示 列表页是弹窗显示
    var isDetailPage = $('section.bottomFix').length > 0;

    var manageResume = {
      title: {
        pass: '确认通知面试',
        noPass: '确认不合适'
      },
      reason: {
        pass: '此求职者最吸引您的优点是什么？请告诉我以便以后为您推荐更合适的候选人',
        noPass: '此求职者那点最不符合您的要求？请告诉我以便以后为您推荐更合适的候选人'
      },
      notices: {
        interviewPass: '<strong>面试通过</strong><span class="f_14">求职者已通过面试？</span>',
        interviewNotReach: '<strong>未达成面试</strong><span class="f_14">没有和求职者达成面试？</span>',
        interviewReject: '<strong>面试未通过</strong><span class="f_14">求职者未通过面试？</span>'
      },

      init: function(){
        this.bindEvents();
      },

      bindEvents: function(){
        var that = this;
        var skip = $('a.skip');
        var others = $('input[name=otherrson]', resumeRetForm);

        //简历详情页面
        $('#pass, #noPass').on('click', function(e){
          e.preventDefault();
          var type = $(this).data('type');
          resumeRetForm.data('type', type);

          $('p.reasons_' + type, resumeRetForm).show().siblings().hide();
          $('span.rs_tt', resumeRetForm).html(that.reason[type]);

          $('#resumeReasons').slideDown(200);

        });

        $('#resolving').on('click', 'a', function(e){
          e.preventDefault();
          that.resolving($(this));
        });

        //列表页面
        $('#pendingResumes').on('click', 'a.pend', function(e){
          e.preventDefault();

          var _this = $(this),
              type = _this.data('type'),
              email = _this.data('email'),
              jobtitle = _this.data('jobtitle');
          $('input[name=id]', resumeRetForm).val(_this.data('cid'));
          $('#resumePassForm input[name=toEmail]').val(email);
          $('#passedEmail').html(email);

          var companyName=$('[name="companyName"]').val();
          var hrEmail=$('[name="hrEmail"]').val();
          var workplace=_this.data("workplace");
          var oResumePassForm=$('#resumePassForm');
          oResumePassForm.find('[name="subject"]').val(companyName+"："+jobtitle+"面试通知"); 
          oResumePassForm.find('[name="interviewAddress"]').val(workplace);
          oResumePassForm.find('[name="description"]').val('请您准时参加面试，如遇特殊情况请提前来电或回复邮件至：'+hrEmail);

          resumeRetForm.data('type', type);
          $('p.reasons_' + type, resumeRetForm).show().siblings().hide();
          $('span.rs_tt', resumeRetForm).html(that.reason[type]);
          $('h3.poptitle', resumeRetForm).html(that.title[type]);

          $.maskUI.open({
            pos: 'absolute',
            elem: 'resumeReasons',
            onOpen: function(that){
              var target = that.ui;
              target.find('form').eq(0)[0].reset();
              others.removeClass("error");
              others.attr("novali","0");
            },
            onClose: function(){
              /*
              if(!isDetailPage){
                setTimeout(function(){
                  that.showMailModel();
                }, 500);
              }
              */
            }
          });


        });
        //删除简历
        $('#doneResumes').on('click', 'a.r_del', function(e){
          e.preventDefault();
          var _this = $(this);
          $.ajax({
            url: '/jobResume/delete.json',
            type: 'post',
            dataType: 'json',
            data: {
              id: _this.data('cid')
            },
            success: function(ret){
              ret = ret || {};
              if(ret.rescode == 1){
                $.maskUI.confirm({
                  msg: '确定要删除该简历吗？',
                  callback: function(){
                    _this.parents('li').fadeOut(500, function(){
                      $(this).remove();
                    });
                  }
                });
              }else if(ret.rescode == 1011){
                window.location.reload();
              }else{
                $.maskUI.alert(ret.msg || '系统错误，请稍后再试！');
              }
            }
          });

        //面试通过 | 未达成面试 | 未通过
        }).on('click', 'a.resolve', function(e){
          e.preventDefault();
          that.resolving($(this));
        });


        //reason
        $('div.select_point').on('click', 'a', function(e){
          e.preventDefault();
          others.val('');
          $('input[name=keywords]', resumeRetForm).val($(this).html());
          others.attr("novali","1");
          that.submitReason();
        });

        //skip
        skip.on('click', function(e){
          e.preventDefault();
          that.showMailModel();
        });

        //ajax submit
        resumeRetForm.ajaxForm({
          selector: 'input:hidden, input:text',
          validate: function(){
            if(others.attr("novali")=="1"){
              return true;
            }
            var val = $.trim(others.val());
            if(val !== ''){
              $('input[name=keywords]', resumeRetForm).val(val);
              others.removeClass("error");
              return true;
            }else{
              others.addClass("error");
              return false;
            }
          },
          success: function(ret){
            ret = ret || {};
            if(ret.rescode == 1){
              that.showMailModel();
            }else{
              $.maskUI.alert(ret.msg || '系统错误，请稍后再试！');
            }
          }
        });

        //passed form
        $('#resumePassForm').validatorAll({
          elems: 'input:text, textarea',
          prompt: {
            succ: function (target) {
              target.parent().find('p.err').hide();
            },

            err: function (target, msg) {
              var err = target.parent().find('p.err')
              err.html(msg || err.data('msg')).show();
            },

            normal: function (target) {
              target.parent().find('p.err').hide();
            }
          },

          ajaxSubmit: {
            elems: 'input:text, input:hidden, textarea',
            data: function(){
              return '&id=' + $('input[name=id]', resumeRetForm).val();
            },
            success: function(ret){
              ret = ret || {};
              if(ret.rescode == 1){
                $.maskUI.alert({
                  msg: '<strong class="f_14">面试通知已发送成功!</strong> <br><br>该简历已进入“已处理简历”列表！',
                  onClose: function(){
                    window.location.reload();
                  }
                });
              }else{
                $.maskUI.alert(ret.msg || '发送失败，请重试！');
              }
            }
          }
        }).init().submit();


        //no pass
        $('#resumeNoPassForm').validatorAll({
          elems: 'textarea',
          prompt: {
            succ: function (target) {
              target.parent().find('p.err').hide();
            },

            err: function (target, msg) {
              var err = target.parent().find('p.err')
              err.html(msg || err.data('msg')).show();
            },

            normal: function (target) {
              target.parent().find('p.err').hide();
            }
          },

          ajaxSubmit: {
            elems: 'textarea, input:hidden',
            data: function(){
              return '&id=' + $('input[name=id]', resumeRetForm).val();
            },
            success: function(ret){
              ret = ret || {};
              if(ret.rescode == 1){
                $.maskUI.alert({
                  msg: '邮件已发送成功！',
                  onClose: function(){
                    window.location.reload();
                  }
                });
              }else{
                $.maskUI.alert(ret.msg || '发送失败，请重试！');
              }
            }
          }
        }).init().submit();
      },

      //已通知面试简历
      resolving: function(_this){
        var that = this;
        var url = _this.data('url');
        $.maskUI.confirm({
          className: 'r_confirm',
          msg: that.notices[url] || '',
          callback: function(){
            $.ajax({
              url: '/jobResume/'+ url +'.json',
              type: 'post',
              dataType: 'json',
              data: {
                id: _this.parent().data('cid')
              },
              success: function(ret){
                ret = ret || {};
                if(ret.rescode == 1){
                  $.maskUI.alert({
                    msg: '设置成功！',
                    onClose: function(){
                      if(!isDetailPage){
                        window.location.reload();
                      }
                    }
                  });

                  //未登录
                }else if(ret.rescode == 1011){
                  if(!isDetailPage) {
                    window.location.reload();
                  }
                }else{
                  $.maskUI.alert(ret.msg || '系统错误，请稍后再试！');
                }
              }
            });
          }
        });
      },


      submitReason: function(){
        resumeRetForm.submit();
      },

      showMailModel: function(){
        var that = this;
        if(isDetailPage){
          $('#resumeReasons').slideUp(200);
        }

        $.maskUI.open({
          pos: 'absolute',
          elem: resumeRetForm.data('type') + 'Dialog',
          onOpen: function(that){
            var target = that.ui;
            target.find('p.err').hide();
            //target.find('form').eq(0)[0].reset();
          }
        });
      }

    };

    manageResume.init();

    //print the resume
    $('#printBtn').on('click', function(e){
      e.preventDefault();
      var opener = window.open($(this).data('original'));
      opener.print();
    });
  });
});