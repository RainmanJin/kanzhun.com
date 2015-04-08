(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory); // AMD support for RequireJS etc.
  } else {
    factory();
  }
}(function () {
  var inheritPrototype = function (sub, sup) {
    var pro = Object(sup.prototype);
    pro.constructor = sub;
    sub.prototype = pro;
  };

  var validator = function (opts, form) {
    this.form = form;
    $.extend(this, {more: {}}, opts);
  };

  validator.reg = {
    isMail: function (str) {
      return (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(str);
    },
    isNumber: function (str) {
      return (/^\d+$/).test(str);
    },
    isPhone: function (str) {
      return (/^1\d{10}$/).test(str);
    },
    isPwd: function (str) {
      return (/^\d{6,}$/).test(str);
    },
    isIntger: function (str) {
      return (/^(([1-9]\d*)|0)$/).test(str);
    }
  };

  validator.prototype = {

    //newElems为动态添加的表单元素 重新执行init即可
    init: function (newElems) {
      var _this = this;
      $.each(newElems ? newElems : $(_this.elems, _this.form), function (i, v) {
        _this.check(v);
      });

      return this;
    },
    check: function (v, callback) {
      var _this = this,
        target = $(v),
        prompt = this.prompt,
        focusMore = this.focusMore;
      if (!prompt) {
        return this;
      }

      switch (v.nodeName) {
        case 'INPUT':
          var type = v.getAttribute('type');
          if (type === 'text' || type === 'password') {
            target.on('focus', function () {
              if ($.trim(this.value) === '') {
                prompt.normal(target);
              } else if (focusMore) {

                //focusMore为function时表示全局方法
                if ($.isFunction(focusMore)) {
                  return focusMore.call(this, prompt);
                } else if ($.isPlainObject(focusMore) && focusMore[this.name]) {
                  return focusMore[this.name].call(this, prompt);
                }

              }
            }).on('blur', function (e) {
              _this.validateText.call(this, prompt, _this, e);
            });
          }
          break;

        case 'SELECT':
          target.on('change', function (e) {
            _this.validateSelect.call(this, prompt, _this, e);
          });
          break;

        case 'TEXTAREA':
          target.on('focus', function () {
            if ($.trim(this.value) === '') {
              prompt.normal(target);
            }
          }).on('blur', function (e) {
            _this.validateTextarea.call(this, prompt, _this, e);
          });
          break;

      }
    },
    //input:text
    validateText: function (prompt, _this, e, submitFn) {
      var self = $(this),
        val = $.trim(this.value),
      //if has placeholder
        placeholder = self.attr('placeholder'),
        unnece = self.data('unnecessary');

      //is null  隐藏域的非空验证留到下一步
      //if (self.attr('type') !== 'hidden' && (val === '' || (placeholder && val == placeholder))) {
      if ( (val === '' || (placeholder && val == placeholder))) {  
        if (!unnece) {
          prompt.err(self);
          return false;
        } else {
          prompt.normal(self);
          return true;
        }
      } else {

        //regexp more 可以是object或 function

        /*第三步验证
         more{
         type: 如果是string则从validator.reg里找 也可以传regExp
         msg:
         fn: fn里控制prompt
         }*/
        var more = _this.more[this.name] || {},
          type = more.type,
          msg = more.msg;

        //regexp callback
        if (more && type && msg) {
          var reg = typeof type === 'object' ? function (str) {
            return type.test(str);
          } : validator.reg[type];

          if (!reg(val)) {
            prompt.err(self, msg);
            return false;
          }
        }


        var moreFn = typeof more === 'function',
          fn = moreFn ? more : more.fn;
        if (fn) {
          //可以通过判断e 是不是event对象 来判断是不是submit时的验证
          if (fn.call(this, _this, prompt, e)) {

            if (moreFn) {
              prompt.succ(self);
            }
            return true;
          } else {
            if (moreFn) {
              prompt.err(self);
            }
            return false;
          }
        }

        //submitmore
        if (typeof submitFn === 'function') {
          return submitFn.call(this, _this, prompt);
        }

        prompt.succ(self);
        return true;
      }
    },
    //select
    validateSelect: function (prompt, _this) {
      var self = $(this);
      if (self.val() == self.find('option').eq(0).val()) {
        prompt.err(self);
        return false;
      } else {
        prompt.succ(self);
        return true;
      }
    },
    //textarea
    validateTextarea: function (prompt, _this) {
      var self = $(this), unnece = $(this).data('unnecessary');
      if ($.trim(this.value) === '') {
        if (!unnece) {
          prompt.err(self);
          return false;
        } else {
          prompt.normal(self);
          return true;
        }
      } else {

        var more = _this.more[this.name] || '';

        if (typeof more === 'function') {
          return more.call(this, _this, prompt);
        }

        prompt.succ(self);
        return true;
      }
    }
  };

  var validatorAll = function (opts, form) {
    this.form = form;
    $.extend(this, {more: {}, submitMore: {}}, opts);
  };

  inheritPrototype(validatorAll, validator);

  //submit
  validatorAll.prototype.submit = function (fn) {
    var _this = this;
    this.form.on('submit', function (event) {
      event.stopPropagation();
      var flag = true, self = $(this), prompt = _this.prompt;
      if (!prompt) {
        return false;
      }
      $.each($(_this.elems, _this.form), function (i, v) {
        var target = $(v);

        //隐藏的组件 如果有necessary 仍需验证
        if (!target.is(':hidden') || !!target.data('necessary')) {
          switch (v.nodeName) {
            case 'INPUT':
              var more = _this.submitMore[v.name];
              flag = _this.validateText.call(v, prompt, _this, null, more);
              break;

            case 'SELECT':
              flag = _this.validateSelect.call(v, prompt, _this);
              break;

            case 'TEXTAREA':
              flag = _this.validateTextarea.call(v, prompt, _this);
              break;
          }
        }
        if (!flag) {
          //$(window).scrollTop(prompt.offset().top - 30);
          //定位到错误项
          if(_this.locate){
            _this.locate.call(target);
          }
          return false;
        }
      });

      if (flag) {
        var bool2 = true;
        if (typeof fn === 'function') {
          //这里要this无意义所以不需要call
          bool2 = !!fn();
        }
        if (bool2) {
          var submitBtn = self.find('input:submit'),
            defName = submitBtn.val();
          if (_this.ajaxSubmit) {
            event.preventDefault();
            var o = _this.ajaxSubmit,
              components = self.find(o.elems).filter(function () {
                return !!$(this).attr('name');
              });

            $.ajax({
              type: o.type || (self.attr('method') || 'get').toUpperCase(),
              url: o.url || self.attr('action'),
              data: $.param(components) + (o.data ? o.data() : ''),
              dataType: o.dataType || 'json',
              beforeSend: function () {
                submitBtn.prop('disabled', true);

                if(!_this.noSubmiting){
                  submitBtn.val('正在提交...');
                }

                if (o.beforeSend) {
                  o.beforeSend.call(self, _this);
                }
              },
              success: function (ret) {
                submitBtn.prop('disabled', false).val(defName);
                if (o.success) {
                  o.success.call(self, ret, _this);
                }
              },
              error: function () {
                submitBtn.prop('disabled', false).val(defName);
                if (o.error) {
                  o.error.call(self, _this);
                }
              }
            });

            return false;
          } else {
            //禁止重复提交
            submitBtn.prop('disabled', true);
            if(!_this.noSubmiting){
              submitBtn.val('正在提交...');
            }
          }
        }
        return bool2;
      } else {
        return false;
      }
    });
  };

  $.fn.extend({
    validator: function (opts) {
      return new validator(opts, this);
    },
    validatorAll: function (opts) {
      return new validatorAll(opts, this);
    }
  });
  $.getByteLen=function(val){
    var len = 0; 
    for (var i = 0; i < val.length; i++) { 
      if (val[i].match(/[^\x00-\xff]/ig) != null) //全角 
        len += 2; 
      else 
        len += 1; 
    } 
    return len; 
  }
}));
