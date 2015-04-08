require.config({
    urlArgs: "v=1.0.1",
    baseUrl: '../js',
    paths: {
      jquery: 'utils/jquery-1.11.0.min',
      u: 'utils',
      s: 'site'
    }
});

require(['jquery'], function($){
    $(function(){

        //修改头像
        $('a.modifyheads').hover(function(){
          $(this).parent().find('em#modifybg').css('opacity','.55');
        },function(){
          $(this).parent().find('em#modifybg').css('opacity','.35');
        });

        //展开收起
        $('a.controlbtn').on('click', function(){
          var self = $(this);
          if(self.find('i.grey_arrow').length){
            self.html('收起<i class="grey_arrow_up"></i>').parent().next('li').show();
          }else{
            self.html('展开<i class="grey_arrow"></i>').parent().next('li').hide();
          }
        });

        //返回顶部
        $(window).scroll(function(){
          if(Math.max($('html,body').scrollTop(),$(document).scrollTop()) > 100){
            $('#quick').fadeIn(300);
          }else{
            $('#quick').hide();
          }
        });
        $('#quick').on('click', function(){
          $('html, body').animate({scrollTop:0},200);
        });

        //下拉菜单
        $('dl.select > dt').on('click', function(){
          var self = $(this);
          self.next('dd').slideToggle();
          self.parent().addClass('hadclick');
          self.find('span').addClass('on');
        });
        $('dl.select > dd > ul >li > a').click(function(){
          //$('dl.select > dd').hide().parent().removeClass('hadclick');
          //$('dl.select > dt').find('span').removeClass('on');
          $(this).addClass('hadclick');
          $(this).next('div').show();
          $(this).parent().css('z-index',5);
        });

        //$('#jobMenu').
    });
});




