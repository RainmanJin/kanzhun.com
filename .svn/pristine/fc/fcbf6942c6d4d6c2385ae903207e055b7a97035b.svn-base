
$(function(){
  //模拟map
  function Map() {
    this.obj = new Object();
  }
  Map.prototype.put = function(key, value) {
    this.obj[key] = value;
  };
  Map.prototype.get = function(key) {
    return this.obj[key];
  };
  Map.prototype.remove = function(key) {
    if(this.get(key)==undefined) {
      return;
    }
    delete this.obj[key];
  };
  Map.prototype.clear = function() {
    this.obj = new Object();
  };
  Map.prototype.size = function() {
    var ary = this.keys();
    return ary.length;
  };
  Map.prototype.keys = function() {
    var ary = new Array();
    for(var temp in this.obj) {
      ary.push(temp);
    }
    return ary;
  };
  Map.prototype.values = function() {
    var ary = new Array();
    for(var temp in this.obj) {
      ary.push(this.obj[temp]);
    }
    return ary;
  };

  var colorList={
    0:'#fff',
    1:'#989898',
    2:'#6e37db',
    3:'#556aec',
    4:'#19b38d',
    5:'#22ac38',
    6:'#f38f00',
    7:'#f0582b',
    8:'#dc403c',
    9:'#2f2f2f'
  };
  //画小人
  function initChildPic(obj){
    var map=new Map();
    $('.tarea').on('input',function(){
      var _t=$(this),
        val=_t.val();
      createChildPic(val);
    });
  }
  function createChildPic(val){
    var _val=splitN(val);
    var $content=$('.content');
    var aLine=_val.split('\n');
    var divMarginLeft=0;
    var divLeft=0;
    var divTop=0;
    var h='<i class="i_mark"></i><em class="span_mark">关注微信kanzhunwang</em>';
    h+='<div>';
    $.each(aLine,function(k,v){
      var aColumn= v.split('');
      $.each(aColumn,function(m,n){
        var nRandom=Math.floor(Math.random()*23);
        if(!map.get(k+'_'+m)){
          map.put(k+'_'+m,{'random':nRandom});
        }
        var left= m*35-k*30;
        var top=m*15+k*30;
        h+='<span class="i_'+map.get(k+'_'+m).random+'" style="left:'+left+'px;top:'+top+'px;"><em>'+n+'</em></span>';
        if(k==0&&m<4){
          divLeft=-60-30*m;
          divMarginLeft='50%';
          divTop=30;
        }else{
          divMarginLeft=0;
          divLeft=0;
          divTop=0;
        }
      });
    });
    h+='</div>';
    $content.html(h);
    var nline=aLine.length;
    $('span',$content).css({'margin-left':20+nline*20});
    //字数少的时候居中显示
    $('>div',$content).css({'margin-left':divMarginLeft,left:divLeft,top:divTop});
  }
  //强制换行
  function splitN(val){
    var _val1='';
    var _arr1=[];
    var aLine=val.split('\n');
    $.each(aLine,function(k,v){
      var aColumn= v.split('');
      var _val2='';
      var _arr2=[];
      $.each(aColumn,function(m,n){
        _arr2.push(aColumn[m]);
        //一行最多显示12个小人
        if((m+1)%12==0){
          _arr2.push('\n');
        }
      });
      _val2=_arr2.join('');
      //判断数组最后一位是否是换行符
      if(_arr2[_arr2.length-1]=='\n'){
        _arr1.push(_val2);
      }else{
        _arr1.push(_val2+'\n');
      }
    });
    _val1=_arr1.join('');
    return _val1;
  }

  initChildPic();
  var map=new Map();
  var tarea=$('[name=content]').val();
  //var tarea='梦想总是要有，\n万一实现了呢\n2015年\n赶紧曝一曝';
  var defTarea='输入想说的话......\n用空格和换行排列小人\n最多输入140个字';
  $('.tarea').attr('placeholder',defTarea);
  $('.tarea').val(tarea);
  createChildPic(tarea||defTarea);
  $('[name=isfinish]').val(1);
  $('.bg').css('background-color',colorList[$('[name=color]').val()]);

  $('.set_r').on('click','a',function(){
    var _t=$(this);
    var _index=_t.index();
    _t.addClass('current').siblings().removeClass('current');
    $('#tool_'+_index).show().siblings().hide();
  });

  $('#tool_1').on('click','a',function(){
    var _t=$(this);
    var _index=_t.parent().index();
    var bColor=_t.css('background-color');
    $('.bg').css('background-color',bColor);
    $('[name=color]').val(_index);
    if(_index==0){
      $('.i_mark').addClass('other');
    }else{
      $('.i_mark').removeClass('other');
    }
  });

  $('#bt_createPic').on('click',function(){
    $('[name=content]').val($('.tarea').val());
    $('[name=picWidth]').val($('.content')[0].scrollWidth);
    $('#picForm').submit();
  });

  $('.bt_orange').on('touchstart',function(){
    $(this).addClass('current');
  });
  $('.bt_orange').on('touchend',function(){
    $(this).removeClass('current');
  });

  /*
  $('.tarea').on('focus',function(){
    setTimeout(function(){
      $(window).scrollTop(0);
    },1000);
  });
  */
});