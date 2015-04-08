require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/auth_dialog', 'ugc/common_ugc'], function (auth_dialog) {
  //dom ready
  $(function () {

    //Date of Employee
    var startDateSelect = $('#startDateSelect'),
      startDate = startDateSelect.find('[name=entryDate]'),
      endDateSelect = $('#endDateSelect'),
      endDate = endDateSelect.find('input[name=dimissionDate]');

    $('.select', '#EpDate').DIYSelect({
      listCallback: function (list, field, target) {
        if (endDateSelect.is(':hidden')) {
          return false;
        }

        var self = $(this);
        var name = field.attr('name'),
          val = self.data('val'),
          index = self.index();

        if (name == 'entryDateYear') {
          if (val >= parseInt(endDate.val(), 10)) {
            var ret = index === 0? val : val + 1;
            endDate.val(ret);
            $('input[name=dimissionDateYear]').val(ret+ '年');
          }
        } else if (name == 'dimissionDateYear') {
          if (val <= parseInt(startDate.val(), 10)) {
            var ret = index === list.children().length - 1 ? val : val - 1;
            startDate.val(ret);
            $('input[name=entryDateYear]').val(ret + '年');
          }
        }

      }
    });

    $('#employee').on('click', 'a', function (e) {
      e.preventDefault();
      var self = $(this);
      self.addClass('status_checked').siblings().removeClass('status_checked').parent().find('input').val(self.data('vl'));

      if (self.data('vl') == '2') {
        endDateSelect.show();
      } else {
        endDateSelect.hide();
      }
    });


    $('#chooses').on('click', 'a', function (e) {
      e.preventDefault();
      $(this).addClass('current').siblings().removeClass('current').parent().find('input').val($(this).data('vl'));
    });


    var addNewCompany = $('#addNewCompany'),
      companyCitySuggest = $('#companyCitySuggest'),
      companyCitySuggestHid = $('input[name=encryptCityCode]'),
      companyNameSuggest = $('#companyNameSuggest'),
      companyNameSuggestHid = $('input[name=encryptCompId]'),
      companyJobSuggest = $('#companyJobSuggest');

    var selectControler = function () {
      if ($.trim(this.value) === '') {
        return false;
      } else {
        return true;
      }
    };

    $('body > div.cmp_select').scroll(function(){
      //$('#companyNameSuggest').focus();
      $('.cmp_select_list').hide();
      $('#companyNameSuggest').focus();
    })

    //表单验证
    var v = $('#ugcForm').validatorAll({
      elems: '.v',
      prompt: {
        succ: function (target) {
          if (target.attr('type') !== 'hidden') {
            target.removeClass('err').addClass('suc');
            target.parent().find('>p.err, >span.prompt').hide();
          } else {
            //select的样式
            target.parent().parent().removeClass('s_err').addClass('s_suc');
          }
        },
        err: function (target, msg) {
          if (target.attr('type') !== 'hidden') {
            target.removeClass('suc').addClass('err');
            var prompt = target.parent().find('p.err');
            if(prompt.length){
              prompt.find('span').html(msg || prompt.data('msg')).end().show();
            }else{
              prompt = target.parent().find('span.prompt');
              prompt.html(msg || prompt.data('msg')).css('display', 'inline-block');
            }
          } else {
            target.parent().parent().removeClass('s_suc').addClass('s_err');
          }
        },
        normal: function (target) {
          if (target.attr('type') !== 'hidden') {
            target.removeClass('err suc');
            target.parent().find('>p.err, >span.prompt').hide();
          } else {
            target.parent().parent().removeClass('s_err s_suc');
          }
        }
      },
      focusMore: {
        //focus 时隐藏新增公司窗口 去掉LOGO等信息
        companyName: function () {
          companyNameSuggestHid.val('');
          addNewCompany.hide();                     //.find('.v').val('');

          $('#selectedCompanyInfo').html('<span></span>');
          companyCitySuggest.val('').trigger('blur');
          companyJobSuggest.prop('disabled', true);
          return true;
        }
      },
      more: {
        companyName: function (_this, prompt, e) {
          var self = $(this);

          //autocomplete的onselect在onblur后触发 所以onblur需要等待几秒才能取到最新的值
          var s = setTimeout(function () {
            clearTimeout(s);
            if ($('#addNewCompany').is(':hidden') && $('body > div.cmp_select').is(':hidden')) {

              //确认公司名是否存在 提交表单时不用再验证 否则ajax会覆盖掉用户修改的信息
              if (!e) {
                return;
              }
              $.getJSON(CONTEXTPATH + '/company/queryname.json?query=' + encodeURIComponent(self.val()), function (ret) {

                //没有此公司
                if (ret && ret.encryptId === undefined) {

                  $.getJSON(CONTEXTPATH + '/autocomplete/company.json?query='+ encodeURIComponent(self.val()), function(ret){
                    if(ret.suggestions.length>0){
                      var $co_list=$('.cmp_select_list');
                      var html='<p>请从以下列表中选择公司：</p>';
                      html+='<div class="autocomplete-suggestions cmp_select">';
                      $.each(ret.suggestions,function(k,v){
                        var cName= v.data.split('|')[0];
                        html+='<div class="autocomplete-suggestion"><dl><dt><img src='+STATICURL + v.logo + '></dt><dd><p data-type="cname">' + cName + '</p><p class="f_12 grey_99">' + v.url + '</p></dd></dl></div>';
                      });
                      html+='<p>没有你的公司？<a href="/companyugc/">创建新公司档案</a></p>';
                      html+='</div>';
                      $co_list.html(html).show();
                    }else{
                      self.removeClass('suc').addClass('err');
                      addNewCompany.show();                                  //.find('.vv').val('').removeClass('uf_err uf_suc');
                      //addNewCompany.find('.vv[type=button]').val('请选择');
                      var newVal = companyNameSuggest.val();
                      $('#newCompanyAlias').html(newVal);
                      //$('#newCompanyAliasLink').attr('href', CONTEXTPATH + '/companyugc/?initname=' + encodeURIComponent(newVal));

                      //禁止输入职位
                      if (companyJobSuggest.length) {
                        companyJobSuggest.val('').prop('disabled', true);
                      }
                    }
                  });

                } else {
                  addNewCompany.hide();

                  companyNameSuggestHid.val(ret.encryptId);

                  //职位
                  if (companyJobSuggest.length) {
                    companyJobSuggest.data('coid', ret.industryCode).prop('disabled', false);
                  }

                  //填充图片、信息
                  $.getJSON(CONTEXTPATH + '/company/queryid.json?encryptCompId=' + encodeURIComponent(ret.encryptId), function (data) {
                    $('#selectedCompanyInfo').html('<span><img src="' + STATICURL + data.logo + '" /></span><p>' + data.companyStatInfo.ratingAverage + '分 <br>来自' + data.companyStatInfo.reviewCount + '条信息</p>');

                    //填充城市
                    companyCitySuggestHid.val(data.cityCode);
                    companyCitySuggest.val(data.cityName).trigger('blur');
                  });
                }
              });
            }
          }, 800);
          return true;
        },
        salaryPayTotal: {
          type: 'isIntger',
          msg: '请输入正确的数额！'
        },

        cityName: function (_this, prompt, e) {
          var s = setTimeout(function () {
            clearTimeout(s);
            if (companyCitySuggestHid.val() === '') {
              companyCitySuggest.val('').trigger('blur');
            }
            return true;
          }, 800);
          return true;
        },

        title: function (_this, prompt) {
          return speakTooMuch.call(this, _this, prompt);
        },

        pros: function (_this, prompt) {
          return speakTooMuch.call(this, _this, prompt);
        },

        cons: function (_this, prompt) {
          return speakTooMuch.call(this, _this, prompt);
        },

        advice: function (_this, prompt) {
          return speakTooMuch.call(this, _this, prompt);
        },

        jobExperience: selectControler
      }
    });


    v.init().submit(function(){
      //基本工资校验
      if($.trim($('#salaryBase').val()) === ''){
        return false;
      }else{
        //未登录处理
        /*if(!isLogged){
          auth_dialog.open('#login?authcb=authCallback');
          window.authCallback = function(ret){
            var token = typeof ret === 'string' ? ret : ret.token;
            $('input[name=token]', '#ugcForm').val(token);
            isLogged = true;
            $('#ugcForm').trigger('submit');
          };
          return false;
        }*/
        return true;
      }
    });

    //
    $('.select').DIYSelect({
      listCallback: function (l, field, select) {
        select.removeClass('s_err').addClass('s_suc');
        field.parent().find('input[type=hidden]').val($(this).data('val'));
      }
    });

    var salaryDetail = $('ul.adddetail input:text'),
      sDetailErr = $('#sDetailErr'),
      salaryBase  = $('#salaryBase'),
      salaryTotal = $('#salaryTotal'),
      salaryDetailFn = function(){
        var others = 0, total = parseInt(salaryTotal.val());
        salaryDetail.not('[name=salaryPayBase]').each(function(i, v){
          var val = parseInt(v.value) || 0;
          if(!(/^(([1-9]\d*)|0)$/).test(val)){
            sDetailErr.html('请输入正确的数额！').show();
            return false;
          }else{
            others += val;
          }
        });

        var base = total - others;
        if(base < 0){
          sDetailErr.html('工资明细不能大于月薪,请重新输入。').show();
          salaryBase.val('');
          return;
        }else{
          sDetailErr.hide();
        }

        salaryBase.val(base||0);
      };
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

    //添加工资明细
    $('#addincome').click(function () {
      var detail = $('ul.adddetail');
      if(detail.is(':hidden')){
        $(this).html('收起<i class="putaway" ka="salary-expand"></i>');
        detail.removeClass('none');
      }else{
        $(this).html('添加工资明细<i class="open"></i>');
        detail.addClass('none');
        sDetailErr.hide();
        //salaryDetail.val('');
        salaryBase.val(salaryTotal.val());
      }
    });


    $("#guideInfo").on('keyup', 'input.msalary', function () {
      $(this).val(this.value.replace(/^0(?=\d+)|[^\d\.]/g, ''));

      var mpaid = parseFloat($("#msalary").val()),
        months = parseFloat($("#months").val()),
        bonus = parseFloat($("#bonus").val()) || 0,
        result = 0;

      if(mpaid && months){
        result = parseInt((mpaid * months + bonus) / 12, 10);
        salaryTotal.val(result);
        salaryBase.val(result);
        $('#result').val(result);
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
    
  });
});