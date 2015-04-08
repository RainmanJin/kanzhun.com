(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory); // AMD support for RequireJS etc.
  } else {
    factory();
  }
})(function () {
//back
  if (document.querySelector('header.page_hd a.top_back')) {
    document.querySelector('header.page_hd a.top_back').onclick = function (e) {
      e.stopPropagation();
      if (document.referrer.indexOf("/city") > 0) {
        history.go(-3);
      }else {
        if(document.referrer.length>0){
          if(document.referrer.indexOf(location.host)>0){
            //只有本域才返回上一页面
            history.back();
          }else{
            location.href="/";
          }
        }else{
          location.href="/";
        }
      }
    };
  }

  (function () {
    var common = {
      isSite: function (str) {
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
          + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
          + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
          + "|" // 允许IP和DOMAIN（域名）
          + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
          + "[a-z]{2,6})" // first level domain- .com or .museum
          + "(:[0-9]{1,4})?" // 端口- :80
          + "((/?)|" // a slash isn't required if there is no file name
          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re = new RegExp(strRegex);
        return re.test(str);
      },
      isMail: function (str) {
        return (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(str);
      },
      isNumber: function (str) {
        return (/^\d+$/).test(str);
      },
      isPhone: function (str) {
        return (/^1\d{10}$/).test(str);
      },
      isPwd: function (str) {
        return (/^\d{6,}$/).test(str);
      },
      isIntger: function (str) {
        return (/^\d*[1-9]\d*$/).test(str);
      },
      //获取url里的参数
      queryString: function (key) {
        var svalue = window.location.search.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
      }
    }
    window.common = common;
  })();

  $(function () {
    //回到顶部显隐控制
    if ($(".backtotop")[0]) {
      var windowH = $(window).height(),
        scrollH = $(document).height(),
        floatFooterH = $(".floatFooter").height();
      if (scrollH - windowH > floatFooterH) {
        $(".backtotop").show();
      }
    }
    ;

//判断是否登录接口
    //使用方法：直接判断window.isLogged === true
    window.userXHR = window.userXHR || $.getJSON(CONTEXTPATH + '/islogin.json');
    window.isLogged = false;
    userXHR.done(function (ret) {
      if (ret && ret.rescode == 1) {
        window.isLogged = true;
      }
    });
    return {
      isLogged: function () {
        return isLogged;
      }
    };
  });

});
