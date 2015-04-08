(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory); // AMD support for RequireJS etc.
  } else {
    factory();
  }
})(function() {

  (function () {
    $.extend({
      readCookie: function (name) {
        var _c = '; ' + document.cookie + '; ';
        var index = _c.indexOf('; ' + name + '=');
        if (index != -1) {
          var s = _c.substring(index + name.length + 3, _c.length);
          return unescape(s.substring(0, s.indexOf('; ')));
        } else {
          return null;
        }
      },
      writeCookie: function (name, value, expires) {
        var expDays = expires * 24 * 60 * 60 * 1000;
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + expDays);
        var expString = expires ? ';expires=' + expDate.toGMTString() : '';
        document.cookie = name + '=' + escape(value) + expString + ';path=/';
      },
      delCookie: function (name) {
        var exp = new Date(new Date().getTime() - 1);
        var s = this.readCookie(name);
        if (s != null) {
          document.cookie = name + '=' + s + ';expires=' + exp.toGMTString() + ';path=/';
        }
      }
    });
  })();

});
