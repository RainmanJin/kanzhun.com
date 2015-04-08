require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});

require(['c/user_response','c/auth_dialog','c/widgets', 'c/field/chart-v2','highcharts','c/mini_search'], function (user_response) {
  $(function() {
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
        //$('.f_l_con div.wrap_style').eq(index).show().siblings('div.wrap_style').hide();

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
    //左右切换
    var scrollLR=function(params){
      var _t=this,
        o=$.extend({
          inner:$('.clc_inner',_t),
          l_btn:$('.cl_l',_t),
          r_btn:$('.cl_r',_t)
        },params),
        page= 1,
        ulList=$('ul', o.inner),
        eW=$('ul', o.inner).width(),
        pages=ulList.length;
      o.r_btn.on('click',function(){
        o.inner.animate({"margin-left":-(page*eW)});
        page++;
        o.l_btn.show();
        if(page==pages){
          o.r_btn.hide();
        }
      });
      o.l_btn.on('click',function(){
        o.inner.animate({"margin-left":-(page-2)*eW});
        page--;
        o.r_btn.show();
        if(page==1){
          o.l_btn.hide();
        }
      });
    };
    function createJobSelect(initCompanyIds){
      $.ajax({
        url:'comparisonjob.json',
        data:{
          initCompanyIds:initCompanyIds
        },
        success:function(result){
          if(result.rescode){
            var h=''+
                '<dt>'+
                  '<input type="button" value="全部职位" readonly="readonly">'+
                  '<input type="hidden" ><span class="btn on"><i></i></span>'+
                '</dt>';
            h+='<dd>';
            h+='<a href="javascript:;" rel="nofollow" data-val>全部职位</a>';
            $.each(result.jobAry,function(k,v){
              h+='<a href="javascript:;" rel="nofollow" data-val="'+v+'">'+v+'</a>';
            });
            h+='</dd>';
            $('.co_pk_select .select_green').html(h);
          }
        }
      });
    }
    function createSalaryHtml(aLi){
      var h='';
      var showUl=$('[data-action-type="show_coPk_dialog"]');
      var len=showUl.find('li').length;
      var aP=[];
      $.each(aLi,function(k,v){
        var li=$(v);
        var coId=li.data('sid');
        var coName=li.data('sname');
        var coImgSrc=li.find('img').attr('src');
        h+='<li data-sid="'+coId+'" data-sname="'+coName+'"  data-action-type="show">'+
          '<div>'+
            '<img src="'+coImgSrc+'">'+
            '<em>换一个</em>'+
          '</div>'+
          '<p>'+
            '<i class="item_'+k+'"></i>'+coName+
          '</p>'+
        '</li>';
        aP.push('<i class="item_'+k+'"></i>'+coName);
      });
      if(aLi.length<len){
        for(var i=0;i<len-aLi.length;i++) {
          h+='<li class="co_pk_i_def" data-sid="0">' +
          '<a href="javascript:;" data-action-type="show">' +
          '<span></span>' +
          '</a>' +
          '<p>添加对比公司</p>' +
          '</li>';
        }
      }
      showUl.html(h);
      $('p.co_pk_tt').html(aP.join(' <span>VS</span> ')+' <em data-action-type="job"></em>'+'工资对比');
    }
    function bind(){
      $('.co_pk_tip_p a').hover(function(){
        $('.co_pk_tip').show();
      },function(){
        $('.co_pk_tip').hide();
      });
      $('[data-action-type="show_coPk_dialog"]').on('click','[data-action-type="show"]',function(){
        $.maskUI.open({
          elem: $('.coPk_dialog')
        });
      });

      var coPk_dialog=$('.coPk_dialog'),
          bt_pk=$('[data-action-type="bt_pk"]',coPk_dialog),
          co_show=$('.co_show',coPk_dialog);
      $('.clc_inner').on('click','li a',function(){
        var _t=$(this),
            li=_t.closest('li');
        //var len=$('li',co_show).length;
        var len=$('.clc_inner li.current').length;
        if(li.hasClass('current')){
          li.removeClass('current');
          len=$('.clc_inner li.current').length;
          if(len>1){
            bt_pk.removeClass('disable');
          }else{
            bt_pk.addClass('disable');
          }
          $('li[data-sid="'+li.data('sid')+'"]',co_show).remove();
        }else{
          if(len>=4){
            return;
          }
          var start_t=li.offset().top,
              start_l=li.offset().left,
              end_ul=$('ul',co_show),
              end_li=$('li:last',co_show),
              end_t=0,
              end_l=0;
          if(len==0){
            end_t=end_ul.offset().top;
            end_l=end_ul.offset().left+27;
          }else{
            end_t=end_li.offset().top;
            end_l=end_li.offset().left+27;
          }
          var  imgSrc=$('img',li).attr('src');
          var imgDiv=$('<span style="display: inline-block; border: 1px solid #E7E7E7"><img src="'+imgSrc+'" width=86 height=86 />'+'</span>');
          $('body').append(imgDiv);
          imgDiv.css({'position':'absolute','top':start_t,'left':start_l,'z-index':1000});
          imgDiv.animate({'top':end_t,'left':end_l,'width':0,'height':0,'opacity':0},function(){
            imgDiv.remove();
            end_ul.append('<li data-sid="'+li.data('sid')+'" data-sname="'+li.data('sname')+'"><img src="'+imgSrc+'" width="22" height="22"></li>');
          });

          li.addClass('current');
          len=$('.clc_inner li.current').length;
          if(len>1){
            bt_pk.removeClass('disable');
          }else{
            bt_pk.addClass('disable');
          }
        }

      });
      bt_pk.on('click',function(){
        var ul=$('ul',co_show),
            li=$('li',ul);
        if(li.length<2){
          return;
        }
        var aCoId=[];
        li.each(function(k,v){
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
              showSalaryChart.call($('.co_pk_chart'), result.jobSalaryStatAry);
              createJobSelect(initCompanyIds);
              createSalaryHtml(li);
              $('.dialog_close',coPk_dialog).trigger('click')
            }
          }
        });
      });
    }
    function shareF(){
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
        //var typeId=_t.data('typeid');
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
      $('[data-sharetype="co_pk"]').on('click',function(){
        var _t=$(this);
        var li=$('[data-action-type="show_coPk_dialog"] li:not(.co_pk_i_def)');
        var aCoId=[];
        var aCoName=[];
        li.each(function(k,v){
          aCoId.push($(v).data('sid'));
          aCoName.push('【'+$(v).data('sname')+'】');
        });
        var initCompanyIds=aCoId.join(',');
        var coNames=aCoName.join('VS');
        var job=$('.co_pk_select .select_green dt input:hidden').val();
        $.ajax({
          url:'/share/capture.json',
          data:{
            captureUrl:location.href.split('?')[0]+'?initCompanyIds='+initCompanyIds+'&job='+job,
            captureAreaId:'co_pk_chart'
            //initCompanyIds:initCompanyIds,
            //job:job
          },
          dataType:'json',
          success:function(result){
            if(result.rescode) {
              $('#shareImgHid').val(STATICURL + result.sharepic);
            }
          }
        });

        $('#shareTextHid').val('#看准网#'+coNames+job+'工资大PK');
        //#看准网#【公司名1】VS【公司名2】+职位名+
      })
    }
    function init(){
      $('.co_pk_select .select_green').DIYSelect({
        listSelector:"dd>a",
        listCallback: function (l, field, select) {
          var _t=$(this);
          var li=$('[data-action-type="show_coPk_dialog"] li');
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
                showSalaryChart.call($('.co_pk_chart'), result.jobSalaryStatAry);
                var job=$('.co_pk_select .select_green dt input:hidden').val();
                $('.co_pk_tt [data-action-type="job"]').html(job);
              }
            }
          });
        }
      });
      bind();
      showSalaryChart.call($('.co_pk_chart'),salaryStatAry);
      scrollLR.call($('[data-action-type="scrollLR"]'));
      shareF();
    }
    init();
  })
});