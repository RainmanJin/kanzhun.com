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
    return"zh_CN" == document.lang ? a.replace(/(http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?/ig, function(a) {
      var h = WebMM.model("account");
      return'<a target="_blank" href="' + ("/cgi-bin/mmwebwx-bin/webwxcheckurl?uin=" + h.getUin() + "&sid=" + encodeURIComponent(h.getSid()) + "&skey=" + encodeURIComponent(h.getSkey()) + "&deviceid=" + encodeURIComponent(WebMM.getDeviceId()) + "&opcode=2&requrl=" + encodeURIComponent((0 == a.indexOf("http") ? "" : "http://") + b.clearHtmlStr(f(a))) + "&scene=1&username=" + h.getUserName()) + '">' + a + "</a>"
    }) : a.replace(/(http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?/ig, function(a) {
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
  b.formatNum = function(a, b) {
    var c = (isNaN(a) ? 0 : a).toString(), d = b - c.length;
    return 0 < d ? [Array(d + 1).join("0"), c].join("") : c
  };
  b.numToStr = function(a, b) {
    for(var c = "" + a.toFixed(b), d = /(-?\d+)(\d{3})/;d.test(c);) {
      c = c.replace(d, "$1,$2")
    }
    return c
  };
  b.numToTimeStr = function(a, c) {
    return b.tmpl(c, {SS:b.formatNum(parseInt(a) % 60, 2), MM:b.formatNum(parseInt(a / 60) % 60, 2), HH:b.formatNum(parseInt(a / 3600) % 60, 2)})
  };
  b.formatDate = function(a, c) {
    var d = a instanceof Date ? a : new Date(a), e = b.formatNum;
    return c.replace(/YYYY/g, e(d.getFullYear(), 4)).replace(/MM/g, e(d.getMonth() + 1, 2)).replace(/DD/g, e(d.getDate(), 2)).replace(/hh/g, e(d.getHours(), 2)).replace(/mm/g, e(d.getMinutes(), 2)).replace(/ss/g, e(d.getSeconds(), 2))
  };
  b.endsWith = function(a, b) {
    return-1 !== a.indexOf(b, a.length - b.length)
  };
  b.getAsiiStrLen = function(a) {
    return(a || "").replace(/[^\x00-\xFF]/g, "aa").length
  };
  b.stripStr = function(a, b) {
    var c = 0, d, e;
    d = 0;
    for(e = a.length;d < e && c < b;d++) {
      128 > a.charCodeAt(d) ? c++ : c += 2
    }
    return a.substr(0, d)
  };
  b.subAsiiStr = function(a, c, d, e) {
    for(var g = function(a) {
      return a
    }, f = e ? htmlEncode : g, a = (e ? htmlDecode : g)(b.trim((a || "").toString())), d = d || "", e = Math.max(c - d.length, 1), g = a.length, o = 0, q = -1, r, t = 0;t < g;t++) {
      if(r = a.charCodeAt(t), o += 35 == r || 87 == r ? 1.2 : 255 < r ? 1.5 : 1, -1 == q && o > e && (q = t), o > c) {
        return f(a.substr(0, q)) + d
      }
    }
    return f(a)
  };
  b.parseURLParam = function(a) {
    var c = a.indexOf("?"), a = -1 < c ? a.slice(c + 1) : "", d = {};
    a && b(a.split("&")).each(function(a, b) {
      var h = b.split("=");
      2 == h.length && (d[h[0]] = h[1])
    });
    return d
  };
  b.isArr = Array.isArray || function(a) {
    return"[object Array]" == Object.prototype.toString.call(a)
  };
  b.isObj = function(a) {
    return"object" === typeof a
  };
  var e = 0, d = document.title;
  b.flashTitle = function(a) {
    c.qplus && c.qplus.window.flashWindow && qplus.window.flashWindow();
    clearInterval(e);
    document.title = a;
    e = setInterval(function() {
      document.title = document.title == d ? a : d
    }, 1500)
  };
  b.stopFlashTitle = function() {
    clearInterval(e);
    setTimeout(function() {
      document.title = d
    }, 1E3)
  };
  b.form = function(a, c) {
    var d = c || {}, e = b(document.createElement("form"));
    e.attr("method", "post").attr("action", a);
    for(var g in d) {
      e.append('<input type="hidden" name="' + g + '" value="' + d[g] + '">')
    }
    document.body.appendChild(e[0]);
    e.submit()
  };
  b.fn.getFormParam = function() {
    var a = this, b = {};
    a.size() && ["input", "textarea", "select"].forEach(function(c) {
      a.find(c).forEach(function(a) {
        if(a.name && ("radio" != a.type && "checkbox" != a.type || a.checked)) {
          b[a.name] = (a.value || "").trim()
        }
      })
    });
    return b
  };
  b.extend2 = function() {
    for(var a = {}, c = 0, d = arguments.length;c < d;c++) {
      b.extend(a, arguments[c])
    }
    return a
  };
  b.safe = function(a, b, c) {
    try {
      return a && a.apply(c || this, b || []), 0
    }catch(d) {
      return Log.e("JS Function: $.safe, e.stack: " + d.stack), -1
    }
  };
  b.getCookie = function(a) {
    return RegExp(["(?:; )?", b.regFilter(a), "=([^;]*);?"].join("")).test(document.cookie) && decodeURIComponent(RegExp.$1)
  };
  b.fn.insertTextToInput = function(a) {
    var b = this[0];
    if(document.selection) {
      b.focus(), document.selection.createRange().text = a
    }else {
      if("number" == typeof b.selectionStart) {
        var c = b.selectionStart, d = b.value;
        b.value = d.substr(0, b.selectionStart) + a + d.substr(b.selectionEnd);
        b.selectionStart = b.selectionEnd = c + a.length
      }else {
        b.value += a
      }
    }
    return this
  };
  b.clone = function(a) {
    return b.extend(!0, {}, {v:a}).v
  };
  b.getExt = function(a) {
    return a.substr(a.lastIndexOf(".") + 1).toLowerCase()
  };
  b.getFileName = function(a) {
    a = b.trim(a).split("\\");
    return a[a.length - 1]
  };
  var a = {".bmp":1, ".png":1, ".jpeg":1, ".jpg":1, ".gif":2};
  b.isImg = function(c) {
    return!!g(b.trim(c) || "", a)
  };
  b.isGif = function(c) {
    return developMode ? 2 == g(b.trim(c) || "", a) : !1
  };
  b.getSizeDesc = function(a) {
    if(b.isNumeric(a)) {
      return 0 < a >> 20 ? "" + Math.round(10 * a / 1048576) / 10 + "MB" : 0 < a >> 9 ? "" + Math.round(10 * a / 1024) / 10 + "KB" : "" + a + "B"
    }
  };
  b.computeVoiceNodeWidth = function(a) {
    return 2E3 > a ? 80 : 1E4 > a ? 80 + 10 * (a - 2E3) / 1E3 : 6E4 > a ? 160 + 10 * (a - 1E4) / 1E4 : 220
  };
  b.fn.isShow = function() {
    return 0 < this.length && "none" != this.css("display")
  };
  b.canPlayH264 = !!document.createElement("video").canPlayType;
  b.fn.insertTextToInput = function(a) {
    var b = this[0];
    if(!b || "TEXTAREA" != b.tagName && "INPUT" != b.tagName) {
      return this
    }
    if(document.selection) {
      b.focus(), document.selection.createRange().text = a
    }else {
      if("number" == typeof b.selectionStart) {
        var c = b.selectionStart, d = b.value;
        b.value = d.substr(0, b.selectionStart) + a + d.substr(b.selectionEnd);
        b.selectionStart = b.selectionEnd = c + a.length
      }else {
        b.value += a
      }
    }
    return this
  };
  b.fn.moveToInputEnd = function() {
    var a = this[0];
    if(!a || "TEXTAREA" != a.tagName && "INPUT" != a.tagName) {
      return this
    }
    a.focus();
    var b = a.value.length;
    document.selection ? (a = a.createTextRange(), a.moveStart("character", b), a.collapse(), a.select()) : "number" == typeof a.selectionStart && (a.selectionStart = a.selectionEnd = b);
    return this
  };
  b.fn.setDblClickNoSel = function() {
    function a() {
      return(_aoDomObj.getAttribute(c) || "").toString().split(",")
    }
    var c = "__MoUSeDoWnnoSEL__";
    _aoDomObj = this[0];
    1 == a().length && (_aoDomObj.setAttribute(c, [0, "up"]), this.bind("mousedown", function(d) {
      var e = b.now(), g = parseInt(a()[0]);
      _aoDomObj.setAttribute(c, [e, "down"]);
      500 > e - g && d.preventDefault()
    }), this.bind("mouseup", function() {
      var b = a()[0];
      _aoDomObj.setAttribute(c, [b, "up"])
    }), this.bind("selectstart", function(b) {
      "up" == a().pop() && b.preventDefault()
    }));
    return this
  };
  b.isiOS = function() {
    var a = navigator.platform;
    return"iPad" === a || "iPhone" === a || "iPod" === a
  };
  b.isChrome = function() {
    var a = navigator.userAgent.toLowerCase(), b = navigator.appVersion.toLowerCase(), c = -1 < a.indexOf("applewebkit"), b = c ? -1 != b.indexOf("qqbrowser") ? 1 : 0 : 0;
    return c && !b && -1 < a.indexOf("chrome") && 0 > a.indexOf("se 2.x metasr 1.0")
  };
  b.evalVal = function(a) {
    var d = "a" + b.now();
    b.globalEval(["(function(){try{window.", d, "=", a, ";}catch(_oError){}})();"].join(""));
    a = c[d];
    c[d] = null;
    return a
  };
  b.genImgCentralStyle = function(a) {
    var c = b(a), d = a.width, a = a.height, e = c.parent().width(), g = c.parent().height();
    debug("width:" + d + ", height:" + a);
    var f = d / a;
    f > e / g ? (a = g, d = f * a, c.css({height:a, width:d, top:0, left:(e - d) / 2, visibility:"inherit"}).show()) : (d = e, a = d / f, c.css({height:a, width:d, top:(g - a) / 2, left:0, visibility:"inherit"}).show())
  };
  b.transform = function(a, b, c) {
    var d = b.position();
    a.animate({left:d.left, top:d.top, width:b.width(), height:b.height()}, c)
  };
  b.selectText = function(a, b, c) {
    b = b || 0;
    c = c || a.value.length;
    if(a.createTextRange) {
      var d = a.value.length, a = a.createTextRange();
      a.moveStart("character", b);
      a.moveEnd("character", c - d);
      a.select()
    }else {
      a.setSelectionRange(b, c), a.focus()
    }
  };
  b.setInputLength = function(a, c) {
    a.off("keydown").on("keydown", function(a) {
      a = a.keyCode;
      if(b.getAsiiStrLen(this.value) >= c && 8 != a && 37 != a && 39 != a) {
        return!1
      }
    });
    return a
  };
  b.getURLFromFile = function(a) {
    var b = a.name || a.fileName || "";
    if(".gif" == b.substr(b.lastIndexOf(".")).toLowerCase()) {
      return null
    }
    b = null;
    void 0 != window.createObjectURL ? b = window.createObjectURL(a) : void 0 != window.URL ? b = window.URL.createObjectURL(a) : void 0 != window.webkitURL && (b = window.webkitURL.createObjectURL(a));
    return b
  };
  b.isLowerBrowser = function() {
    var a = navigator.userAgent, b = a.match(/Trident\/(.*?);/), c = a.match(/MSIE(.*?);/);
    if((a = a.match(/QQ[^A]rowser\/([0-9]+)\./)) && 1 < a.length && 8 > parseInt(a[1])) {
      return!0
    }
    if(!b) {
      return!c || 1 < c.length && 8 < parseInt(c[1]) ? !1 : !0
    }
    b = parseInt(b[1]);
    return 4 < b ? !1 : !0
  }
})(jQuery, this);