/*这个JS包含网站最基本的功能，依次是：
登录注册弹层方法，
分页，
登录后用户下拉菜单，
移动版自适配cookie，
顶部banner，
判断是否登录接口*/

define(['c/widgets'], function () {
  var authOpen = function (type) {
    if ($('#authFrame').length === 0) {
      $('body').append('<iframe class="overlay" scrolling="no" allowtransparency="true" src="/loginasy/' + (typeof type === 'string' ? type : $(type).attr('href')) + '" frameborder="0" id="authFrame" ></iframe>');
    }
  };

  var authBind = function (elems, type) {
    elems.each(function (i, v) {
      $(v).on('click', function (e) {
        e.preventDefault();
        authOpen(this);
      });
    });
  };

  $(function () {
    /*
    class为auth_dialog的a标签默认绑定登录注册事件
    href为#login为登录，register为注册
    */
    authBind($('a.auth_dialog'));

    //logged user info
    $('div.hello dl', 'header').hover(function () {
      if ($.support.css3Property('transition')) {
        $(this).find('dt').find('i.drop_down').addClass('drop_down_h');
      } else {
        $(this).find('dt').find('i.drop_down').addClass('drop_down_nocss3');
      }
      $(this).find('dd').show();
    }, function () {
      $(this).find('dd').hide();
      if ($.support.css3Property('transition')) {
        $(this).find('dt').find('i.drop_down').removeClass('drop_down_h');
      } else {
        $(this).find('dt').find('i.drop_down').removeClass('drop_down_nocss3');
      }
    });

    //paging
    $('div.staticPager').paging({
      staticUrl: true
    });


    //移动版
    $('#toMobile').click(function () {
      $.delCookie('__m_2_wid');
    });

    //top banner
    var tic = $('#t_i_c');
    $(tic).click(function () {
      $('div.top_img').slideUp(function(){
        $(this).hide();
        $.writeCookie(tic.data('ck'), 'reborn', 60);
      });
    });
  });
  

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
    bind: authBind,
    open: authOpen,
    isLogged: function () {
      return isLogged;
    }
  };

});