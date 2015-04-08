$(function() {

  var f_canvas = $('canvas.reviewsDoughnutChart') || '';
  //canvas  charts
  f_canvas.doughnutChart({
    colors: ['#67bf58', '#ededed'],
    centerColor: '#ffffff',
    borderWidth: 4
  });

  $('#field_tabs').tabs({
    tabSelector: 'nav.f_minor_nav p a',
    current: 'current',
    tabPanel: 'div.f_minor_con',
    callback: function (index, panel, tabs) {
      $('#field_tabs .shadow_area').eq(index).show().siblings('.shadow_area').hide();

      this.parent().css({'background-position': 109 * index + 'px bottom'});

      $.each(f_canvas, function (i, v) {
        if (!$(v).is(':hidden')&&$(v).data('had')!='ok') {
          $(v).doughnutChart({
            colors: ['#67bf58', '#ededed'],
            centerColor: '#ffffff',
            borderWidth: 4
          });
          $(v).attr('data-had', 'ok');
        }
      });

    },
    animate: 'fadeIn'
  });

  $('[data-action-type]').on('touchstart',function(){
    $(this).addClass('touchstart').siblings().removeClass('touchstart');
  });
});
