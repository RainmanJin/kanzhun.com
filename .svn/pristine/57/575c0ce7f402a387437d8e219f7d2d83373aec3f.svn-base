require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets', 'u/validator'],function(){
	$(function(){

    //鼠标滑过点评列表分数详情(优化)
    $('span.js_hover_gd').on('mouseenter',function(){
      var _t=$(this);
      _t.siblings('.grade_detail').show().end().next().addClass('fronts_a_hover');
    }).on('mouseleave',function(){
      var _t=$(this);
      _t.siblings('.grade_detail').hide().end().next().removeClass('fronts_a_hover');
    });
    $('span.js_hover_gd').next().on('mouseenter', function(){
      $(this).siblings('.grade_detail').show().end().addClass('fronts_a_hover');
    }).on('mouseleave', function(){
      $(this).siblings('.grade_detail').hide().end().removeClass('fronts_a_hover');
    });

    //评论弹窗
    var comment_pop = $('#comment_pop'),
        shortViewContent = $('#shortViewContent'),
        shortViewPrompt = $('#shortViewPrompt');
    $('#js_cmp_comment').on('click', '.js_comment_pop', function(){
      var self = $(this);
      $.maskUI.open({
        elem: comment_pop
      });
      $('input[name=reviewId]', comment_pop).val(self.data('reviewid'));
      $('input[name=id]', comment_pop).val(self.data('id'));
      shortViewContent.val(self.parent().prev('p').html());
      var Tlength = $.trim(self.parent().prev('p').html()).length;
      if( Tlength > 0 ) {
        shortViewPrompt.html('您还可以输入<strong class="ok">' + Math.abs(300-Tlength) + '</strong>字');
      }
    });

    //输入评论信息计数
    shortViewContent.on('keyup', function(e){
      e.stopPropagation();
      var remain = this.value.length - 300;
      if(remain <= 0){
        shortViewPrompt.html('您还可以输入<strong class="ok">' + Math.abs(remain) + '</strong>字');
        $('#shortreviewForm input[type=submit]').prop('disabled', false);
      }else{
        shortViewPrompt.html('您已超出输入<strong class="err">' + remain + '</strong>字');
        $('#shortreviewForm input[type=submit]').prop('disabled', true);
      }
    });

    $('#comment_pop_frm').ajaxForm({
      selector: 'textarea, input:hidden',
      validate: function(components){
        if($.trim(shortViewContent.val()) === ''){
          shortViewContent.addClass('shine');
          return false;
        }else{
          return true;
        }
      },
      dataType: 'json',
      beforeSend: function(){
        shortViewContent.val('');
        shortViewPrompt.html('您还可以输入<strong class="ok">300</strong>字');
      },
      success: function(ret, components){
        if(ret){
          //$('#reviewsWrapper').prepend(ret);
         window.location.reload();
        }
      }
    });

    //右侧tab切换
    $('#js_cmp_comment').tabs({
      tabSelector: 'nav span',
      current: 'current',
      tabPanel: 'div.tab_con',
      callback: function (index, panel) {
        if ($.support.css3Property('transition')) {
          this.parent().css({'background-position': 133 * index + 'px bottom'});
        } else {
          this.parent().animate({'background-position-x': 133 * index}, 200);
        }

      },
      animate: 'fadeIn'
    });

	});
});