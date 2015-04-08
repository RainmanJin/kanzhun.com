require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});

require(['u/wx-share', 'u/tabs', 'u/autocomplete'], function(wxShare){
  $(function(){
    $('dl.rank').tabs({
      tabSelector: 'dt>span',
      tabPanel: 'dd>ul'
    });

    var dialog = $('section.enter-co');
    $('#ourCo').on('click', function(){
      dialog.show();
    });

    $('#close-d').on('click', function(){
      dialog.hide();
    });

    wxShare($('#gogogo'), '<p style="line-height: 2em;">点击右上角的【分享按钮】<br/>邀请小伙伴一起来参与吧！</p>');


    ///公司 autocomplete
    $('#coSuggest').autocomplete({
      serviceUrl: '/activity/bsalary/companyList.json',
      paramName: 'query',
      dataType: 'json',
      //格式化修改返回的JSON
      transformResult: function(response) {
        return {
          suggestions: $.map(response.companyJson||[], function (dataItem) {
            return { value: dataItem.name, data: dataItem.salaryCount, id: dataItem.id};
          })
        };
      },
      preserveInput: true,
      maxHeight: 'auto',
      appendTo: $('div.co-suggestions'),
      width: '100%',
      onSelect: function (suggestion) {
        $('#coForm').submit();
      }
    });


    var co = $('input[name=name]');
    $('#searchCo').on('click', function(){
      if($.trim(co.val()) === ''){
        co.addClass('shine').one('animationEnd webkitAnimationEnd', function(){
          co.removeClass('shine');
        });
      }else{
        $('#coForm').submit();
      }
    });

    var howMany = $('#howMany');
    $('#upIt').on('click', function(){
      var $this = $(this);
      if($this.hasClass('masked')){
        return;
      }
      $.get('/activity/celebrate/support.json?id=' + encodeURIComponent($('input[name=id]').val()), function(ret){
        if(ret){
          if(ret.rescode == 1){
            $this.addClass('masked');
            howMany.html(ret.count).addClass('bounceIn animated').one('animationEnd webkitAnimationEnd', function(){
              howMany.removeClass('bounceIn animated');
            });
          }else{
            alert(ret.resmsg || '提交失败！');
          }
        }else{
          alert(ret.resmsg || '提交失败！');
        }
      });
    });
  });
});