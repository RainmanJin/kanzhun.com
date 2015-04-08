require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
})
require(['u/autocomplete','s/chart-v2', 'u/tabs'], function(){
  $(function(){

    var wrapper = $('div.wrapper');
    $('section.add-co').css('height', wrapper.height());

    var addCoDialog = $('#addCoDialog');
    var addJobDialog = $('#addJobDialog');
    var slideMask= $('div.slide-mask');
    var coSuggest = $('#coSuggest');
    var com1 = $('input[name=com1]');
    var com2 = $('input[name=com2]');
    //var jobTitle = $('input[name=jobTitle]');
    var pkJobForm = $('#pkJobForm');
    var bodyType=$('body[data-type="result"]');

    if($('body').data('share')){
      $('body').append(
          '<div class="mask" id="wxMask">'+
          '<div class="transmitDialog" id="transmitDialog">' +
          '<p class="f_16 p10">立即分享给朋友， <br/>即可查看pk结果！</p><i class="arrows"></i></div></div>');

      window.shareCallback = function(){
        $('#wxMask, #transmitDialog').remove();
      }
    }

    /*$('#pkHotList').on('touchstart','a',function(){
      var _this=$(this);
      _this.parent().addClass('on').siblings().removeClass('on');
    });*/
    var showSlideDialog = function(dialog){
      slideMask.show();
      dialog.show(0, function(){
        $(this).addClass('open');
      });
    };

    var hideSlideDialog = function(dialog){
      $('section.add-co.open').removeClass('open').one('webkitTransitionEnd transitionEnd', function(){
        $(this).hide();
        slideMask.hide();
        coSuggest.val('');
      });
    };

    $('div.slide-mask, a.close').on('click', function(addCoDialog){
      hideSlideDialog();
    });


    $('span.add-company-1, span.add-company-2').on('click', function(){
      showSlideDialog(addCoDialog);
      addCoDialog.data('co', $(this).data('num'));
    });

    $('#pkIndexForm').on('submit', function(){
      if(com1.val() === '' || com2.val() === ''){
        alert('请选择两家公司进行对比！');
        return false;
      }
      if(com1.val()==com2.val()){
        alert('不要自己挑战自己!');
        return false;
      }

      return true;
    });

    //submit
    var pk = function(data, callback){
      var _data = $.extend({
        //jobTitle: $('input[name=jobTitle]').val(),
        companyId: $('input[name=com'+ addCoDialog.data('co') +']').val()
      }, data || {});

      $.ajax({
        url: '/activity/bcompany/load.json',
        type: 'get',
        data: _data,
        dataType: 'json',
        success: function(ret){
          if(ret && ret.html){
            var item = $('#pkItem' + addCoDialog.data('co'));
            if(item.length){
              item.html(ret.html);

              if(callback){
                callback();
              }
            }
          }else{
            alert('查询失败！');
          }
        }
      })
    };

    var chooseCo = function(id, val){
      $.get('/autocomplete/companyImg.json?id=' + id, function(ret){
        if(ret && ret.rescode == 1 && ret.image){
          var num = addCoDialog.data('co');
          var co = $('span.add-company-' + num);
          if(co.length){
            setTimeout(function(){
              co.find('>img').attr('src', 'http://img.kanzhun.com' + ret.image).removeClass('def');
              co.siblings('p').html(val);
              co.addClass('animated bounceIn').one('animationend webkitAnimationEnd oAnimationEnd', function(){
                $(this).removeClass('animated bounceIn');
              });
            }, 500)

            $('input[name=com'+ num +']').val(id);

            //结果页
            if(bodyType.length){
              //pk();
              $('[name="com'+num+'"]').val(id);
              $('#pkIndexForm').submit();
            }
          }
        }else{
          alert('查询失败！');
        }
      });
    }

    //company autocomplte
    coSuggest.autocomplete({
      serviceUrl: '/autocomplete/company.json',
      paramName: 'query',
      dataType: 'json',
      //格式化修改返回的JSON
      transformResult: function(response) {
        return {
          suggestions: $.map(response.suggestions || [], function (dataItem) {
            var arr = dataItem.data.split('|') || [];
            return { value: arr[0], data: arr[2], id: arr[1]};
          })
        };
      },
      preserveInput: true,
      maxHeight: 'auto',
      width: '100%',
      showNoSuggestionNotice: true,
      noSuggestionNotice: '<p class="p10">暂无数据，请更换关键词！</p>',
      appendTo: $('div.co-suggestions'),


      //选择公司
      onSelect: function(suggestion){
        hideSlideDialog();
        chooseCo(suggestion.id, suggestion.value);
      }
    });

    $('#hotCoList').on('click', 'li', function(){
      hideSlideDialog();
      var $this = $(this);
      chooseCo($this.data('cid'), $this.html());
    })


    //标签
    $('div.tagList').on('click', '>span', function(){
      var $this = $(this);
      var data = '';
      if(!$this.hasClass('current')){
        $this.addClass('current').siblings('span').removeClass('current');
        data = $this.data('content-id');
        var num=$this.closest('.tagList').data('num');
        $.ajax({
          url:'/activity/bcompany/tag.json',
          data:{
            companyId:$('[name=com'+num+']').val(),
            tag:data
          },
          dataType:'json',
          success:function(result){
            $('#textList'+num).html(result.html);
          }
        });
      }
    });


    //canvas  charts
    if($('canvas').length>0){
      var f_canvas=$('.reviewsDoughnutChart');
      $(f_canvas[0]).doughnutChart({
        colors: ['#e33a00', '#ededed'],
        centerColor: '#ffffff',
        borderWidth: 4
      });
      $(f_canvas[1]).doughnutChart({
        colors: ['#0076e3', '#ededed'],
        centerColor: '#ffffff',
        borderWidth: 4
      });
    }

    //评论相关
    var commentTool=$('.commentTool'),
        comment=$('ul.comment'),
        scaleLine=$('.scaleLine');
    var ajaxFlag=true;
    $('.bt_comment',commentTool).on('click',function(){
      var _t=$(this);
      var ipt=$('input',commentTool),
          iptVal= $.trim(ipt.val());
      if(iptVal==''){
        ipt.addClass('shine').one('animationend webkitAnimationEnd', function(){
          $(this).removeClass('shine');
        });
        return false;
      }
      var comId1=$('[name=com1]').val();
      var comId2=$('[name=com2]').val();
      if(!ajaxFlag){
        return false;
      }
      $.ajax({
        type: 'post',
        url: '/activity/bcompany/publish.json',
        dataType: 'json',
        data: {
          companyId:comId1,
          originId:comId2,
          commentContent:supportText+iptVal,
          field:supportId,
          parentId:_t.data('parentid'),
          parentFloor:_t.data('parentfloor')
        },
        beforeSend: function(){
          ajaxFlag=false;
        },
        success: function(ret){
          if( ret.rescode == 1){
            $('#noComment').hide();
            if($.trim(ret.html) !== ''){
              comment.eq(0).prepend($(ret.html).hide().delay(200).fadeIn());
              ipt.val('').focus();
              $('#hotComments').trigger('click');
              //初始化回复
              ipt.attr('placeholder','我来说两句...');
              $('.bt_comment',commentTool).data('parentid','').data('parentfloor','');
            }else{
              alert('您的评论不符合要求，请修改！');
              ipt.focus();
            }

          }
          ajaxFlag=true;
        },
        error: function(){

        }
      });
    });
    //回复
    $(comment).on('click','.reply',function(){
      var _t=$(this);
      var ipt=$('input',commentTool);
      var floor=_t.closest('.comment_r').siblings('.comment_l').find('.floor').html();
      $('input',commentTool).val('');
      ipt.attr('placeholder','回复'+floor);
      $('.bt_comment',commentTool).data('parentid',_t.data('parentid')).data('parentfloor',_t.data('parentfloor'));
    });
    //有用
    comment.on('click','.good',function(){
      var _t=$(this);
      if(_t.hasClass('current')){
        return false;
      }
      var count=parseInt(_t.text())+1;
      _t.addClass('current');
      _t.html('<i class="hand"></i> '+count);

      var effect = $('<b>+1</b>');
      _t.append(effect);
      effect.animate({'top': -40, 'opacity': 0, 'font-size': '30px'}, 400, function(){
        $(this).remove();
      });
      $.ajax({
        url:'/shortreview/useful.json',
        data:{
          shortreviewId:_t.data('commentid')
        },
        dataType:'json',
        success:function(){

        }
      });
    });
    //支持
    var isSupport=true;
    if($('[name=isSupport]').val()=='1'){
      isSupport=false;
    }
    var supportId;
    var supportText='';
    scaleLine.on('click','a',function(){
      //localStorage.setItem("test","1");
      var _t=$(this);
      if(!_t.hasClass('current')&&isSupport){
        _t.addClass('current');
        var _index=_t.data('num');
        var em=scaleLine.find('.tips em:eq('+parseInt(_index-1)+')');
        var count=parseInt(em.text())+1;
        em.html(count);
        var coName=$('[name=com'+_index+']').data('name');
        supportText='【我支持了'+coName+'】';
        $('input',commentTool).attr('placeholder',supportText+'我来说两句...');
        if(_index=="1"){
          var data={
            support:$('[name=com1]').val(),
            other:$('[name=com2]').val()
          };
          supportId=$('[name=com1]').val();
        }else{
          var data={
            support:$('[name=com2]').val(),
            other:$('[name=com1]').val()
          };
          supportId=$('[name=com2]').val();
        }

        var effect = $('<b>+1</b>');
        _t.append(effect);
        effect.animate({'top': -40, 'opacity': 0, 'font-size': '30px'}, 400, function(){
          $(this).remove();
        });
        $.ajax({
          url:'/activity/bcompany/support.json',
          data:data,
          dataType:'json',
          success:function(result){
            if(result.rescode==1){
              var pkData=result.companyPkData;
              if(_index=="1"){
                var one=pkData.supportCountOne;
                var two=pkData.supportCountTwo;
              }else{
                var one=pkData.supportCountTwo;
                var two=pkData.supportCountOne;
              }
              scaleLine.find('.line em').css({'width':(one/(one+two))*100+'%'});

              //高亮分享按钮
              $('#pkRetTopShare').css({'background-color': '#f49600', 'color': '#fff'}).html('呼唤友军来拉票');

              //改变分享文案
              if(shareTitleArr && shareTitleArr.length){
                shareTitle = shareTitleArr[_t.data('num') - 1];
              }
            }else{
              alert(result.msg || '发送失败！');
            }
          }
        });
        isSupport=false;
      }else{
        alert('不可以刷票哟！，赶快分享拉朋友来助威才是正路！');
        $('.bt_transmit').trigger('click');
      }

    });

    //更多
    $('a.more_details').on('click', function(){
      var _t = $(this);
      $.ajax({
        url: '/activity/bcompany/review.json',
        dataType:'json',
        data:{
          curpage:_t.data('page'),
          lastId:_t.data('lastid'),
          companyId:$('[name="com1"]').val(),
          originId:$('[name="com2"]').val(),
          type: _t.data('ctype')
        },
        success: function(ret){
          if(ret){
            _t.siblings('ul.comment').append(ret.html);
            _t.data('page', ret.nextPage);
            _t.data('lastid',ret.lastId);
            if(!ret.more) {
              _t.hide();
            }
          }
        }
      });
    });

    //固定头部
    /*function initScaleLine() {
      var scaleLine=$('.scaleLine');
      if(scaleLine.length>0) {
        setTimeout(function() {
          var scaleLineTop = scaleLine.offset().top;
          $(window).on('scroll', function () {
            var sT = $(document).scrollTop();
            if (sT >= scaleLineTop) {
              scaleLine.addClass('fixTop');
            } else {
              scaleLine.removeClass('fixTop');
            }
          });
        },300);
      }
    }*/
    //initScaleLine();

    //首页tabs
    $('dl.index-hot-tabs').tabs({
      tabSelector: 'dt>span',
      tabPanel: 'dd'
    });

    //返回
    if(document.querySelector('header.page_hd a.top_back')){
      document.querySelector('header.page_hd a.top_back').onclick = function(e){
        e.stopPropagation();
        if(document.referrer.indexOf("/city")>0) {
          history.go(-3);
        }else {
          if(document.referrer.length>0){
            history.back();
          }else{
            location.href="/";
          }
        }
      };
    }

    //滚动加载更多
    $(function(){
      function more(){
        var timer;
        $(window).on("scroll",function(){
          //loadMore();
          //延时处理可以去掉
          if(timer){
            clearTimeout(timer);
            timer=null;
          }
          timer=setTimeout(function(){
            loadMore();
          },200);
        });
        function loadMore(){
          var oResult=$(".js_more_result:visible");
          var page=oResult.data('page')||2;
          var	more=oResult.data("more");
          var oMore=oResult.siblings('.sc_more');
          if(more!==''&&!more){
            return;
          }

          var wH=$(window).height();
          var sT=$(window).scrollTop();
          var sH=$(document).height();
          var isAjax=0;
          if(wH+sT>=sH){
            if(isAjax){
              return;
            }
            isAjax=1;
            $.ajax({
              url:oResult.data("url")+page,
              dataType:"json",
              beforeSend:function(){
                oMore.show();
              },
              success:function(result){
                oMore.hide();
                oResult.append(result.html);
                //more=result.more;
                //page=result.nextPage;
                oResult.data('page',result.nextPage);
                oResult.data('more',result.more);
                isAjax=0;
              },
              error:function(){
                isAjax=0;
              }
            });
          }
        }
      }
      more($(".js_more_result:eq(0)"));
    });

    //员工评论切换
    $('ul.tabs_result').on('click', 'li', function(){
      var sIndex = $(this).index(),
          tabBox = $(this).parent().parent().siblings('dd').find('ul').find('li');
      $('ul.tabs_result li').removeClass('current');
      $(this).addClass('current');
      tabBox.addClass('none');
      tabBox.eq(sIndex).removeClass('none');
    })

  });
});