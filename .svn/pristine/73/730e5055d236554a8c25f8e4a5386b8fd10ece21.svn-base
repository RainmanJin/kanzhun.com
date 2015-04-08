require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});

require(['c/user_response','c/auth_dialog','c/widgets', 'c/field/chart-v2','c/mini_search'], function (user_response) {
  $(function(){
    var fieldName=$('.secondary_nav h1').html();
    var rankShareTxt={
      1:'#看准网#'+fieldName+'公司员工排行榜TOP10,新鲜出炉，究竟谁才是最受员工推荐的公司，猛戳这里，查看详细榜单。',
      2:'#看准网#'+fieldName+'公司综合评分排行榜TOP10,新鲜出炉，究竟谁才是最受员工好评的公司，猛戳这里，查看详细榜单。',
      3:'#看准网#'+fieldName+'公司CEO支持率排行榜TOP10,新鲜出炉，究竟谁才是最受员工爱戴的好老板，猛戳这里，查看详细榜单。'
    };
    var f_canvas = $('canvas.fieldDoughnutChart') || '';
    $('#field_tabs').tabs({
      tabSelector: 'div.ranking_nav p a',
      current: 'current',
      tabPanel: 'div.panel',
//      tabPanelT: 'div.wrap_style',
      callback: function (index, panel, tabs) {
        $('.f_l_con div.wrap_style').eq(index).show().siblings('div.wrap_style').hide();
        console.log();

        if ($.support.css3Property('transition')) {
          this.parent().css({'background-position': 109 * index + 'px bottom'});
        } else {
          this.parent().animate({'background-position-x': 107 * index}, 200);
        }

        $.each(f_canvas, function (i, v) {
          if (!$(v).is(':hidden')&&$(v).data('had')!='ok') {
            $(v).doughnutChart({
              colors: ['#67bf58', '#ededed'],
              centerColor: '#ffffff',
              borderWidth: 6,
              borderWidthT: 7
            });
            $(v).attr('data-had', 'ok');
          }
        });

        var captureareaid=panel.attr('id');
        $('[data-sharetype="randing_nav"]').attr('data-typeid',(index+1)).attr('data-captureareaid',captureareaid);


      },
      animate: 'fadeIn'
    });

    //canvas  charts
    f_canvas.doughnutChart({
      colors: ['#67bf58', '#ededed'],
      centerColor: '#ffffff',
      borderWidth: 6
    });

    var share = user_response.share();
    share.build({
      selectors: 'a.share_to_all',
      config: function(){
        //$('#shareImgHid').val(STATICURL+result.sharepic);
      }
    });
    $('[data-sharetype="randing_nav"]').on('click',function(){
      var _t=$(this);
      //var captureAreaId=_t.data('captureareaid');
      var captureAreaId=_t.attr('data-captureareaid');
      var typeId=_t.attr('data-typeid');
      $.ajax({
        url:'/share/capture.json',
        data:{
          captureUrl:location.href.split('?')[0]+'?type='+typeId,
          captureAreaId:captureAreaId
        },
        dataType:'json',
        success:function(result){
          if(result.rescode) {
            $('#shareImgHid').val(STATICURL + result.sharepic);
          }
        }
      });
      $('#shareTextHid').val(rankShareTxt[typeId]);
    });


  })
});