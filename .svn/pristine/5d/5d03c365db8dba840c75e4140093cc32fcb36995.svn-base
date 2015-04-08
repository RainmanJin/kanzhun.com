$.fn.ajaxForm = function(opts){
    var o = $.extend({
      //selector: 'input:text, input:hidden, textarea, select, input:radio, input:checkbox'
    }, opts);

    var form = $(this);

    form.on('submit', function(e){
      e.preventDefault();
      e.stopPropagation();

      var components = form.find(o.selector).filter(function(){
        return !!$(this).attr('name');
      });

      if(components.length == 0){ return false; }

      if(o.validate){
        if(!o.validate.call(form, components)){
          return false;
        }
      }

      $.ajax({
        type: (form.attr('method')||'get').toUpperCase(),
        url: form.attr('action'),
        //data: $.param(components),
        //增加data 扩展方法
        data: $.param(components) + (o.data ? o.data() : ''),
        dataType: o.dataType || 'json',
        beforeSend: function(){
          if(o.beforeSend){
            o.beforeSend.call(form, components);
          }
        },
        success: function(ret){
          if(o.success){
            o.success.call(form, ret, components);
          }
        },
        error: function(){
          if(o.error){
            o.error.call(form, components);
          }
        }
      });


      return false;
    });
  };


var swiper = new Swiper('.swiper-container', {
  loop: true,
  onImagesReady: function(){
    $('.swiper-wrapper').show();
  }
});


$('div.followers').on('click', function(){
  $('div.wrapper').toggleClass('hide');
});

var following = $('div.share-d');
var step = $('dl.b', following);
$('#followHim').on('click', function(e){
  e.stopPropagation();
  following.show();
});

step.eq(0).on('click', 'a', function(){
  $('input[name=relationType]').val($(this).data('val'));
  step.eq(0).hide();
  step.eq(1).show();
});

var words = $('textarea[name=supportContent]');
$('#followForm').ajaxForm({
  selector: 'input[type=text], input[type=hidden], textarea',
  success: function(ret){
    if(ret && ret.rescode == 1){
      step.eq(1).hide();
      step.eq(2).show();
      $('#arrow').removeClass('hidden');
    }else{
      alert('提交失败！')
    }
  }
});
step.eq(1).on('click', 'a.orange-btn', function(){
  if($.trim(words.val()).length === 0){
    words.addClass('err')
  }else{
    $('#followForm').submit();
  }
});

$(window).on('load', function(){
  $('ul.six').css('visibility', 'visible');
});
//加载更多
$('li[mark="more"]').on('click','a',function(e){
  e.stopPropagation();
  var _t=$(this);
  var bossId=_t.data('bossid');
  var page=parseInt(_t.data('page'))+1;
  $.ajax({
    url: '/closestool/getMoreSupporters.json',
    data: {
      bossId:bossId,
      page:page
    },
    success:function(result){
      _t.data('page',result.page);
      _t.closest('li').before(result.html);
      if(!result.hasMore){
        _t.closest('li').hide();
      }
    }
  });
});

