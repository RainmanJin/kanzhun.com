define(function () {
  $.fn.extend({
    DIYSelect: function (opts) {
      var o = $.extend({
        listSelector: 'dd>a',
        keepDefault: false,    //如果option为a链接, 设置这个为true
        listCallback: null,   //选择option时的回调
        showCallback: null,   //展开option时的回调
        hideCallback: null,   //隐藏option时的回调
        clearValue: false,     //初始化时清空hidden的value，用于点击浏览器“后退”按钮时
        hasSecond: false
      }, opts);

      this.each(function (i, v) {
        var target = $(v),
          field_hidden = target.find('dt>[type="hidden"]');

        if (o.clearValue) {
          field_hidden.val('');
        }

        if (!o.keepDefault) {

          //如果有二级目录
          if(o.hasSecond || target.hasClass('select-tree')){
            o.listSelector = opts && opts.listSelector ? opts.listSelector : 'dd a';
            target.on('mouseenter', 'div.select-second-item', function(e){
              $(this).addClass('on');
            }).on('mouseleave', 'div.select-second-item', function(e){
               $(this).removeClass('on');
            });
          }

          target.on('click', o.listSelector, function (e) {
            e.preventDefault();
            var $this = $(this);
            if($this.hasClass('select-opts-tt')){
              e.stopPropagation()
              return false;
            }
            var field = target.find('dt>input:text, dt>input:button'),
              list = target.find('dd');

            field.val($this.html());

            //field_hidden.val($(this).data("val"));
            //解决动态加载赋不上值的问题
            target.find('dt>[type="hidden"]').val($this.data("val"));

            if (o.listCallback) {
              o.listCallback.call(this, list, field, target);
            }

          });
        }




        target.on('click', 'dt', function (e) {
          e.preventDefault();
          e.stopPropagation();

          var self = $(this).find('span');
          var field = target.find('dt>input:text, dt>input:button'),
            list = target.find('dd');

          $(document).trigger('click').one('click', function () {
            list.hide();
            self.removeClass('on');
            if (o.hideCallback) {
              o.hideCallback(list, field, target);
            }
          });

          self.addClass('on');
          list.show();

          if (o.showCallback) {
            o.showCallback.call(this, list, field, target);
          }
        });
      });
    }
  });
});
