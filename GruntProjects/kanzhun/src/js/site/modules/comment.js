define(function(){

  //评论
  var comment = function(options){
    $.extend(this, {
      elem: null,
      delegate: '',
      needToInit: false,
      prompt: '',
      mainContext: '',
      listContext: ''
    }, options);

    this.init();
  };

  comment.prototype = {
    init: function(){
      var that = this;

      that.bindEvents(this.mainContext);

      that.bindEvents(this.listContext, true);
    },

    bindEvents: function(wrapper, isListContext){
      var that = this;
      wrapper.on('focus', 'textarea[name=commentContent]', function(){
        $(this).css('height', '4.5em').addClass('current');

      //keyup
      }).on('blur', 'textarea[name=commentContent]', function(){
        $(this).removeClass('current');
      }).on('keyup', 'textarea[name=commentContent]', function(){
        var remain = $.trim(this.value).length - 140,
          msg = $(that.prompt, wrapper);
        if (remain <= 0) {
          msg.html('您还可以输入<strong class="ok">' + Math.abs(remain) + '</strong>字');
        } else {
          msg.html('您已超出输入<strong class="err">' + remain + '</strong>字');
        }

      //publish
      }).on('click', that.submitBtn, function(){
        var self = $(this),
          field = wrapper.find('textarea.content_ipt'),
          val = $.trim(field.val()),
          button = $(this);

        if(val === '' || val.length > 140){
          field.addClass('shine').one('animationend webkitAnimationEnd', function(){
            $(this).removeClass('shine');
          });
          return;
        }

        $.ajax({
          type: 'post',
          url: that.url,
          dataType: 'html',
          data: that.data.call(self, val),
          beforeSend: function(){
            button.prop('disabled', true);
          },
          success: function(ret){
            if(ret && $.trim(ret) !== ''){
              button.prop('disabled', false);
              that.listContext.prepend($(ret).hide().delay(200).fadeIn());

              field.val('').focus();

              if(wrapper.hasClass('reply')){
                wrapper.hide();
              }

              $(that.prompt, wrapper).html('您还可以输入<strong class="ok">140</strong>字');

              if(isListContext){
                $('div.reply', wrapper).remove();
                $(window).scrollTop(that.mainContext.offset().top);
              }
            }else{
              button.prop('disabled', false);
              $('b.red', wrapper).show();
            }
          },
          error: function(){
            button.prop('disabled', false);
            $('b.red', wrapper).show();
          }
        });
      });


      if(!isListContext){
        return;
      }


      //add reply
      wrapper.on('click', 'a.add_reply', function(){
        $('div.reply', wrapper).remove();
        var self = $(this),
          parent = self.parents('li').eq(0);

          parent.append(that.replyHTML.call(self));

      //cancel
      }).on('click', 'a.cancel_reply', function(){
        $('div.reply', wrapper).remove();

      //delete
      }).on('click', 'a.del_reply', function(){
        var self = $(this);
        $.getJSON(that.delUrl, that.delData.call(self),  function(ret){
          if(ret && ret.rescode == 1){
            self.parents('li').eq(0).fadeOut(function(){
              $(this).remove();
            });
          }else{
            alert('删除失败！');
          }
        });

      //more comments
      }).on('click', that.moreBtn, function(){
        var self = $(this),
          more = self.parent().parent();

        $.ajax({
          type: 'post',
          url: that.moreUrl,
          data: that.moreData.call(self),

          beforeSend: function(){
            that.loading.show();
            more.hide();
          },
          success: function(ret){
            if(ret){
              that.loading.hide();
              more.after(ret).remove();
            }
          }
        });
      });
    }
  };




  return function(o){
    var cmt = new comment(o);
    return cmt;
  }
});