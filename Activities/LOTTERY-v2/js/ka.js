(function (win) {
  win.upp = function (url) {
    this._url = url;
    this._init();
  };
  upp.prototype = {
    _init: function () {
      var addressPair = this._url.split('?'),
        i = 0,
        keypairs = [];
      this.host = addressPair[0];
      this._params = {};
      if (addressPair.length > 1) {
        keypairs = addressPair[1].split('&');
        for (; i < keypairs.length ; i++) {
          var keypair = keypairs[i].split('=');
          this.add(keypair[0], keypair[1]);
        }
      }
    },
    add: function (_key, _value) {
      this._params[_key] = _value;
      return this;
    },
    remove: function (key) {
      delete this._params[key];
      return this;
    },
    contains: function (key, value) {
      return this._params[key] !== undefined;
    },
    update: function (key, value) {
      this._params[key] = value;
    },
    get: function (key) {
      return this._params[key];
    },
    all: function () {
      return this._params;
    },
    url: function () {
      var queryStrings = [];
      for (var key in this._params) {
        queryStrings.push(key + '=' + this._params[key]);
      }
      return this.host + (queryStrings.length > 0 ? '?' : '') + queryStrings.join('&');
    }
  };
})(window);
$(function(){
  if(window._T){
    $('body').on('click', '[ka]', function(e){
      var self = $(this),
        k = self.attr('ka');

      if(k){
        var p =  self.attr('href')||'';
        if(p && p.indexOf('#') !== 0 && p.indexOf('javascript:;') === -1 && !self.attr('noa')){
          var u = new window.upp(p);
          u.add('ka', encodeURIComponent(k))
          self.attr('href', u.url());
        }

        _T.sendEvent(k, p);
      }
    });
  }
});