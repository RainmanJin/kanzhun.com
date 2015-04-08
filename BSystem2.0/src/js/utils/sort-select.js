(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory); // AMD support for RequireJS etc.
  } else {
    factory();
  }
}(function () {
  $.fn.extend({
    sortSelect: function (opts) {
      var o = $.extend({
        listSelector: '.s_tt_con li>a',
        keepDefault: false,    //if the options are links
        listCallback: null,
        showCallback: null,
        hideCallback: null,
        autoClose: false,     //是否自动关闭
        secondAjaxCallback:null, //第二级数据ajax
        thirdAjaxCallback:null //第三级数据ajax
      }, opts);

      this.each(function (i, v) {
        var target = $(v),
          dt=$('dt',target),
          field = target.find('dt>input:text, dt>input:button'),
          fHids = target.find('dt>input:hidden'),
          sureBtn = $('div.js-job-btn'),
          list = target.find('dd'),
          secondDiv=$('[data-node-type=second_tree]',target),
          thirdDiv=$('[data-node-type=third_tree]',target);
        var check_arr=[], check_id_arr = []; //记录选中的职位类别数组
        if( fHids.val() !== '' ) {
          check_arr = $.trim(field.val()).split(",");
          check_id_arr = $.trim(fHids.val()).split(",");
        }
        if (!o.keepDefault) {
          target.on('click', o.listSelector, function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $con=$(this).closest('div'),
                nodeType=$con.data('node-type'),
                index=$(this).parent().index(),
                vl=$(this).html(),
                $nav=$('.s_tt ul',target);
            if(nodeType=='first_tree'){
              $('li:last',$nav).before('<li><a href="javascript:;"><em>'+vl+'</em><i></i></a></li>');
              $con.hide();
              if(o.secondAjaxCallback){
                o.secondAjaxCallback.call(this, list, field, target);
              }/*else{
                secondDiv.show().find('ul:eq('+index+')').show().siblings().hide();
              }*/
              secondDiv.show().find('ul:eq('+index+')').show().siblings().hide();
            }else if(nodeType=='second_tree'){
              $('li:last',$nav).before('<li><a href="javascript:;"><em>'+vl+'</em><i></i></a></li>');
              $con.hide();
              sureBtn.show();
              if(o.thirdAjaxCallback){
                o.thirdAjaxCallback.call(this, list, field, target);
              }/*else {
                thirdDiv.show().find('ul:eq(' + index + ')').show().siblings().hide();
              }*/
              thirdDiv.show().find('ul:eq(' + index + ')').show().siblings().hide();
            }else if(nodeType=='third_tree'){
              var checkLen=$('li .current',thirdDiv).parent().length,
                  v2 = $(this).data('class-id');
              if($(this).hasClass('current')){
                $(this).removeClass('current');
                check_id_arr.splice($.inArray(v2,check_id_arr),1); //删除数组的元素
                check_arr.splice($.inArray(vl,check_arr),1); //删除数组的元素
              }else{
                if(checkLen<3){
                  $(this).addClass('current');
                  check_id_arr.push(v2);
                  check_arr.push(vl);
                }
              }
            }
            //field.val($(this).html());
            //$(document).trigger('click');
          });
        }
        target.on('click', '.s_tt li>a', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if($(this).data('node-type')!='default'){
            var li=$(this).parent(),
              index=li.index();
            if(index==0){
              $('.s_tt li>a[data-node-type=default]',target).parent().siblings().remove();
            }else{
              li.remove();
            }
            sureBtn.hide();
            $('.s_tt_con:eq('+index+')').show().siblings('.s_tt_con').hide();
            resetSelect();
          }
        });

        //确定
        target.on('click','.btn_grey_s',function(){
          field.val(check_arr.join('，'));
          fHids.val(check_id_arr.join(','));
          list.hide();
          dt.find('span').removeClass('on');
          if (o.listCallback) {
            o.listCallback.call(this, list, field, target);
          }
        });
        //关闭
        target.on('click','.close_three',function(){
          list.hide();
          dt.find('span').removeClass('on');
        });

        target.on('click', 'dt', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var self = $(this).find('span');

          if(o.autoClose){
            $(document).trigger('click').one('click', function () {
              list.hide();
              self.removeClass('on');
              if (o.hideCallback) {
                o.hideCallback(list, field, target);
              }
            });
          }
          self.addClass('on');
          list.show();

          if(o.showCallback){
            o.showCallback.call(this, list, field, target);
          }
        });
        //清空选项
        function resetSelect(){
          $('a',thirdDiv).removeClass('current');
          check_arr=[];
          check_id_arr = [];
          field.val('');
          fHids.val('');
        }
      });
    }
  });
}));
