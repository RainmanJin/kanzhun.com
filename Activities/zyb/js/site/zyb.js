$(function(){
  var cc = {
    readCookie:function(name){
      var _c='; '+document.cookie+'; ';
      var index=_c.indexOf('; '+name+'=');
      if(index!=-1){
        var s=_c.substring(index+name.length+3,_c.length);
        return unescape(s.substring(0,s.indexOf('; ')));
      }else{
        return null;
      }
    },

    //expires 为设置cookie过期时间，单位为天，不传则默认关闭浏览器过期
    writeCookie:function(name,value,expires){
      var expDays=expires*24*60*60*1000;
      var expDate=new Date();
      expDate.setTime(expDate.getTime()+expDays);
      var expString=expires?';expires='+expDate.toGMTString():'';
      document.cookie=name+'='+escape(value)+expString+';path=/';
    },
    delCookie:function(name){
      var exp=new Date(new Date().getTime()-1);
      var s=this.readCookie(name);
      if(s!=null){
        document.cookie=name+'='+s+';expires='+exp.toGMTString()+';path=/';
      }
    }
  };

  var wx = function(target, msg, callback){
    $('body').append(
        '<div class="mask" id="wxMask">'+
        '<div class="transmitDialog" id="transmitDialog"><p>' +
        msg +
        '</p><i class="arrows"></i></div></div>');

    var mask = $('#wxMask'),
      dialog = $('#transmitDialog');

    target.on('click', function(e){
      e.preventDefault();
      mask.show();
      dialog.show();

      if(callback){
        callback();
      }
    });

    mask.on('click',function(e){
      mask.hide();
      dialog.hide();
    });
  };

  window.__wxshareitems = '';
  var items = $('ul.items');
  var li = $('li', items);
  var tip = $('div.tip');
  items.css('height', items.width());

  var level = $('#level'),
    num = $('#num'),
    levelArr = ['轻度', '轻度', '轻度', '轻度', '中度', '中度', '中度', '重度', '重度', '重度'];
  items.on('click', 'li', function(){
    if(!items.data('flag')){
      tip.removeClass('jump infinite')
      li.removeClass('actived');
      items.data('flag', '1');
    }

    $(this).toggleClass('on');
    var selected = $('li.on', items);
    var arr = [];
    selected.each(function(i,v){
      arr.push($(v).data('cid'));
    });
    window.__wxshareitems = arr.join(('_'));
    var len = selected.length;
    num.html(len);
    level.html(levelArr[len]);
  });

  window.__wxsharecookie = function(){
    cc.writeCookie('zyb' + __wxzybid, __wxshareitems ,300);
  }

  wx($('#shareToWx'), '分享到【朋友圈】 <br/> 然后捏~~', function(){
    __wxsharecookie();
  });
});