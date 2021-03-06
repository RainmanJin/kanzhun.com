define(['c/widgets'], function(){
//  $.maskUI.config = {
//    wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
//    alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
//    confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
//  };

  //评论
  var comment = function(o){
    this.elem = o.elem;
    this.delegate = o.delegate;
    this.needToInit = o.needToInit || false;
    this.contentCallback = o.contentCallback || null;
    this.popCallback = o.popCallback || null;
    this.init();
  };

  comment.prototype = {
    init: function(){
      var that = this;

      that.bindEvents();
      //加载3条评论mar
      if(!this.needToInit){
        return this;
      }

      /*this.delegate.on('click', this.elem, function(){
        var self = $(this),
          wrap = self.parent().parent(),
          cmts = $('div.comments_con', wrap);

        if(cmts.length){
          //展开收起
          if(cmts.is(':hidden')){
            cmts.show();
          }else{
            cmts.hide();
          }

          return;
        }

        $.ajax({
          type: 'post',
          url: CONTEXTPATH + '/comment/list.json?' + self.data('params'),
          dataType: 'html',
          beforeSend: function(){
            wrap.append('<p class="loading" style="display: block;"><img src="/images/loading.gif">加载中...</p>');
          },
          success: function(ret){
            if(ret){
              wrap.find('p.loading').remove();
              wrap.append(ret);
            }
          }
        });
      });*/
    },

    bindEvents: function(){
      var wrapper = this.delegate;
      var _call = this.contentCallback;
      var _pop = this.popCallback;
      wrapper./*on('focus', 'textarea[name=commentContent]', function(){
        $(this).css('height', '4.5em');
      }).*/on('keyup', 'textarea[name=commentContent]', function(){
        var remain = $.trim(this.value).length - 140,
          msg = $(this).parent().parent().parent().find('>p>span.cmt_w');
        if (remain <= 0) {
          msg.html('您还可以输入<strong class="ok">' + Math.abs(remain) + '</strong>字');
        } else {
          msg.html('您已超出输入<strong class="err">' + remain + '</strong>字');
        }

      //publish
      }).on('click', 'span.pub_cmt', function(){
        var self = $(this),
          wrap = self.parent().parent().parent(),
          field = wrap.find('textarea.content_ipt'),
          val = $.trim(field.val()),
          button = $('input', self),
          rContext = self.parents('div.comments_con');

        if(val === '' || val.length > 140){
          field.addClass('shine').one('animationend webkitAnimationEnd', function(){
            $(this).removeClass('shine');
          });
          if( $('span.angle_inner').length > 0 ){
            var angleInner = $('span.angle_inner');
            angleInner.addClass('angle_shine').one('animationend webkitAnimationEnd', function(){
              angleInner.removeClass('angle_shine');
            });
          }

          return;
        }

        if( field.data('main') == 'yes' && _call ){
          val = _call();
        }

        $.ajax({
          type: 'post',
          url: CONTEXTPATH + '/comment/publish.json',
          dataType: 'html',
          data: {
            companyId: $('input[name=companyId]', rContext).val(),
            originId: $('input[name=originId]', rContext).val(),
            type: $('input[name=type]', rContext).val(),
            parentId: self.data('pid') || $('input[name=parentId]', rContext).val(),
            parentFloor: self.data('pnum') || $('input[name=parentFloor]', rContext).val(),
            commentContent: val
          },
          beforeSend: function(){
            button.prop('disabled', true);
          },
          success: function(ret){
            if(ret && $.trim(ret) !== ''){
              button.prop('disabled', false);
              $('ul', rContext).prepend($(ret).hide().delay(200).fadeIn());

              field.val('').focus();

              if(wrap.hasClass('reply')){
                wrap.hide();
              }

              wrap.find('>p>span.cmt_w').html('您还可以输入<strong class="ok">140</strong>字');
              if( _pop ){
                _pop();
              }
            }else{
              button.prop('disabled', false);
              $('b.red', wrap).show();
            }
          },
          error: function(){
            button.prop('disabled', false);
            $('b.red', wrap).show();
          }
        });

      //add reply
      }).on('click', 'a.add_reply', function(){
        var self = $(this),
          parent = self.parent().parent().parent();
          reply = parent.find('>div.reply');

        if(reply.length){
          reply.show();
        }else{
          parent.append('<div class="reply"><div><div><textarea class="content_ipt" name="commentContent"  placeholder="回复评论"></textarea></div></div>' +
            '<p class="t-right clear"><b class="red mr20 none">发布失败 : ( </b><span class="cmt_w mr20">您还可以输入<strong class="ok">140</strong>字</span><a href="javascript:;" class="cancel_reply mr20">取消</a>' +
            '<span class="btn_grey_b pub_cmt" data-pid="'+ self.data('pid') +'" data-pnum="'+ self.data('pnum') +'"><input type="button" ka="print" value="回复" ></span></p></div>');
        }


      //cancel
      }).on('click', 'a.cancel_reply', function(){
        $(this).parent().parent().hide();

      //delete
      }).on('click', 'a.del_reply', function(){
        var self = $(this);
        $.getJSON(CONTEXTPATH + '/comment/delete.json?commentId=' + self.data('pid'), function(ret){
          if(ret && ret.rescode == 1){
            self.parents('li').eq(0).fadeOut(function(){
              $(this).remove();
            });
          }else{
            $.maskUI.alert('删除失败！');
          }
        });

      //more comments
      }).on('click', '#more_cmts', function(){
        var self = $(this),
          _context = self.parents('div.comments_con'),
          loading = $('#cmtsLoading'),
          more = self.parent().parent();
        $.ajax({
          type: 'post',
          url: '/comment/listmore.json',
          data: {
            type: $('input[name=type]', _context).val(),
            originId: $('input[name=originId]', _context).val(),
            companyId: $('input[name=companyId]', _context).val(),
            lastId: self.data('lid')
          },

          beforeSend: function(){
            loading.show();
            more.hide();
          },
          success: function(ret){
            if(ret){
              loading.hide();
              more.after(ret).remove();
            }
          }
        });
      });
    }
  };


  //share
  var shareControler = function(){
    this.init();
  };

  shareControler.prototype ={
    init: function(){
      if($('#shareDialog').length){
        return;
      }

      $('body').append('<div id="shareDialog"><div class="bdsharebuttonbox">' +
        '<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>' +
        '<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>' +
        '<a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>' +
        '<a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>' +
        '<a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧"></a>' +
        '<a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣"></a>' +
        '<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>' +
        '<a href="#" class="bds_more" data-cmd="more"></a></<div><i class="s_close"></i></div></div>');

      var shareDialog = $('#shareDialog');

      window._bd_share_config = {
        "common": {
          "bdSnsKey": {},
          "bdMini": "2",
          "bdMiniList": false,
          "bdStyle": "1",
          "bdSize": "16",

          //设置分享的内容
          "onBeforeClick": function(cmd,config){
            return {
              "bdSnsKey": {},
              "bdText": $('#shareTextHid').val(),
              "bdMini": "2",
              "bdMiniList": false,
              "bdPic": $('#shareImgHid').val(),
              "bdStyle": "1",
              "bdSize": "16"
            };
          },

          "onAfterClick": function(){
            //点击分享icon后关闭分享dialog
            shareDialog.hide();
          }
        },
        "share": {},
        "image": {
          "viewList": ["qzone", "tsina", "tqq", "renren", "weixin"],
          "viewText": "分享到：",
          "viewSize": "16"
        }
      };
      with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];

      //close
      $('i.s_close', shareDialog).click(function(){
        shareDialog.hide();
      });
    },

    build: function(o){
      var shareDialog = $('#shareDialog');
      $('body').on('click', o.selectors, function(e){
        if(o.config){
          o.config.call(this);
        }

        var self = $(this),
          pos = self.offset();
        shareDialog.css({'left': pos.left, 'top': parseInt(pos.top) + parseInt(self.outerHeight()) + 5}).show();
      });
    }
  };

  return {
    //评论
    comment:  function(o){
      var cmt = new comment(o);
      return cmt;
    },

    //分享
    share: function(){
      var s = new shareControler();
      return s;
    }
  }
});