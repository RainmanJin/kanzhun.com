require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components'
    }
});

require(['c/user_response', 'c/widgets', 'c/general', 'c/job/po_common'],function(user_response){
  $(function(){

  //代码开始的地方
  //有用没用
  $('#interviewPage').upOrDown({
    url: CONTEXTPATH + '/interview/',
    delegate: 'a.mark',
    data: function () {
      return {
        interviewId: this.data('sid')
      };
    }
  });

  //canvas  charts
  $('canvas.reviewsDoughnutChart').doughnutChart({
    colors: ['#f68121', '#ededed'],
    centerColor: '#ffffff',
    borderWidth: 10
  });

  $('canvas.reviewsPieChart').pieChart({
    colors: ['#7cb228', '#abd667', '#ededed'],
    borderWidth: 0,
    borderColor: '#7cb228',
    centerColor: '#ffffff',
    centerDistance: 10
  });

  $('canvas.reviewsFromPieChart').pieChart({
    colors: ['#a7dbff', '#16b6cc', '#05c1f1', '#0ca6f0', '#147cde', '#0870c9'],
    borderWidth: 0,
    borderColor: '#7cb228',
    centerColor: '#ffffff',
    centerDistance: 10
  });

  $('#moreChartInfo').click(function(){
    var $this = $(this);
    if(!$this.hasClass('active')){
      $this.html('收起<i></i>').addClass('active').parent().siblings('p').slice(3, 6).removeClass('none');
    }else{
      $this.html('展开<i></i>').removeClass('active').parent().siblings('p').slice(3, 6).addClass('none');
    }
  });

  //面试感受
  $('dl#js_po_select').on('click', 'dt', function(e){
    e.preventDefault();
    e.stopPropagation();


    $(document).one('click', function () {
      $('#js_po_select dd').addClass('none');
      $('#js_po_select dt i').removeClass('rotate_jiao');
    });

    $(this).next('dd').toggleClass('none').end().find('i').toggleClass('rotate_jiao');

  }).on('click', 'dd', function(e){
    e.stopPropagation();
  });

  var pForm = $('#recruitlistForm'),
      pagenum = pForm.find('input[name=pagenum]'),
      cityCode = pForm.find('input[name=cityCode]'),
      jobTitle = pForm.find('input[name=jobTitle]');

  $('#viewCitySelect').DIYSelect({
    keepDefault: true
  });

  //直接点击按钮 清空citycode
  $('#salarySearchBtn').on('click', function (e) {
    e.preventDefault();
    cityCode.val('');
    pForm.submit();
  });

  $('#viewSortWrapper').on('click', 'a.js-select', function (e) {
    e.preventDefault();
    pagenum.val('1');
    pForm.find('input[name=sortMethod]').val($(this).data('sort'));
    pForm.submit();
  });

  //展开收起
  $('div#hotjobs').on('click', 'a.options', function() {
    var con = $(this).text();
    //alert(con);
    if (con == '展开'){
      $('li.morejobs').slideDown('fast');
      $(this).html('收起<i class="toggles"></i>');
    }else {
      $('li.morejobs').slideUp('slow');
      $(this).html('展开<i></i>');
    }
  });

  var shareComments = user_response.share();
  shareComments.build({
    selectors: 'a.share',
    config: function(){
      $('#shareTextHid').val('有人点评了【'+ $('#companyName').html() +'】，说这里“'+ $(this).data('desc') +'”，快来看看吧！http://'+ window.location.host + $(this).data('url') +' #看准网#@看准 ');
    }
  });

  //
  //job title show nologin
  $('#interviewPage').on('mouseenter', 'div.js-filterblur', function () {
    if ($(this).hasClass('noevent')) {
      return;
    }
    $(this).find('div.nologin').fadeIn(200);
  }).on('mouseleave', 'div.js-filterblur', function () {
    if ($(this).hasClass('noevent')) {
      return;
    }
    $(this).find('div.nologin').hide();
  }).on('click', 'a.btn_o_s', function (e) {
    e.preventDefault();
    auth_dialog.open($(this).attr('href'));
  });

  //分页
  $('div.staticPager').paging({
    staticUrl: true
  });
  //代码开始的地方
})
})