$(function(){
  var screenH = $(window).height();
  //选择城市和地区

  var companySelect=$("#companySelect"),
    cityId=$("input[name=cityId]"),
    companyId=$("input[name=companyId]"),
    company=$("#company"),
    rWarm=$("div.rep_err");

  var reportSelect = $('div.rep_select');
  reportSelect.on('click', 'dt', function(e){
    var _this = $(this);
    if(_this.hasClass('on')){
      _this.removeClass('on').parent().find('dd').hide();
    }else{
      _this.parent().siblings('dl').find('dd').hide().siblings('dt').removeClass('on');
      _this.addClass('on').next('dd').css('min-height', screenH - 102).show();
    }
  }).on('click', 'li', function(){
    var dd = $(this).parent().parent();
    dd.hide().siblings('dt').removeClass('on').find('em').html(this.innerHTML);
    dd.find('input[type=hidden]').val($(this).data('content-id'));

    getReportData(cityId.val(),companyId.val());
  }).on('touchstart', 'li', function(){
    $(this).addClass('on').siblings('li').removeClass('on');
  });



  $('#sendReport').on('click', function(){
    $.maskUI.open({
      elem: 'reportDialog'
      /*overlayCss:{
        opacity: 0.7
      },
      content: '<form action="/xs/report/email.json" method="post" id="sendReportForm"><div class="m_dialog_con"><h3>您的薪酬报告将发送至：</h3><p><input class="rep_email" type="text" name="email" value="'+
        $('input[name=reportEmail]').val() +
        '" name="" /><span class="red" data-msg="请输入接收邮箱"></span></p></div>'+
        '<div class="m_dialog_btn">'+
        '<a class="btn maskui_close" href="javascript:;">取消</a>'+
        '<input value="确定发送" type="submit" class="btn btn_ok" />'+
        '</div></form>'*/
    });
  });

  $('#sendReportForm').validatorAll({
    elems: 'input[name=email], select',
    prompt: {
      succ: function(target){
        if(target[0].nodeName === 'SELECT'){
          target.parent().siblings('em').hide();
        }else{
          target.siblings('em').hide();
        }

      },
      err: function(target, msg){
        var prompt = target[0].nodeName === 'SELECT' ? target.parent().siblings('em'): target.siblings('em');
        prompt.html(msg || prompt.data('msg')).show();
      },
      normal: function(target){
        if(target[0].nodeName === 'SELECT'){
          target.parent().siblings('em').hide();
        }else{
          target.siblings('em').hide();
        }
      }
    },
    more: {
      email:{
        type: 'isMail',
        msg: '请输入正确格式的邮箱'
      }
    },

    ajaxSubmit:{
      elems: 'input:text, select',
      beforeSend: function(){
        $.maskUI.alert('发送成功！');
      },
      success: function(data){
        if(data){
          if(data.rescode == 1){

          }else{
            $.maskUI.alert(data.resmsg || '发送失败！');
          }
        }else{
          $.maskUI.alert('发送失败！');
        }
      }
    }
  }).init().submit();


  function createSalaryReport(json, city, job, industry, tt){
    var counterItems=json.counterItems;
    if($.isEmptyObject(counterItems)){
      return;
    }
    var aXcategories=[],
      aSeryData=[],
      keyName="", //我所在的工资范围
      titleHtml="",
      lineHtml="";
    $.each(counterItems||[],function(i,v){
      aXcategories.push(v.item.name);
      aSeryData.push(v.percent);
      if(json.selfRange==v.item.id){
        keyName=v.item.name;
      }
    });

    titleHtml+='<span>平均工资￥<b>'+json.avg+'</b></span>';
    lineHtml+='<div class="line">'+
      '<div class="inner" style="width:'+json.beyondPercent+'%;">'+
      '<i style="left:'+json.beyondPercent+'%;">'+json.beyondPercent+'%</i>'+
      '</div>'+
      '</div>'+
      '<p class="intr"><span style="color:#85c15d;">了解更多薪酬信息，请点击下面按钮查看详细薪酬报告。</span></p>';


    $('dl.rem_chart').append(
      '<dt>'+ tt +'</dt>' +
      '<dd><div class="r_chart_c"></div>' +
      '<div class="r_chart_title">' + titleHtml +'</div><div class="r_chart_line">'+ lineHtml +'</div></dd>');

    $("div.r_chart_c:last").highcharts({
      chart:{
        type:"column"
      },
      title:{
        text:''
      },
      xAxis:{
        categories:aXcategories,
        lineColor:"#007ead",
        lineWidth:1
      },
      yAxis:{
        title:{
          text:""
        },
        tickInterval: 10,//自定义刻度
        labels: {
          formatter: function() {
            return this.value +'%';
          }
        },
        lineColor:"#007ead",
        lineWidth:1
      },
      series: [{
        color:"#c5dcf2",
        data:aSeryData
      }],
      legend: {
        enabled: false
      },
      credits: {
        enabled: false //隐藏highcharts标识
      },
      /*
       tooltip:{	//鼠标经过提示
       //enabled: false,
       style: {
       color: '#999',
       fontSize: '14px',
       padding: '8px'
       },
       valueDecimals:1,
       headerFormat:"",
       pointFormat:'<span>我</span> ￥10,000'
       },
       */
      plotOptions:{
        column: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              var key=this.key;
              if(keyName==key){
                return '<p style="color:#85c15d;text-align:center" text-anchor="middle">我在这</p>￥'+json.salary;
              }else{
                return;
              }
            },
            useHTML:true
          },
          enableMouseTracking: false
        }
      }
    });
  }
  function getReportData(cityId,companyId){
    $.ajax({
      url:"/xs/reportdata.json",
      data:{
        cityCode:cityId,
        company:companyId
      },
      dataType:"json",
      success:function(result){
        if(result && !$.isEmptyObject(result)){
          var companyItems=result.salaryStatInfo.companyItems,
            withCompany=result.salaryStatInfo.withCompany;
          //createSalaryReport(result);
          $('dl.rem_chart').html('');
          var city = result.cityName,
            job = result.jobTitle,
            industry = result.industryName;
          createSalaryReport(result.jobTitleRes, city, job, industry, '<img src="/images/report-t-1.png">' + job + '岗位的工资水平');
          createSalaryReport(result.cityRes, city, job, industry, '<img src="/images/report-t-2.png">' + city + job + '岗位的工资水平');
          createSalaryReport(result.industryRes, city, job, industry, '<img src="/images/report-t-3.png">' + industry + '岗位的工资水平');

          createCompanySelect(companyItems);
          if(withCompany==0){
            company.addClass("red");
            createNoResult(companyItems);
          }else{
            company.removeClass("red");
            rWarm.html("").hide();
          }
        }else{
          company.addClass("red");
          createNoResult(companyItems);
        }
      }
    })
  }
  //创建公司下拉列表
  function createCompanySelect(companyJson){
    var h="";
    $.each(companyJson||[],function(i,v){
      h+='<li data-content-id="'+v.companyId+'">'+v.companyName+'</li>'
    });
    $("ul",companySelect).html(h);
  }
  //职位样板不足
  function createNoResult(companyJson){
    var h="";
    h+='<i class="i_warn"></i><i class="i_close_thin"></i>';
    h+='<div>您的职位数据样本不足。';
    h+='<p>为您推荐：';
    $.each(companyJson||[],function(i,v){
      h+='<a class="js_set" href="javascript:;" data-content-id="'+v.companyId+'">'+v.companyName+'</a>'
    });
    h+='</p></div>';
    rWarm.html(h).show();
  }
  rWarm.on("click",".js_set",function(){
    //getReportData(cityId.val(),companyId.val());
    var dataVal=$(this).data("content-id");
    companySelect.find('li[data-content-id='+dataVal+']').trigger("click");
  })
  function initSalaryReport(json){
    var city = json.cityName,
      job = json.jobTitle,
      industry = json.industryName;
    createSalaryReport(json.jobTitleRes, city, job, industry, '<img src="/images/report-t-1.png">' + job + '岗位的工资水平');
    createSalaryReport(json.cityRes, city, job, industry, '<img src="/images/report-t-2.png">' + city + job + '岗位的工资水平');
    createSalaryReport(json.industryRes, city, job, industry, '<img src="/images/report-t-3.png">' + industry + '岗位的工资水平');
  }
  initSalaryReport(chartsJSON);


  (function(){
    var h='<div><div>'+
      '<div class="mask" id="mask" style="display:none;"></div>'+
      '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
      '<p>'+
      '点击右上角的【分享按钮】<br>'+
      '分享到朋友圈g</p>'+
      '<i class="arrows"></i>'+
      '</div></div></div>';

    $('body').append(h)

    var mask = $('#mask'),
      dialog = $('#transmitDialog');
    $("a.bt_transmit").on('click', function(e){
      e.preventDefault();
      $('#share').html($(this).data('msg'));
      mask.show();
      dialog.show();
    });

    mask.on('click',function(e){
      mask.hide();
      dialog.hide();
    });
  })();

});
