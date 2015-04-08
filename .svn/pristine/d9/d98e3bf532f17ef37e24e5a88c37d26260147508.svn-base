$(function(){
  var slideSelecteWrapper = $('section.slide_select_wrap'),
    slideSelecte = $('div.slide_select'),
    screenH = $(window).height(),
    conH = $('section.rem_con').height();

  slideSelecteWrapper.css('height', (conH > screenH ? conH: screenH));


  $('li.select_tap').on('click', function(){
    var list = $('#'+ this.id.replace('Tap',''));
    if(list.find('li').length === 0){
      if(this.id==='industryItemTap'){
        $('#jobTitle').addClass('shine rem_ifd_err').one('animationend webkitAnimationEnd', function(){
          $(this).removeClass('shine');
        })
        $.maskUI.alert('<span class="red">请先输入并选择正确的职位！</span>');
        return false;
      }
      return;
    }
    slideSelecteWrapper.css('display', 'block');
    list.show().siblings('ul').hide();
    $(this).addClass('current').siblings('li').removeClass('current');
    setTimeout(function(){
      slideSelecte.addClass('mask');
    },100)
  });

  slideSelecte.on('touchstart', 'li', function(){
    $(this).addClass('on').siblings().removeClass('on');
  }).on('click', function(){
    slideSelecte.removeClass('mask');
    $('ul.rem_form li').removeClass('current');
    setTimeout(function(){
      slideSelecteWrapper.css('display', 'none');
    }, 300);
  }).on('click', 'li', function(e){
    e.stopPropagation();
    $('#' + $(this).parent().attr('id') + 'Tap').removeClass('current').find('button').removeClass('rem_ifd_err').addClass('grey').html(this.innerHTML+'<i class="arrow_g"></i>').siblings('input[type=hidden]').val($(this).data('content-id'));
    slideSelecte.trigger('click');
  });

  function createIndustrySelect(){
    var query=$('#jobTitle').val();
    $.ajax({
      url:"/autocomplete/salaryindustry.json",
      dataType:"json",
      data:{
        query:query
      },
      success:function(result){
        var list=result.suggestions;
        var selectHtml='';
        $.each(list,function(i,v){
          var arr=v.data.split("|");
          selectHtml += '<li data-content-id="'+arr[1]+'">'+arr[0]+'</li>';
        });

        $("#industryItem").html(selectHtml);
        $('#industryItemTap button').html('<i class="arrow_g"></i>请选择您从事的行业类别').removeClass('grey');
        $('#industryItemTap input[type=hidden]').val('0');
      }
    });
  }

  //职位autocomplete
  var jobTitleSuggestHid = $('input[name=jobTitleId]');
  $('#jobTitle').autocomplete({
    serviceUrl: '/autocomplete/salaryjob.json',
    paramName: 'query',
    dataType: 'json',
    maxHeight: 350,
    transformResult: function (response) {
      return {
        suggestions: $.map(response.suggestions, function (dataItem) {
          var arr = dataItem.data.split('|');
          return { value: arr[0], data: arr[1]};
        })
      };
    },
    onSelect: function (suggestion) {
      jobTitleSuggestHid.val(suggestion.data);
      createIndustrySelect();
    },
    onSearchStart: function () {
      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
      jobTitleSuggestHid.val('');
      $("#industryItem").html('');
    },
    onInvalidateSelection: function () {
      jobTitleSuggestHid.val('');
    },
    onSearchComplete: function (query, suggestions) {
      if (suggestions.length === 0) {
        jobTitleSuggestHid.val('');
        return;
      }
      //auto select when only one result
      if (suggestions.length === 1) {
        jobTitleSuggestHid.val(suggestions[0].data);
      }
    },
    autoSelectFirst: true
  });



  function selectValidate(_this, prompt, e){
    if(!parseInt(this.value)){
      return false;
    }else{
      return true;
    }
  }

  $.maskUI && ($.maskUI.config = {
    wrap: '<section class="maskui_dialog" id="{0}"><div>{1}</div></section>',
    alert: '<div><div class="m_dialog_con f_16">{0}</div><p class="m_dialog_btn"><a href="javascript:;" class="maskui_close btn btn_block">{1}</a></p></div>'
  });


  var companyNameSuggest = $('input[name=companyName]'),
    companyNameSuggestHid = $('input[name=companyId]');

  //选择公司
  companyNameSuggest.autocomplete({
    serviceUrl: '/autocomplete/company.json',
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


  //
  var v =$('#salaryReportForm').validatorAll({
    elems: 'input[type=text], input[type=hidden]',
    prompt: {
      succ: function(target){
        if(target.attr('type') === 'hidden'){
          target = target.siblings('button');
        }
        target.removeClass('rem_ifd_err');
      },
      err: function(target){
        if(target.attr('type') === 'hidden'){
          target = target.siblings('button');
        }
        target.addClass('shine rem_ifd_err').one('animationend webkitAnimationEnd', function(){
          $(this).removeClass('shine');
        });
      },
      normal: function(target){
        if(target.attr('type') === 'hidden'){
          target = target.siblings('button');
        }
        target.removeClass('rem_ifd_err');
      }
    },
    more: {
      industryCode: selectValidate,
      cityCode: selectValidate,
      degree: selectValidate,
      experience: selectValidate,
      scale: selectValidate,
      salary: {
        type: 'isIntger',
        msg: '1'
      },
      email: {
        type: 'isMail',
        msg: '1'
      },
      companyName: function(_this, prompt, e){
        var val =  this.value;
        var scale = $('input[name=scale]');
        setTimeout(function(){
          if($.trim(val) !== '' && companyNameSuggestHid.val() === ''){
            $('#scaleItemTap').show();
            scale.attr('data-necessary', '1').val('');
            $('button[name=scale_s]').html('请选择');
            v.elems = 'input[type=text], input[type=hidden]';
          }else{
            $('#scaleItemTap').hide();
            scale.removeAttr('data-necessary').val('');
            $('button[name=scale_s]').html('请选择');
            v.elems = 'input[type=text], input[type=hidden]:not([name=scale])';
          }
        },300);

        return true;
      }
    }
  });

  v.init().submit(function(){
    if(jobTitleSuggestHid.val() == ''){
      $('#jobTitle').addClass('shine rem_ifd_err').one('animationend webkitAnimationEnd', function(){
        $(this).removeClass('shine');
      })
      $("#industryItem").html('');
      $.maskUI.alert('<span class="red">请输入并从推荐列表中选择职位！</span>');
      return false;
    }
    return true;
  });
});
