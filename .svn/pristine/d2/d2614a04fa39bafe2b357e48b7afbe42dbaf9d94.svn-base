(function(b, c) {
  function f(a) {
    a = a.replace(/&lt;/g, "<");
    a = a.replace(/&gt;/g, ">");
    a = a.replace(/&(?:apos|#0?39);/g, "'");
    a = a.replace(/&quot;/g, '"');
    return a = a.replace(/&amp;/g, "&")
  }
  function g(a, b) {
    var c = a.substr(a.lastIndexOf(".")).toLowerCase();
    return b[c]
  }
  b.htmlEncode = function(a) {
    return a && a.replace ? a.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;") : a
  };
  b.htmlDecode = function(a) {
    return a && a.replace ? a.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&amp;/gi, "&") : a
  };
  b.hrefEncode = function(a) {
    return a.replace(/(http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?/ig, function(a) {
      return'<a target="_blank" href="' + (0 == a.indexOf("http") ? "" : "http://") + b.clearHtmlStr(a) + '">' + a + "</a>"
    })
  };
  b.isUrl = function(a) {
    return/(http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?/ig.test(a)
  };
  b.regFilter = function() {
    var a = /([\^\.\[\$\(\)\|\*\+\?\{\\])/ig;
    return function(b) {
      return b.replace(a, "\\$1")
    }
  }();
  b.getAsciiStr = function(a) {
    return(a || "").replace(/\W/g, "")
  };
  b.clearHtmlStr = function(a) {
    return a ? a.replace(/<[^>]*>/g, "") : a
  };
  b.clearLinkTag = function(a) {
    return a ? a.replace(/<a[^>]*>/g, "") : a
  };

  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d)\}/g, function () {
      return args[arguments[1]];
    });
  };

  window.log = function(msg){
    if(window.console && window.console.log){
      console.log(msg);
    }
  };
})(jQuery, this);

(function($) {
  function c(b) {
    return(b || "").toLowerCase().split("+").sort().join("").replace(/\s/ig, "")
  }
  var keys = {27:"esc", 9:"tab", 32:"space", 13:"enter", 8:"backspace", 145:"scroll", 20:"capslock", 144:"numlock", 19:"pause", 45:"insert", 36:"home", 46:"del", 35:"end", 33:"pageup", 34:"pagedown", 37:"left", 38:"up", 39:"right", 40:"down", 107:"=", 109:"-", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12", 188:"<", 190:">", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"},
    g = {"`":"~", 1:"!", 2:"@", 3:"#", 4:"$", 5:"%", 6:"^", 7:"&", 8:"*", 9:"(", "0":")", "-":"_", "=":"+", ";":":", "'":'"', ",":"<", ".":">", "/":"?", "\\":"|"};

  $.isHotkey = function(e, d) {
    var keyname, keycode = e.keyCode;
    keyname = keys[keycode];


    //如果keycode不在keys列表内
    if(!(keycode = !keyname && 49 <= keycode && 90 >= keycode && String.fromCharCode(keycode).toLowerCase())) {
      if(keycode = e.type, keycode = "mousewheel" == keycode || "DOMMouseScroll" == keycode) {
        keycode = 0 < e.wheelDelta || 0 > e.detail ? "mousewheelup" : "mousewheeldown";
      }
    }
    var i = e.ctrlKey, k = e.shiftKey, m = e.altKey, j = k && (g[keycode] || g[keyname]), n = [];
    !i && (!m && j) && (keyname = j, k = keycode = null);
    i && n.push("ctrl");
    k && n.push("shift");
    m && n.push("alt");
    keyname && n.push(keyname);
    keycode && n.push(keycode);
    keyname = n.join("+");
    return c(keyname) == c(d);
  }
})(jQuery, this);


(function ($, win) {
//用于存放聊天记录
  var store = {};

  store.storage = {}
  store.emoji = {"[微笑]":"1","[撇嘴]":"2","[色]":"3","[发呆]":"4","[得意]":"5","[流泪]":"6","[害羞]":"7","[闭嘴]":"8","[睡]":"9","[大哭]":"10","[尴尬]":"11","[发怒]":"12","[调皮]":"13","[呲牙]":"14","[惊讶]":"15","[难过]":"16","[酷]":"17","[冷汗]":"18","[抓狂]":"19","[吐]":"20","[偷笑]":"21","[愉快]":"22","[白眼]":"23","[傲慢]":"24","[饥饿]":"25","[困]":"26","[惊恐]":"27","[流汗]":"28","[憨笑]":"29","[悠闲]":"30","[奋斗]":"31","[咒骂]":"32","[疑问]":"33","[嘘]":"34","[晕]":"35","[疯了]":"36","[衰]":"37","[骷髅]":"38","[敲打]":"39","[再见]":"40","[擦汗]":"41","[抠鼻]":"42","[鼓掌]":"43","[糗大了]":"44","[坏笑]":"45","[左哼哼]":"46","[右哼哼]":"47","[哈欠]":"48","[鄙视]":"49","[委屈]":"50","[快哭了]":"51","[阴险]":"52","[亲亲]":"53","[吓]":"54","[可怜]":"55","[菜刀]":"56","[西瓜]":"57","[啤酒]":"58","[篮球]":"59","[乒乓]":"60","[咖啡]":"61","[饭]":"62","[猪头]":"63","[玫瑰]":"64","[凋谢]":"65","[嘴唇]":"66","[爱心]":"67","[心碎]":"68","[蛋糕]":"69","[闪电]":"70","[炸弹]":"71","[刀]":"72","[足球]":"73","[瓢虫]":"74","[便便]":"75","[月亮]":"76","[太阳]":"77","[礼物]":"78","[拥抱]":"79","[强]":"80","[弱]":"81","[握手]":"82","[胜利]":"83","[抱拳]":"84","[勾引]":"85","[拳头]":"86","[差劲]":"87","[爱你]":"88","[NO]":"89","[OK]":"90"};
  store.quickReplies = {'1': '提醒你回复','2': '对你很感兴趣','3': '对你不感兴趣','4': '请求面试','5': '接受了你的面试请求','6': '拒绝了你的面试请求','7': '请求与你交换联系方式','8': '接受与你交换联系方式','9': '拒绝与你交换联系方式'};
  store.inverseQuickReplies = {'1': '提醒回复','2': '很感兴趣','3': '不感兴趣','4': '请求面试','5': '接受了面试请求','6': '拒绝面试请求','7': '请求交换联系方式','8': '接受交换联系方式','9': '拒绝交换联系方式'};
  store.bubble = {
    me: '<div class="c_me"><img class="c_ct_img" src="{0}"  /><div class="c_me_msg"><i class="c_me_i"></i><pre>{1}</pre></div></div>',
    you: '<div class="c_you"><img class="c_ct_img" src="{0}"  /><div class="c_you_msg"><i class="c_you_i"></i><pre>{1}</pre></div></div>',
    quick: '<div class="c_quick"><p>{0}{1}</p></div>',
    audio: '<div class="c_quick"><p>{0}{1}</p></div>',
    myImg: '<div class="c_me" id="{0}"><img class="c_ct_img" src="{1}" /><div class="c_me_msg"><i class="c_me_i"></i>{2}</div></div>',
    myAppImg: '<div class="c_me"><img class="c_ct_img" src="{0}" /><div class="c_me_msg"><i class="c_me_i"></i>{1}</div></div>',
    yourImg: '<div class="c_you"><img class="c_ct_img" src="{0}" /><div class="c_you_msg"><i class="c_you_i"></i>{1}</div></div>'
  }

  //保存
  store.save = function(data){
      if(data && data.to){
        var o = {};
        var id = data.to;
        o[id] = store.storage[id] || [];
        o[id].push(data.msg);
        $.extend(store.storage, o);
      }
  }

  //获取全部消息
  store.pull = function (id) {
    var html = '';
    $.each(store.storage[id] || [], function(i, v){
      v = v || {};

      if(v.fileId){
        html += store.bubble[v['who']].format(v['fileId'], v['img'], v['words']);
      }else{
        html += store.bubble[v['who']].format(v['img'], v['words']);
      }
    });

    return html;
  }

  //格式化新消息
  store.htmlFilter = function(data, toSave){
    if(toSave){
      store.save(data)
    }

    var msg = data.msg;
    return (store.bubble[msg.who] || '').format(msg.img, msg.words);
  },

  //格式化表情符号
  store.emojiFormat = function(msg){
    return msg.replace(/\[[^\[\]]{1,3}\]/gi, function(e){
      if(e){
        var emoji = store.emoji[e];
        if(emoji){
          return '<img src="http://img.kanzhun.com/boss/expression/'+ emoji +'.png" class="c_emoji" />'
        }else{
          return msg;
        }
      }

    })
  }

  win.webChatStore = win.webChatStore || store;
})(jQuery, this);



(function ($, _s) {
  var panelWrap = $('#panelWrap'),
    panel = $('#panel'),
    chatField = $('#chatField'),
    chatFieldCopy = $('#chatFieldCopy'),
    contacts = $('#chatContacts'),
    chatWindow = $('#chatWindow'),
    currentName = $('#currentName'),
    asidePhone = $('dl.aside_phone'),
    whoareu = $('input[name=whoareu]').val(),
    myProtrait = $('#myProtrait').attr('src'),
    isBoss = whoareu == 'boss',
    myId = $('input[name=myId]').val();


  var maxId = -1,
    clientId = $('input[name=c]').val(),
    token = $('input[name=token]').val(),
    toId = $('input[name=to]'),
    checkXHR;


  //
  window.webChatImgLoaded = function(){
    panel.scrollTop(panel[0].scrollHeight);
  }

  //显示牛人电话
  function phoneControler(number, name, id){
    //只有BOSS才显示
    if(!isBoss){
      return;
    }

    var cn = '', str = '收起';

    if(!id){
      cn = ' class="none"';
      str = '展开';
    }
    if(!number){
      $(asidePhone).html('<dt>温馨提示</dt><dd><img src="../images/phone.jpg" /><p'+ cn +'>如果对方回复消息<em class="black">超过10句</em>，您就可以直接打电话给TA啦！</p></dd><dd class="t-right aside_phone_c"><em>'+str+'</em></dd>');
    }else{
      $(asidePhone).html('<dt>温馨提示</dt><dd class="have_phone"><img src="../images/phone_enabled.jpg" /><p'+ cn +'>聊得还满意吗？ <br/> 奉上<b class="black">牛人-'+ name +'</b><br/>电话<b class="green">'+number+'</b><br/>赶紧电聊吧！</p></dd><dd class="t-right aside_phone_c"><em>'+str+'</em></dd>');
      if(id){
        $('#cont_'+ id).attr('data-phone', number);
      }
    }

    asidePhone.show();
  }


  /*******************  chat module  *******************/

  var chat = {

    //关闭聊天窗口
    closeChatWindow: function (cb) {
      chatWindow.hide();
      toId.val('');
      $('div.c_contact', contacts).removeClass('current');

      if (cb) {
        cb.call(chatWindow);
      }
    },

    //打开聊天窗口
    //original 为服务端返回的原始数据
    openChatWindow: function (data, cb, original) {
      var o = $.extend({
        name: null,
        to: null,
        type: null,
        msg: {}   //string or jqueryObject
      }, data);

     var id = o.to;

      //来自App的自己发的消息
      if(o.isMine){
        o.type = 'send';
        if(o.msg.who == 'you'){
          o.msg.who = 'me';
        }

        //快捷回复和音频时 img为空
        o.msg.img && (o.msg.img =  myProtrait);

      //当前聊天的对象不是新消息对象，也不是来自App的自己发的消息，显示提示气泡
      }else if(id && o.type === 'new'&& o.to != toId.val()){
        o.type = 'another';
      }


      var current = this.switchPanel(o, original);

      if (cb) {
        cb.call(chatWindow, current);
      }
    },

    //聊天列表置顶
    bringToFront: function(target, data){

      //如果是陌生人
      if(target.length === 0 && data){
        var id = data.from.uid;
        target = $('<div class="c_contact" data-uid="'+id+'" id="cont_'+id+'">' +
          '<a href="/'+ whoareu +'/'+id+'" target="_blank"><img class="c_ct_img" src="'+ data.from.avatar +'" id="cp_'+id+'"></a>' +
          '<div class="c_ct_info">'+ data.from.name +'</div></div>');

      }

      contacts.prepend(target).scrollTop(0);

      target.addClass('current');

      return target;
    },

    //对话面板
    switchPanel: function(o, original){
      var news;

      function initParams(){
        if(o.to) {
          toId.val(o.to);
        }

        if(o.name){
          currentName.html(o.name);
        }

        o.to = toId.val();
      }

      switch (o.type){
        //已发消息
        case 'send':
//          log('send');
          initParams();


          //pull
          news = $(_s.htmlFilter(o, true));
          panel.append(news);

          this.bringToFront($('>div.current', contacts));
        break;


        //当前聊天对象的新消息
        case 'new':
//          log('from you');
          initParams();

          panel.append(_s.htmlFilter(o, true));

        break;


        //非当前聊天对象的新消息， 分为好友和陌生人
        case 'another':
//          log('from anther person');

          _s.save(o);

          var newsTarget = this.bringToFront($('#cont_' + o.to, contacts), original);

          var num = $('i.c_news', newsTarget);
          if(num.length){
            num.html(parseInt(num.text()) + 1);
          }else{
            $('div.c_ct_info', newsTarget).append('<i class="c_news">1</i>')
          }
        break;



        //切换聊天窗口（包括接收的、发送的已读和未读 的所有信息）
        case 'history':
//          log('change person');

          chatWindow.show();
          initParams();

          panel.html(_s.pull(o.to) || '');

        break;
      }


      //panel 焦点显示在最新消息
      panel.scrollTop(panel[0].scrollHeight);

      return news;
    },

    //发消息
    sendMsg: function () {
      var msg = chatField.val();
      if ($.trim(msg) === '') {
        return;
      }

      this.openChatWindow({
        msg: {
          who: 'me',
          words: msg,
          img: myProtrait
        },
        type: 'send'
      }, function(current){
        $.ajax({
          type : 'POST',
          url : '/sendmsg.json',
          data: {
            'to': toId.val(),
            'c': clientId,
            'token': token,
            'text': msg
          },
          beforeSend: function(){
            current.append('<img class="c_loading" src="../images/loading_s.gif" />');
          },
          dataType : 'json',
          cache : false,
          timeout : 10000,
          success : function(data) {
            $('img.c_loading', current).remove();
          },
          error : function() {
            $('img.c_loading', current).remove();
            current.append('<div class="c_fail">发送失败！</div>')
          }
        });

        chatField.val('').trigger('keydown');
      });
    },

    //解析新消息
    analyzeNewMsgs: function(data){
      data = data || {};
      var body = data.body,
        from = data.from;

      if(from && body){
        var type = body.type,
          ret,
          who = 'you',
          user = from.avatar,
          name = from.name,
          fromId = from.uid,
          isMine = false;

        if(fromId == myId){
          fromId = data.to.uid;
          name = '';
          isMine = true;
        }

        switch (parseInt(type)){
          //文本或表情
          case 1:
            ret = _s.emojiFormat(body.text || '');
          break;

          //语音
          case 2:
            try{
              if(isMine){
                ret = '你发送了一条语音';
              }else{
                ret = '给你发送了一条语音，请在手机APP上收听';
              }
            }catch (err){
              ret = null;
            }
            who = 'audio';
            if(isMine){
              user = '';
            }else{
              user = name;  //这里也是发名称
            }
            break;

          //图片
          case 3:
            try{
              ret = '<a class="c_thumb" data-lightbox="'+ fromId +'" href="'+ body.image.originImage.url +'"><img onload="webChatImgLoaded();" src="'+ body.image.tinyImage.url +'"  /></a>'
            }catch (err){
              ret = null;
            }

            if(isMine){
              who = 'myAppImg';
            }else{
              who = 'yourImg';
            }
          break;

          //快捷回复 + 显示对方电话号码
          case 4:
            var k = (body.action || {}).aid;

            //扩展 显示电话
            if(k == 13){
              var extend = $.parseJSON(body.action.extend);
              phoneControler(extend.phone, name, fromId);

              //不用存储
              ret = null;
            }else{
              if(isMine){
                ret = '['+_s.inverseQuickReplies[k]+']消息已发送';
              }else{
                ret = _s.quickReplies[k];
              }

            }

            if(ret){
              who = 'quick';

              //快捷回复时 显示名称而不是头像
              if(isMine){
                user = '';
              }else{
                user = name;
              }
            }else{
              return;
            }

          break;

        }

        if(ret){
          this.openChatWindow({
            name: name,
            to: fromId,
            msg: {
              img: user,
              words: ret,
              who: who
            },
            type: 'new',
            isMine: isMine
          }, null, data);
        }
      };
    },


    //轮循
    syncCheck: function () {
      var that = this;
      checkXHR = null;

      checkXHR = $.ajax({
        type: 'GET',
        url: '/chatsync.json',
        dataType: "json",
        data: {
          'c': clientId,
          'token': token,
          'id': maxId
        },
        cache: false,
        timeout: 40000,
        success: function(data){
//          log('fetch success');
          data = data || {};

          if(data.code == 1011){
            window.onbeforeunload = null;
            alert('您的账号已在别处登录！');
            window.location.href = 'http://' + window.location.host + '/login/';
          }else{
            //loop
            that.syncCheck();

            if (data.type == 1) {
              $.each(data.messages || [], function(i, v){

                that.analyzeNewMsgs(v);
                if (maxId < v.mid) {
                  maxId = v.mid;
                }
              });
            }
          }
        },
        error: function(data){
          if(data && data.status === 302){
            window.location.href = 'http://' + window.location.host + '/login/';
          }
          setTimeout(function(){
//            log('fetch error');
            that.syncCheck();
          }, 20000);
        }
      });


    }
  };

  //init
  chat.syncCheck();






  /*******************  chat events  *******************/

  //jquery scrollbar
  $('div.scrollbar-macosx').scrollbar();


  //输入框
  chatField.on('focus', function () {
    $(this).addClass('c_light');
  }).on('blur', function () {
    $(this).removeClass('c_light');
  }).on('keyup', function(e){
    e.stopPropagation();
  }).on('keydown', function (e) {


    if($.isHotkey(e, 'enter') || $.isHotkey(e, 'ctrl+enter') || $.isHotkey(e, 'alt+s')) {
      chat.sendMsg();
      e.preventDefault();
      return;
    }

    e.stopPropagation();


    //控制输入框高度
    var _this = $(this);
    chatFieldCopy.html($.htmlEncode(this.value.replace(/\n/g, '<br/>')) || '&nbsp;');
    var h = chatFieldCopy.height();


    if(h < 102){
      _this.css({'height': h, 'overflow-y': 'hidden'});
    }else{
      h = 102;
      _this.css({'height': 102, 'overflow-y': 'auto'});
    }

    panelWrap.css('padding-bottom', parseInt(panelWrap.css('padding-bottom')) + h - _this.height());

  });


  //关闭聊天窗口
  $('img.c_close').on('click', function () {
    chat.closeChatWindow();
    asidePhone.hide();
  });

  //打开
  contacts.on('click', 'div.c_contact', function () {
    var _this = $(this);
    _this.addClass('current').siblings('div.c_contact').removeClass('current');
    toId.val(_this.data('uid'));

    //remove 小红点
    _this.find('i.c_news').remove();

    var phone = _this.data('phone'),
      name = _this.text();
    chat.openChatWindow({
      name: name,
      type: 'history'
    });


    if(phone){
      phoneControler(phone, name);
    }else{
      phoneControler();
    }

  });

  //submit
  $('button.c_submit').on('click', function () {
    chat.sendMsg();
  });

  //展开收起电话
  asidePhone.on('click', 'em', function(){
    var tel = $('dd:first>p', asidePhone);
    if(tel.is(':hidden')){
      $(this).html('收起');
      tel.show();
    }else{
      $(this).html('展开');
      tel.hide();
    }
  });

  //before onload
  window.onbeforeunload = function(e) {
    e = e || window.event;
  // For IE and Firefox prior to version 4
    if (e) {
      e.returnValue = '刷新或关闭浏览器，对话信息将不会保留！';
    }
    return '刷新或关闭浏览器，对话信息将不会保留！';
  };






  /*******************  upload images  *******************/

  var uploader = WebUploader.create({

    // 选完文件后，是否自动上传。
    auto: true,

    // swf文件路径
    swf: '/js/Uploader.swf',

    // 文件接收服务端。
    server: '/sendimg.json',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#filePicker',
    fileVal: 'img',

    // 只允许选择图片文件。
    accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/*'
    },
    duplicate: true
  });

  uploader.on('uploadBeforeSend', function(o, data, heads){
    data.to = toId.val();
  }).on('uploadSuccess', function(file, data){
    data = data || {};
    if(file && data.result == 1){
      try{
        var origin = data.origin.url,
          thumbUrl = data.tiny.url,
          id = file.id;

        $('a.c_thumb', '#' + id).attr({
          'href': origin,
          'data-lightbox': id
        }).html('<img  onload="webChatImgLoaded();" src="'+ thumbUrl +'" />');


        _s.save({
          to: toId.val(),
          msg: {
            who: 'myImg',
            fileId: id,
            img: myProtrait,
            words: '<a class="c_thumb" data-lightbox="'+ id +'" href="'+ origin +'"><img onload="webChatImgLoaded();" src="'+ thumbUrl +'"  /></a>'
          }
        });
      }catch (err){
        $('a.c_thumb', '#'+ id).html('图片发送失败！');
      }
    }else{
      $('a.c_thumb', '#'+file.id).html('图片发送失败！');
    }
  }).on('uploadError', function(file){
    $('a.c_thumb', '#'+file.id).html('图片发送失败！');
  });

  // 当有文件添加进来的时候
  uploader.on( 'fileQueued', function( file ) {
    var $li = $('<div class="c_me" id="'+ file.id +'"><img class="c_ct_img" src="'+ myProtrait +'"  />' +
          '<div class="c_me_msg"><i class="c_me_i"></i><a class="c_thumb" href="javascript:;">正在发送图片...</a></div></div>');
//      $img = $li.find('.c_me_msg img');


    // $list为容器jQuery实例
    $('#panel').append( $li );

    chat.bringToFront($('#cont_' + toId.val()));

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
//    uploader.makeThumb( file, function( error, src ) {
//      if ( error ) {
//        $img.replaceWith('<span>不能预览</span>');
//        return;
//      }
//
//      $img.attr( 'src', src );
//    }, 100);
  });
})(jQuery, webChatStore);