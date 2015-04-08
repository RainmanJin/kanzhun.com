$(function() {

  $(document).bind("click",function(e){
    var target  = $(e.target);
    if(target.closest(".co_pk_tip").length == 0&&target.closest(".co_pk_tip_p").length==0){
      $(".co_pk_tip").addClass('none');
    } else {
      if(target.closest(".co_pk_tip_p").length>0){
        $(".co_pk_tip").toggleClass('none');
      }else{
        $(".co_pk_tip").removeClass('none');
      }
    }
  });

  var aCoColor=['#7db2e6', '#f4a484','#68bf57','#f483b7'];
  var showSalaryChart = function(json){
    var aColor=aCoColor;
    var series=[];
    var sXcategories = [];
    $.each(json,function(k,v){
      var sery={
        data:[]
      };
      $.each(v,function(k_1,v_1){
        sery.data.push({
          y: v_1.percent,
          marker: {
            symbol: 'circle',
            fillColor: aColor[k],
            lineColor: '#fff',
            lineWidth: 2,
            radius: 5
          }
        });
        sXcategories.push(v_1.item.name);
      });
      series.push(sery);
    });

    this.highcharts({
      chart: {
        type: 'area',
        style: {
          fontFamily:'微软雅黑'
        }
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      colors: aCoColor,
      xAxis: {
        categories: sXcategories,
        labels: {
          style: {
            color: '#999999',
            fontSize: '12px'
          }
        },
        lineColor: '#007ead',
        plotBands: {
          color: '#fff'
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          style: {
            color: '#999999',
            fontSize: '12px'
          },
          format: '{value}%'
        },
        lineWidth: 1,
        lineColor: '#007ead',
        gridLineColor: '#f2f2f2' //y轴 网格线颜色
      },
      /*
      tooltip: {
        formatter: function () {
          return this.y + '%'
        }
      },
      */
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">\u25CF</span> <b>{point.y}</b><br/>',
        valueSuffix: '%'
      },
      plotOptions: {
        area: {
          fillOpacity: 0.3
        }
      },
      credits: {
        enabled: false
      },
      series: series
    });
  };
  showSalaryChart.call($('.PK_charts'),salaryStatAry);

  var wrapper=$('div.wrapper'),
      slideMask=$('div.slide-mask'),
      jobSlide=$('aside.slide-wrapper[data-type="job"]'),
      companySlide=$('aside.slide-wrapper[data-type="company"]');
  function hideSlide(){
    $('div.slide-mask').hide();
    $('aside.slide-wrapper').removeClass('moved');
    setTimeout(function(){
      $('aside.slide-wrapper').hide();
    },300)
  }
  function createJobSelect(initCompanyIds){
    $.ajax({
      url:'comparisonjob.json',
      data:{
        initCompanyIds:initCompanyIds
      },
      success:function(result){
        if(result.rescode){
          var h='';
          h+='<p data-val="">全部职位</p>';
          $.each(result.jobAry,function(k,v){
            h+='<p data-val="'+v+'">'+v+'</p>';
          });
          $('.select_item',jobSlide).html(h);
        }
      }
    });
  }
  function createSalaryHtml(aLi){
    var h='';
    var showUl=$('.pk_cmp');
    var len=showUl.find('li').length;
    var aP=[];
    $.each(aLi,function(k,v){
      var li=$(v);
      var coId=li.data('sid');
      var coName=li.data('sname');
      h+='<li  data-sid="'+coId+'" data-sname="'+coName+'">'+
          '<a href="javascript:;" ka="field-compk1">'+
            '<i class="i i_arrowR"></i><p><span class="item'+(k+1)+'"></span>'+coName+'</p>'+
          '</a>'+
         '</li>';
      aP.push('<i class="item'+(k+1)+'"></i>'+coName);
    });
    if(aLi.length<len){
      for(var i=0;i<len-aLi.length;i++) {
        h+='<li data-sid="0">'+
              '<a href="javascript:;" class="have_no_select">+添加对比公司</a>'+
           '</li>';
      }
    }
    showUl.html(h);
    $('p.charts_explain').html(aP.join(' <em>VS</em> ')+' <span data-action-type="job"></span>'+'工资对比');
  }
  $('a.pk_position').on('click', function(e){
    var wh = wrapper.height();
    slideMask.css('height', wh).show();
    jobSlide.css({'height':wh,'display':'block'});
    setTimeout(function(){
      jobSlide.addClass('moved');
    },100);
  });
  $('div.slide-mask').on('click', hideSlide);
  $('ul.pk_cmp').on('click','li a',function(){
    var wh = wrapper.height();
    slideMask.css('height', wh).show();
    companySlide.css({'height':wh,'display':'block'});
    setTimeout(function(){
      companySlide.addClass('moved');
    },100);
  });
  companySlide.on('click','.select_item p',function(){
    var _t=$(this),
        len=$('p.checked',_t.parent()).length,
        type=_t.hasClass('checked');
    if(type){
      if(len==2){
        return false;
      }
    }else{
      if(len==4){
        return false;
      }
    }
    _t.toggleClass('checked');
  });
  companySlide.on('click','.bt_submit',function(){
    var pList=$('.select_item p.checked',companySlide);
    var aCoId=[];
    pList.each(function(k,v){
      aCoId.push($(v).data('sid'));
    });
    var initCompanyIds=aCoId.join(',');
    $.ajax({
      url:'comparisonchart.json',
      data:{
        initCompanyIds:initCompanyIds
      },
      success:function(result){
        if(result.rescode==1){
          showSalaryChart.call($('.PK_charts'), result.jobSalaryStatAry);
          createJobSelect(initCompanyIds);
          createSalaryHtml(pList);
          $('.pk_position span').html('全部职位');
        }
      }
    });
    hideSlide();
  });
  jobSlide.on('click','.select_item p',function(){
    var _t=$(this);
    var li=$('.pk_cmp li');
    var aCoId=[];
    li.each(function(k,v){
      aCoId.push($(v).data('sid'));
    });
    var initCompanyIds=aCoId.join(',');
    $.ajax({
      url:'comparisonchart.json',
      data:{
        initCompanyIds:initCompanyIds,
        job:_t.data('val')
      },
      success:function(result){
        if(result.rescode==1){
          showSalaryChart.call($('.PK_charts'), result.jobSalaryStatAry);
          $('.pk_position span').html(_t.html());
          $('.charts_explain [data-action-type="job"]').html(_t.data('val'));
        }
      }
    });
    hideSlide();
  });
});
