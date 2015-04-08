require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/auth_dialog','c/widgets','u/validator', 'u/sort-select'],function(){
  $('input:text').placeholder();

/*  $.maskUI.config = {
    wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
    alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
    confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><div class="{1}">{0}</div><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
  };*/

  //选择城市
  var newCompanyCitySuggest = $('#newCompanyCitySuggest'),
      newCompanyCitySuggestHid = $('input[name=city]');
  newCompanyCitySuggest.autocomplete({
    serviceUrl: '/autocomplete/city.json',
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
      newCompanyCitySuggestHid.val(suggestion.data);
    },
    onSearchStart: function () {
      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
      newCompanyCitySuggestHid.val('');
    },
    onInvalidateSelection: function () {
      newCompanyCitySuggestHid.val('');
    },
    onSearchComplete: function (query, suggestions) {
      if (suggestions.length === 0) {
        newCompanyCitySuggestHid.val('');
        return;
      }
      //auto select when only one result
      if (suggestions.length === 1) {
        newCompanyCitySuggestHid.val(suggestions[0].data);
      }
    },
    autoSelectFirst: true
  });
  //职位类别
  $('dl.sort_select', '#jobForm').sortSelect({
    listCallback: function(list, field, target){
      //var hids = $('input:hidden', target);
      //hids/*.val($(this).data('val'))*/.parent().parent().parent().find('>span.red').hide();
      field.parent().parent().parent().find('span.red').hide();
    },
    secondAjaxCallback: function(list, field, target){
      var self = $(this),
          classId = self.data('class-id');
      $.ajax({
        type: 'get',
        url: CONTEXTPATH + '/job/jobClass',
        data: {classId:classId},
        beforeSend: function(){
          self.parent().parent().parent().next('div').append('<img src="'+CONTEXTPATH+'/images/loading-b.gif" class="loading">');
        },
        success: function(ret){
          ret = ret || {};
          self.parent().parent().parent().next('div').html(ret);
        }
      });
    },
    thirdAjaxCallback: function(list, field, target){
      var self = $(this),
        classId = self.data('class-id');
      $.ajax({
        type: 'get',
        url: CONTEXTPATH + '/job/jobClass',
        data: {classId:classId},
        beforeSend: function(){
          self.parent().parent().parent().next('div').append('<img src="'+CONTEXTPATH+'/images/loading-b.gif" class="loading">');
        },
        success: function(ret){
          ret = ret || {};
          self.parent().parent().parent().next('div').html(ret);
        }
      });
    }
  });
  //工作经验
  $('.select', '#jobForm').DIYSelect({
    listCallback: function (list, field, select) {
      //select.removeClass('error').addClass('focus');
      select.find('dt>input:hidden').val($(this).data('val'));
      field.parent().parent().parent().find('span.red').hide();
    }
  });
  //月薪只能输入数字
  $("#lowSalary,#highSalary").on("keyup",function(){
    var val = this.value.replace(/^0(?=\d+)|\D/g, '');
    $(this).val(val);
  });
  //全职，兼职切换
  $(".radio").on("click","span",function(){
    var oradio=$(".radio");
    var curSpan=oradio.find(".current");
    curSpan.removeClass("current");
    $(this).addClass("current");
    var hideInput=$(this).siblings("input:hidden");
    hideInput.val($(this).attr("data-id"));
  });
  function alertGoodErr(){
    $("#rGoodErr").remove();
    $(".rGood").append('<p class="red clear" id="rGoodErr"><i class="base errormsg"></i> 最多添加5个</p>');
    $("#rGoodErr").fadeOut(2000,function(){
      $(this).remove();
    });
  }
  //添加职位诱惑
  $(".js_addJobLures").on("click",function(){
    var _this=$(this);
    var sInput=_this.prev("input").val();
    var oSelf=_this.parent().siblings(".self");
    var arr=oSelf.find("input:hidden");
    if(!valiJobluresInput(_this.prev())){
      return;
    }
    if(isRepeat(sInput,arr)){
      //$.maskUI.alert("该标签已添加！");
      return;
    }
    if(oSelf.find("dd").length>=5){
      //oSelf.find("dd:eq(0)").remove();
      //$.maskUI.alert("最多添加5个");
      alertGoodErr();
      return;
    }
    oSelf.show().append('<dd>'+sInput+'<input name="jobLures" type="hidden" value="'+sInput+'" ><a href="javascript:;" class="js_del"><i></i></a></dd>');
    oValiJobLures.val("1");
    oJobLuresMsg.hide();
  });

  $('[action-type="addJobLures"]').on("click","dd",function(){
    var _this=$(this);
    var oSelf=_this.parent().siblings(".self");
    var arr=oSelf.find("input:hidden");
    if(isRepeat(_this.html(),arr)){
      //$.maskUI.alert("该标签已添加！");
      return;
    }
    if(oSelf.find("dd").length>=5){
      //oSelf.find("dd:eq(0)").remove();
      //$.maskUI.alert("最多添加5个");
      alertGoodErr();
      return;
    }
    oSelf.show().append('<dd>'+_this.html()+'<input name="jobLures" type="hidden" value="'+_this.html()+'" ><a href="javascript:;" class="js_del"><i></i></a></dd>');
    oValiJobLures.val("1");
    oJobLuresMsg.hide();
  });
  //删除职位诱惑
  $(".rGood").on("click","dl.self .js_del",function(){
    $(this).parent().fadeOut(300,function(){
      $(this).remove();
    });
  });
  $(".js_addJobLures").prev("input").on("focus",function(){
    $(this).siblings(".red").hide();
  });

  function valiJobluresInput(elem){
    var val=elem.val();
    if(val.length<2){
      elem.siblings(".red").show();
      return false
    }else{
      return true;
    }
  }
  //月薪
  var valiSalary=function(_this,prompt){
    var self=$(this);
    var olowSalary=$("#lowSalary");
    var ohighSalary=$("#highSalary");
    var sLow=parseInt($.trim(olowSalary.val()));
    var sHigh=parseInt($.trim(ohighSalary.val()));
    if(sLow>=sHigh){
      prompt.err(self,"最高月薪需大于最低月薪"); 
      return false;       
    }else if(sLow*2<sHigh){
      prompt.err(self,"最高月薪不能大于最低月薪2倍"); 
      return false; 
    }else{
      prompt.succ(self);
      return true;     
    }
  };
  //判断是否重复
  function isRepeat(str,arr){
    var len=arr.length;
    for(var i=0;i<len;i++){
      if(str==arr[i].value){
        return true;
      }
    }
    return false;
  }
  var oValiJobLures=$("#valiJobLures"),
      oJobLuresMsg=$(".js_jobLuresMsg");
  var v=$('#jobForm').validatorAll({
    elems: '.v',
    prompt: {
      succ: function (target) {
        if (target.attr('name').indexOf('selectflag') === -1) {
          target.removeClass('error').addClass('focus');
          target.parent().find('>span.red').hide();
          target.removeClass('error focus');

        } else {
          //select的错误样式
          target.parent().parent().parent().find('span.red').hide();
          //target.parent().parent().removeClass('error focus');

        }
      },
      err: function (target, msg) {
        if (target.attr('name').indexOf('selectflag') === -1) {
          target.removeClass('focus').addClass('error');
          var prompt = target.parent().find('span.red');
          target.removeClass('focus').addClass('error');
        } else {
          var prompt = target.parent().parent().parent().find('span.red');
          //target.parent().parent().removeClass('focus').addClass('error');
        }
        prompt.html('<i class="base errormsg"></i> '+(msg || prompt.data('msg'))).show();
      },
      normal: function (target) {
        if (target.attr('name').indexOf('selectflag') === -1) {
          //target.removeClass('error focus');
          target.parent().find('>span.red').hide();
          target.removeClass('error').addClass('focus');
        } else {
          //target.parent().parent().removeClass('s_err s_suc');
          target.parent().parent().parent().find('span.red').hide();
          //target.parent().parent().removeClass('error').addClass('focus');
        }
      }
    },
    focusMore: {
      companyName: function (prompt) {
        var self = $(this);
        self.data('ischecked', false).parent().find('span.prompt').hide();
        prompt.normal(self);

        return true;
      }
    },
    more: {
      description:function(_this, prompt){
        if(this.value.length<20){
          prompt.err($(this)); 
          return false; 
        }else{
          prompt.succ($(this)); 
          return true; 
        }
      },   
      title:{
        fn:function(_this, prompt){
          if(this.value.length<2){
            prompt.err($(this)); 
            return false; 
          }else{
            prompt.succ($(this)); 
            return true; 
          }
        }
      },
      place: function (_this, prompt, e) {
        var s = setTimeout(function () {
          clearTimeout(s);
          if (newCompanyCitySuggestHid.val() === '') {
            newCompanyCitySuggest.val('').trigger('blur');
          }
          return true;
        }, 300);
        return true;
      },
      lowSalary: {
        fn:function(_this, prompt){
          return valiSalary.call(this, _this, prompt);
        }
      },
      highSalary:{
        fn:function(_this, prompt){
          return valiSalary.call(this, _this, prompt);
        } 
      },
      email2: {
        type: 'isMail',
        msg: '请输入正确格式的邮箱！'
      },
      valiJobLures:{
        fn:function(_this, prompt){
          if(oValiJobLures.val()==""){
            prompt.err(oValiJobLures); 
            return false; 
          }else{
            prompt.succ(oValiJobLures); 
            return true;           
          }
        }
      },
      agreement:{
        fn:function(_this, prompt){
          var _t=$(this);
          var len=_t.parent().find("[type=checkbox]:checked").length;
          if(len==0){
            prompt.err(_t);
            return false;
          }else{
            prompt.succ(_t); 
            return true;     
          }
        }
      }  
    },
    locate:function(){
      var _this=this;
      $(window).scrollTop(_this.offset().top - 30);
    }
  });
  v.init().submit();
});