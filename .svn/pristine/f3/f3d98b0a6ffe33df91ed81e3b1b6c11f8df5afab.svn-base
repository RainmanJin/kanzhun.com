(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory); // AMD support for RequireJS etc.
  } else {
    factory();
  }
}(function () {
  var ques = function (options, form) {
    this.form = form;
    $.extend(this, {
      items: 'dl',
      //
      unchecked: function () {

      }
    }, options);
    this.init();
  }

  ques.prototype = {
    init: function () {
      var that = this;
      if (this.unchecked) {
        this.form.on('click', 'input[type=radio], input[type=checkbox], label', function () {
          var $this = $(this);
          $this.parent().addClass('current').siblings('dd').removeClass('current');
          $this.parents(that.items).removeClass('err');
        });
      }

      this.form.on('submit', function () {
        var bool = true;
        $.each($(that.items, that.form), function (i, v) {
          var $this = $(this);
          switch (parseInt($this.data('qtype'))) {

            //单选
            case 1:
              bool = that.radio($this);
              if(!bool){
                return false;
              };
              break;

            //多选
            case 2:
              bool = that.checkbox($this);
              if(!bool){
                return false;
              };
              break;
          }

        });

        return bool;
      });
    },

    radio: function($obj){
      if ($('input[type=radio]:checked', $obj).length === 0) {
        if (this.unchecked) {
          this.unchecked.call($obj);
        }
        return false;
      }else{
        return true;
      }
    },

    checkbox: function($obj){
      if ($('input[type=checkbox]:checked', $obj).length === 0) {
        if (this.unchecked) {
          this.unchecked.call($obj);
        }
        return false;
      }else{
        return true;
      }
    }
  }


  $.fn.extend({
    questionnaire: function(options){
      return new ques(options, this);
    }
  });
}));
