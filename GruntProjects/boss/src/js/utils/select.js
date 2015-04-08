define(['jquery'], function ($) {
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
        var target = $(v),
          field = target.find('dt>input:text, dt>input:button'),
          list = target.find('dd');

        if (!o.keepDefault) {
          target.on('click', o.listSelector, function (e) {
            e.preventDefault();
            e.stopPropagation();
            field.val($(this).html());
            $(document).trigger('click');

            if (o.listCallback) {
              o.listCallback.call(this, list, field, target);
            }

          });
        }


        target.on('click', 'dt', function (e) {
          e.preventDefault();
          e.stopPropagation();

          var self = $(this).find('span');

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