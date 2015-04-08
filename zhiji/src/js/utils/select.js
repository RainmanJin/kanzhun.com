define(function () {
  $.fn.extend({
    DIYSelect: function (opts) {
      var o = $.extend({
        listSelector: 'dd>a',
        keepDefault: false,    //if the options are links
        listCallback: null,
        showCallback: null,
        hideCallback: null
      }, opts);

      this.each(function (i, v) {
        var target = $(v);

        if (!o.keepDefault) {
          target.on('click', o.listSelector, function (e) {
            e.preventDefault();
//            e.stopPropagation();
            var field = target.find('dt>input:text, dt>input:button'),
              list = target.find('dd'),
              field_hidden=target.find('dt>[type="hidden"]');

            field.val($(this).html());

            field_hidden.val($(this).data("val"));

//            $(document).trigger('click');

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
            if(o.hideCallback){
              o.hideCallback(list, field, target);
            }
          });

          self.addClass('on');
          list.show();

          if(o.showCallback){
            o.showCallback.call(this, list, field, target);
          }
        });
      });
    }
  });
});
