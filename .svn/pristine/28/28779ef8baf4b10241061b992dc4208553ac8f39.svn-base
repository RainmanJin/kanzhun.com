require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
    }
});

require(['c/auth_dialog', 'u/validator', 'c/job/po_common', 'company/salary_desc'],function(auth_dialog){
  $(function(){

    /*代码开始的地方*/
    //有用没用
   $('p.salaryComment').upOrDown({
      url: CONTEXTPATH + '/salary/',
      delegate: 'a.mark',
      data: function () {
        return {
          jobsId: this.data('sid')
        };
      },
      callback: function(ret){
        if(ret && ret.rescode == '1'){
          var marks = $('p.salaryComment a'),
              num = $(this).find('i');
          $.each(marks, function(index, val) {
             $(this).removeClass('mark').addClass('marked');
          });

          num.html((parseInt(num.html(), 10) || 0) + 1);          
        }
      }
    });

    //职位薪资柱状图
    var sXcategories = [],
        sSeryData = [],
        tooltipt = [];
    $.each(jobSalaryStat,function(i,v){
      sXcategories.push(v.item.name);
      sSeryData.push(v.item.count);
      tooltipt.push(v.percent);
    });
    $('#LevelChart').highcharts({
      chart: {
        type: 'column',
        marginTop: 0,
        marginRight: 10,
        spacing: [0, 0, 0, 0]
      },
      title:{
        text:''
      },
      xAxis:{
        categories: sXcategories,
        lineColor:"#007ead",
        lineWidth:1,
        tickColor: "#007ead",
        tickPosition: 'inside',
        tickLength: 4,
        endOnTick: false,
        labels: {
          style: {
            color: "#999999",
            fontSize: "12px"
          }
        }
      },
      plotOptions: {
          series: {
              color: '#c5dcf2',
              states: {
                  hover: {
                      enabled: false
                  }
              }
          },
          column: {
            pointWidth: 30
          }
      },
      tooltip: {
        useHTML: true,
        headerFormat: '',
        backgroundColor: '#bcd891',
        shadow: false,
        borderWidth: 0,
        formatter: function () {
            return tooltipt[this.point.x] + '%'
        }
      },
      yAxis:{
        title:{
          text:""
        },  
        lineColor:"#007ead",
        lineWidth:1,
        gridLineColor: "#e7e7e7",
        tickPosition: 'outside',
        tickWidth: 1,
        tickLength: 6,
        endOnTick: false,
        showFirstLabel: false,
        maxPadding: 0.2,
        labels: {
          style: {
            color: '#999999',
            fontSize: '12px'
          },
          format: '{value}%'
        }
      },
      series: [{
        data: tooltipt
      }],
      legend: {
        enabled: false
      },
      credits: {
        enabled: false //隐藏highcharts标识
      }
    })
    //柱状图结束

    //工资图标
    var salaryDesc = require('company/salary_desc');
    salaryDesc({
      table: $('#salaryDescTable')
    });

    //按条件查询
    var sForm = $('#recruitlistForm'),
        cityCode = sForm.find('input[name=cityCode]');

    $('dl#salaryCitySelect').DIYSelect({
        keepDefault: true
    });

    //直接点击按钮 清空citycode
    $('#salarySearchBtn').on('click', function (e) {
      e.preventDefault();
      cityCode.val('');
      sForm.submit();
    });

    //sort
    $('#salarySortWrapper').on('click', 'a', function(e){
      e.preventDefault();
      sForm.find('input[name=pagenum]').val('1');
      sForm.find('input[name=sortMethod]').val($(this).data('sort'));
      sForm.submit();
    });

    //Date of Employee
    var inservicetimeSelect = $( 'dl#inservicetime' ),
        startDate = inservicetimeSelect.find('[name="entryDate"]'),
        quittimeSelect = $( 'dl#quittime' ),
        endDate = quittimeSelect.find('input[name="dimissionDate"]'),
        zhi = $( 'span.zhi' ),
        experience = $( 'dl.experience' ),
        experienceval = experience.find( '[name="jobExperience"]' ),
        companyJobSuggest = $('#jobautocomplete'),
        companyNameSuggestHid = $('input[name=encryptCompId]'),
        companyNameSuggest = $('#companyNameSuggest');

    $('p.radios').on('click', 'input, label', function(){
      var self = $(this);
      self.parent().find('input.hidvl').val(self.data('vl'));
      
      if(self.data('vl') == '2'){
        quittimeSelect.show();
        zhi.show();
        $('div.prompt_wrap').show();
      }else{
        quittimeSelect.hide();
        zhi.hide();
        $('div.prompt_wrap').hide();
      }
    });

    var salaryControler = {
      checkDate: function(by, ey){
          ey = parseInt($('input[name=' + ey +']').val(), 10);
          var year = ey - parseInt($('input[name=' + by +']').val(), 10);

          if(year < 0){
              return false;
          }else if(year === 0){
              return false;
          }else{
              return true;
          }
      }
    };

    $('dl.selecttime').DIYSelect({
      listCallback: function(itemsWrap, field, target){
        var hids = $('input:hidden', target);
        hids.val($(this).data('val')).parent().parent().parent().find('>p.err').hide();
        var name = field.attr('name'),
            val = parseInt($(this).data('val'), 10),
            index = $(this).index();
            /*console.log( itemsWrap );*/

        if(quittimeSelect.is(':hidden')){
          if ( name == 'entryDateYear' ){
            startDate.val(val);
          }
          return false;
        }

        if(name == 'entryDateYear'){
            startDate.val(val);
            return true;
        }else if(name == 'dimissionDateYear'){
            endDate.val(val);
            return true;
        }
        
      }
    });

    experience.DIYSelect({
      listCallback: function(){
        experienceval.val(parseInt($(this).data('val'), 10));
      }
    });

    //选择公司
    companyNameSuggest.autocomplete({
      serviceUrl: CONTEXTPATH + '/autocomplete/company.json',
      paramName: 'query',
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            var arr = dataItem.data.split('|');
            return { value: arr[0], data: arr[1], num: arr[2]};
          })
        };
      },
      //这个方法很吊！
      formatResult: function (suggestion, currentValue) {
        return suggestion.value + '（' + suggestion.num + '）';
      },
      onSelect: function (suggestion) {
        companyNameSuggestHid.val(suggestion.data);
      },
      onSearchStart: function () {
        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
        companyNameSuggestHid.val('');
      },
      onInvalidateSelection: function () {
        companyNameSuggestHid.val('');
      },
      onSearchComplete: function (query, suggestions) {
        if (suggestions.length === 0) {
          companyNameSuggestHid.val('');
          return;
        }
        //auto select when only one result
        if (suggestions.length === 1) {
          companyNameSuggestHid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true
    });
    //结束选择公司


    //choose city autocomplete
    var searchSuggestCity = $('#companyCitySuggest'),
        hid = $('input[name="encryptCityCode"]');
    searchSuggestCity.autocomplete({
      serviceUrl: CONTEXTPATH + '/autocomplete/city.json',
      paramName: 'query',
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            return { value: dataItem.value, data: dataItem.data};
          })
        };
      },
      onSelect: function (suggestion) {
        hid.val(suggestion.data);
      },
      onSearchStart: function () {
        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
        hid.val('');
      },
      onInvalidateSelection: function () {
        hid.val('');
      },
      onSearchComplete: function (query, suggestions) {
        if (suggestions.length === 0) {
          hid.val('');
          return;
        }
        //auto select when only one result
        if (suggestions.length === 1) {
          hid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true
    });

    //职位
    var companyJobSuggest = $('#jobautocomplete');
    if (companyJobSuggest.length) {
      companyJobSuggest.autocomplete({
        serviceUrl: CONTEXTPATH + '/autocomplete/jobtitle.json',
        paramName: 'query',
        params: function (query) {
          return {
            query: query,
            code: companyJobSuggest.data('coid')
          };
        },
        dataType: 'json',
        transformResult: function (response) {
          response = response || {};
          return {
            suggestions: $.map(response.suggestions || [], function (dataItem) {
              return { value: dataItem.value, data: dataItem.data};
            })
          };
        }
      });
    }

    var salaryDetail = $('ul.add_salary_detail input:text'),
        sDetailErr = $('span#sDetailErr'),
        salaryBase  = $('#salaryBase'),
        salaryTotal = $('input#salaryPayBase'); 

    salaryDetailFn = function(){
      var others = 0, total = parseInt(salaryTotal.val());
      salaryDetail.not('[name=salaryPayBase]').each(function(i, v){
        var val = parseInt(v.value) || 0;
        if(!(/^(([1-9]\d*)|0)$/).test(val)){
          sDetailErr.html('请输入正确的数额！').show();
          return false;
        }else {
          others += val;
        }
      });

      var base = total - others;
      if(base < 0){
        sDetailErr.html('工资明细不能大于月薪，请重新输入。').show();
        salaryBase.val('');
        return;
      }else {
        sDetailErr.hide();
      }

      salaryBase.val(base || 0);
    }
    salaryDetail.keyup(function () {
      var val = this.value.replace(/^0(?=\d+)|\D/g, '');
      $(this).val(val);
      salaryDetailFn(val);
    });

    salaryTotal.on('keyup', function(){
      var val = this.value.replace(/^0(?=\d+)|\D/g, '');
      $(this).val(val);
      salaryDetailFn(val);
    });

    //工资页面工资明细添加工资明细
    $('#addincome').click(function () {
      var detail = $('ul.add_salary_detail');
      if(detail.is(':hidden')){
        $(this).html('收起<i class="putaway"></i>');
        detail.removeClass('none');
      }else{
        $(this).html('添加工资明细<i class="open"></i>');
        detail.addClass('none');
        sDetailErr.hide();
        salaryBase.val(salaryTotal.val());
      }
    });

    $('#salryUgcMiniForm').validatorAll({
      elems: 'input:text, input:hidden',
      prompt: {
        succ: function(target, e){
            var err;
            if(target.attr('type') === 'hidden'){
                err = $('>p.err', target.parent().parent().parent());
            }else{
                err = $('>p.err', target.parent());
            }
            err.hide();
        },
        err: function(target, msg, e){
            var err;
            if(target.attr('type') === 'hidden'){
                err = $('>p.err', target.parent().parent().parent());
            }else{
                err = $('>p.err', target.parent());
            }
            err.html(msg || err.data('msg')).show();
        },
        normal: function(target, e){
            var err;
            if(target.attr('type') === 'hidden'){
                err = $('>p.err', target.parent().parent().parent());
            }else{
                err = $('>p.err', target.parent());
            }
            err.hide();
        }
      },
      more: {
          salaryPayBase: {
            type: 'isNumber',
            msg: '月薪必须是纯数字！'
          },

          cityName: function (_this, prompt, e) {
          var s = setTimeout(function () {
            clearTimeout(s);
            if (hid.val() === '') {
              searchSuggestCity.val('').trigger('blur');
            }
            return true;
          }, 300);
          return true;
        },

        companyName: function(_this, prompt, e){
          var self = $(this);
          //autocomplete的onselect在onblur后触发 所以onblur需要等待几秒才能取到最新的值
          var s = setTimeout(function(){
            clearTimeout(s);

              //确认公司名是否存在 提交表单时不用再验证 否则ajax会覆盖掉用户修改的信息
              if(!e){
                return;
              }
              $.getJSON(CONTEXTPATH + '/company/queryname.json?query='+ encodeURIComponent(self.val()), function(ret){

                //没有此公司
                if(ret && ret.encryptId === undefined){
                  self.removeClass('suc').addClass('err');
                  var newVal = companyNameSuggest.val();
                  //禁止输入职位
                  if(companyJobSuggest.length){
                    companyJobSuggest.val('').prop('disabled', true);
                  }
                  
                }else{
                  companyNameSuggestHid.val(ret.encryptId);
                  //职位
                  if(companyJobSuggest.length){
                    companyJobSuggest.data('coid', ret.industryCode).prop('disabled', false);
                  }
                }
              });
          }, 300);
          return true;
        }

      },

      ajaxSubmit: {
          elems: 'input:text, input:hidden, input[type="radio"]',
          dataType: 'json',
          beforeSend: function(){},
          success: function(data){
            if(data.rescode =='1'){
              $( 'p.thanks' ).show();
              cityValue = $('#companyCitySuggest').val(),
              cityValueCode = $('input#cityCodes').val();
              $('#salryUgcMiniForm')[0].reset();
              $('input#inservice').trigger('click');
              inservicetimeSelect.find('dt').find('input[type="button"]').val("2012年");
              startDate.val(2012);
              quittimeSelect.find('dt').find('input[type="button"]').val("2013年");
              endDate.val(2013);
              experience.find('dt').find('input[type="button"]').val("1年");
              experience.find('dt').find('input[type="hidden"]').val(2);
              //if (cityValue !== ''){
                $('#companyCitySuggest').val(cityValue);
                $('input#cityCodes').val(cityValueCode);
              //}
             /*setTimeout(function(){
               $( 'p.thanks' ).hide();
             }, 3000);*/
         }
      }
    }
  }).init().submit(function(){
    //未登录处理
    if(!quittimeSelect.is(':hidden') & !salaryControler.checkDate('entryDate', 'dimissionDate')){
        $('#salryUgcMiniForm dl#quittime').next('p.err').html('请选择正确的日期范围！').show();
        return false;
    }/*else if(!isLogged){
        auth_dialog.open('#login?authcb=authCallback');
        window.authCallback = function(ret){
        isLogged = true;
        $('#authFrame').remove();
        $('#salryUgcMiniForm').trigger('submit');
      };
      return false;
    }*/else {
      return true;
    }
  });

   //离开时间提示
    var wrapbox = $('div.prompt_box');
    $('div.prompt_wrap i').hover(function(){
      wrapbox.removeClass('none');
      $(document).one('click', function (e) {
        if($(e.target).attr("class")!='prompt_box'){
          wrapbox.addClass('none');
        }
      });
    });

    $('a.closeprompt').click(function(){
      wrapbox.addClass('none');
    });
    /*代码结束的地方*/
  })
})


