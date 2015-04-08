require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});
require(['u/autocomplete'], function(){
  $(function(){

    var wrapper = $('div.wrapper');
    $('section.add-co').css('height', wrapper.height());

    var addCoDialog = $('#addCoDialog');
    var addJobDialog = $('#addJobDialog');
    var slideMask= $('div.slide-mask');
    var coSuggest = $('#coSuggest');
    var com1 = $('input[name=com1]');
    var com2 = $('input[name=com2]');
    var jobTitle = $('input[name=jobTitle]');
    var pkJobForm = $('#pkJobForm');

    if($('body').data('share')){
      $('body').append(
          '<div class="mask" id="wxMask">'+
          '<div class="transmitDialog" id="transmitDialog">' +
          '<p class="f_16 p10">立即分享给朋友， <br/>即可查看pk结果！</p><i class="arrows"></i></div></div>');

      window.shareCallback = function(){
        $('#wxMask, #transmitDialog').remove();
      }
    }

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

      return true;
    });

    //submit
    var pk = function(data, callback){
      var _data = $.extend({
        jobTitle: $('input[name=jobTitle]').val(),
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
//            console.log(addCoDialog.data('co'))
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
              co.find('>img').attr('src', 'http://img.kanzhun.com' + ret.image);
              co.siblings('p').html(val);
              co.addClass('animated bounceIn').one('animationend webkitAnimationEnd oAnimationEnd', function(){
                $(this).removeClass('animated bounceIn');
              });
              if(jobTitle.length){
                shareWXCallback();
              }
            }, 500)

            $('input[name=com'+ num +']').val(id);

            //结果页
            if(jobTitle.length){
              pk();
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


    //job

    $('#addJob').on('click', function(){
      showSlideDialog(addJobDialog);

      $.ajax({
        type: 'get',
        url: '/activity/bcompany/job.json',
        data: {
          com1: com1.val(),
          com2: com2.val()
        },
        success: function(ret){
          if(ret && ret.rescode == 1){
            var html = '<li data-val="">不限职位</li>';
            $.each(ret.jobTitles, function(i, v){
              html += '<li data-val="'+ i +'" ka="job_list">'+ i +'</li>'
            });

            $('#jobList').html(html);
          }
        }
      })
    });





    //选择职位
    $('#jobList').on('click', 'li', function(){
      jobTitle.val($(this).data('val'));
      hideSlideDialog();
      $('#addJob span').html($(this).html());
      addCoDialog.data('co', '1');
      pk({}, function(){
        addCoDialog.data('co', '2');
        pk();
      });


    });

    //标签

    $('div.pk-list').on('click', 'ul.pk-interview li', function(){
      var $this = $(this);

      var data = '';
      if(!$this.hasClass('current')){
        data = $this.data('content-id');
      }

      addCoDialog.data('co', $(this).closest('dl').data('num'));
      pk({
        tag: data
      });
    });


    function initPhoneList(){
      var index=0;
      listInner=$('#pkHotList .inner'),
        list=listInner.find('ul'),
        count=list.find('li').length,
        cloneList=list.clone();
      listInner.append(cloneList);
      setInterval(function(){
        if(index==count){
          index=0;
          listInner.css({'margin-top':0});
        }
        index++;
        listInner.animate({'margin-top':-(62*index)});
      },2000);
    }

    initPhoneList();
  });

});