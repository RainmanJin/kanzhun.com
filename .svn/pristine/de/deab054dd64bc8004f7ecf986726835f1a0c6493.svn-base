define(['c/auth_dialog'], function(auth_dialog){
  return function(o){
    o.elem.on('click', function (e) {
      if (!auth_dialog.isLogged()) {
        auth_dialog.open('#login');
        return;
      }
      var self = $(this), param = self.data('j');
      if (param) {
        $.getJSON(CONTEXTPATH + '/job/adduserjc.json?jobId=' + param, function (ret) {
          ret = ret || {};
          if (ret.rescode == 1011) {
            auth_dialog.open('#login');
          } else if (ret.rescode == 1) {
            self.attr('class', 'hadcollection').data('j', null).prop('disabled', true);
            self.html('<i class="hadcollection"></i>已收藏');
          }
        });
      }
    });
  }
});

