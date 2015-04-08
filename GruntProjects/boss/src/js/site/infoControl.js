define(['jquery', 's/widgets'], function($){
  $.maskUI.config = {
    wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
    alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
    confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
  };

  var markCounts = $('#markCounts');
  var infoControl = {
    init: function(o){
      this.wrap = $('#' + o.wrap);
      this.context = o.context ? $(o.context, this.wrap): this.wrap;
      this.itemSelector = o.itemSelector;
      this.currentFlag = o.currentFlag;

      this.moveUp();
      this.del();
    },

    moveUp: function(){
      var items = $(this.itemSelector, this.context),
          that = this;

      this.wrap.on('click', 'a.moveup', function(e){
        var current = $(this).parents(that.itemSelector),
          frag,
          prev = current.prev(that.itemSelector);
        if(prev.length){
          frag = current.clone();
//          prev.before(frag.css('display', 'none'));
//          frag.slideDown();
          var height = current.outerHeight() + Math.max(parseInt(current.css('margin-top').replace('px')), parseInt(current.css('margin-bottom').replace('px')));

          if(!current.is(':animated') && !prev.is(':animated')){
            current.animate({'top': -1*height }, 300, function(){
              current.remove();
              prev.before(frag);
            });
            prev.animate({'top': height}, 300, function(){
              prev.css('top', '0');

              var _data = [];
              $('a.moveup', that.context).each(function(i, v){
                _data.push('ids='+ $(v).data('cid'));
              });

              $.ajax({
                url: '/user/'+ that.wrap.data('url') +'/sort.json',
                type: 'post',
                dataType: 'json',
                data: _data.join('&'),
                success: function(ret){

                }
              });
            });
          }
        }
      });
    },

    del: function(){
      var that = this;
      this.wrap.on('click', 'a.del', function(){
        var self = $(this),
            id = self.data('cid');
        $.maskUI.confirm({
          msg: '确定删除吗？',
          callback: function(){
            if(id){
              $.getJSON('/user/'+ that.wrap.data('url') +'/delete.json?id='+ id, function(ret){
                if(ret){
                  if(ret.rescode == 1){
                    self.parents(that.itemSelector).fadeOut(200, function(){
                      $(this).remove();
                      markCounts.html(parseInt(markCounts.html()) - 1);
                    })
                  }else{
                    $.maskUI.alert('删除失败！');
                  }
                }else{
                  $.maskUI.alert('服务器故障，请重试！');
                }
              });
            }else{
              self.parents(that.itemSelector).fadeOut(200, function(){
                $(this).remove();
                markCounts.html(parseInt(markCounts.html()) - 1);
              })
            }
          }
        });
      });
    }
  };

  return infoControl;
});