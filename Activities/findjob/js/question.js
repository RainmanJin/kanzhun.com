$(function(){

  $('.page ul').on('click','li',function(){
    var $t=$(this);
    $t.toggleClass('on');
    $input=$('[type=checkbox]',$t);
    if($t.hasClass('on')){
      $input.attr('checked',true);
    }else{
      $input.attr('checked',false);
    }
  });
  var index=0;
  function countScroll(){
    //var sT=$(document).scrollTop()+$('section.title').height()+20;
    var sT=$(document).scrollTop();
    var wH=$(window).height();
    var btH=$('.bt_fixed').height();
    var $page=$('.page');
    if(sT<$page.eq(1).offset().top){
      $('.bt_fixed').show();
      index=0;
    }else if(sT>=$page.eq(1).offset().top&&sT<$page.eq(2).offset().top){
      $('.bt_fixed').show();
      index=1;
    }else if(sT>=$page.eq(2).offset().top&&sT<$page.eq(3).offset().top){
      $('.bt_fixed').show();
      index=2;
    }else if(sT>=$page.eq(3).offset().top&&sT<$page.eq(4).offset().top){
      $('.bt_fixed').show();
      index=3;
    }else if(sT>=$page.eq(4).offset().top&&sT<$page.eq(5).offset().top-wH/2){
      $('.bt_fixed').show();
      index=4;
    }else{
      $('.bt_fixed').hide();
    }
  }
  $(window).on('scroll',countScroll);
  $('.bt_fixed').on('click',function(){
    $(document).scrollTop($('.page:eq('+(index+1)+')').offset().top);
    index++;
  });
  var $fjForm=$('#fjForm');
  $fjForm.submit(function(){
    var _$t=$(this);

    var _url=_$t.attr('action');
    var components = _$t.find('input[type=checkbox]:checked,input[type=text]').filter(function () {
      return !!$(this).attr('name');
    });

    if(!validate()){
      return false;
    }
    var _phone=$.trim($('[name=phone]').val());
    if(_phone!=''){
      if(!(/^1\d{10}$/).test(_phone)){
        alert('请输入正确的手机格式！');
        return false;
      }
    }
    $.ajax({
      url:_url,
      data:$.param(components),
      success:function(result){
        $.maskUI.open({
          elem:$('#dialog_result'),
          overlayClick: true
        });
        $('.bottom_set').html('<a class="bt" style="background-color: #999" href="javascript:;">提交</a>');
      },
      error:function(){

      }
    });
    return false;
  });
  //校验
  function validate(){
    var flag=true;
    $('input[type=checkbox]').each(function(){
      var _t=$(this);
      //var _elem=_t.closest('.pages');
      var _elem=$('#fjForm');
      var len=_elem.find('[type=checkbox]:checked').length;
      if(len>0){
        flag=true;
      }else{
        //$(window).scrollTop(_elem.offset().top);
        //setTimeout(function(){
          alert('请选择找工作考虑因素');
        //},300);
        flag=false;
        return false;
      }
    });
    return flag;
  }

  $(window).scrollTop(0);
});

