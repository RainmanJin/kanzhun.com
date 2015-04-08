define(['c/widgets','u/validator','comp/textarea/jquery.autosize'], function () {

  $.fn.extend({
    rating: function (classname, clickCallback, enterCallback, leaveCallback) {
      this.each(function (i, v) {
        var target = $(v);
        target.on('mouseenter', 'a', function () {
          var index = parseInt(target.find('a').index(this) + 1, 10),
            done = '';
          if (target.hasClass('done')) {
            done = 'done ';
          }
          target.attr('class', done + classname + index);

          if (enterCallback) {
            enterCallback(this);
          }
        }).on('mouseleave', function () {
          var index = target.data('ind');
          if (!target.hasClass('done')) {
            target.removeClass(function () {
              return $(this).attr('class', classname.split(' ')[0]);
            });
            if (leaveCallback) {
              leaveCallback(this);
            }
          } else {
            target.attr('class', 'done ' + classname + index);
            if (enterCallback) {
              enterCallback(target.find('a').eq(index - 1));
            }
          }
        }).on('click', 'a', function () {
          var index = parseInt(target.find('a').index(this) + 1, 10);
          target.addClass('done').data('ind', index);
          if (clickCallback) {
            clickCallback.call(this, index);
          }
        });
      });
    }
  });

})