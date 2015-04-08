require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
    }
});

require(['c/user_response', 'c/auth_dialog','c/widgets', 'c/job/po_common', 'highcharts'],function(user_response, auth_dialog){
  $(function(){

    /*代码开始的地方*/
    //招聘页面
    var pForm = $('#recruitlistForm'),
        cityCode = pForm.find('input[name=cityCode]');

    $('dl#salaryCitySelect').DIYSelect({
        keepDefault: true/*,
        listCallback: function(){
          cityCode.val($(this).data('cid'));
          sForm.submit();
        }*/
    });

    //直接点击按钮 清空citycode
    $('#salarySearchBtn').on('click', function (e) {
      e.preventDefault();
      cityCode.val('');
      pForm.submit();
    });

    //收藏
    //job detail favorite
    $('ul.job_listings li').hover(function(){
      $(this).find('p.collection a.acollection').toggleClass('none');
    });

    $('ul.job_listings').on('click', 'a.acollection ', function (e) {
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
    /*代码结束的地方*/

  })
})


