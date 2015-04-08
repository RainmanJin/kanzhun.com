require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator','u/uploadPortrait_dialog'],function(){
	$(function(){
      $('input:text, input:password').placeholder();
      $('.select').DIYSelect({
          listCallback: function (list, field, select) {
              select.removeClass('s_err').addClass('s_suc');
              select.find('dt>input:hidden').val($(this).data('val'));
          }
      });
      var productForm=$('#productForm');
      function intiWebUpload(){
          // 初始化Web Uploader
          var uploader = WebUploader.create({
              // 选完文件后，是否自动上传。
              auto: true,
              // swf文件路径
              swf: '/js/Uploader.swf',
              // 文件接收服务端。
              server: '/file/companyPhoto/upload.json',
              // 选择文件的按钮。可选。
              // 内部根据当前运行是创建，可能是input元素，也可能是flash.
              pick: {
                  id: '.filebtn'
                  //label: '上传'
              },
              fileVal:'imgFile',
              fileSingleSizeLimit: 1024*1024*4, //最大限制4M
              // 只允许选择图片文件。
              accept: {
                  title: 'Images',
                  extensions: 'gif,jpg,jpeg,bmp,png',
                  mimeTypes: 'image/*'
              }
          });
          var loading=$('.uploading'),
            filebtn=$('.filebtn');
          uploader.on( 'uploadStart', function(file) {
              filebtn.hide();
              loading.show();
          });
          uploader.on( 'error', function( type ) {
              if(type == 'F_EXCEED_SIZE'){
                  alert('上传照片不能超过4M!');
              }
              if(type=="F_DUPLICATE"){
                  //alert("文件重复");
              }
          });
          // 文件上传成功，给item添加成功class, 用样式标记上传成功。
          uploader.on( 'uploadSuccess', function( file , response ) {
              if(response.rescode){
                  var len=$('ul li',productForm).length,
                    li_add=$('ul li[data-type=add]',productForm);
                  if(len==5){
                      li_add.hide();
                  }
                  loading.hide();
                  filebtn.show();
                  var h='<li>'+
                        '<div>'+
                            '<input type="hidden" name="photos" value="'+response.imgFileUrl+'" />'+
                            '<input type="hidden" name="photosId" value="0" />'+
                            '<img src="'+STATICURL+response.imgThumbFileUrl+'">'+
                            '<div class="masking none"><a href="javascript:;" class="js_del"><i class="base close_one"></i></a></div>'+
                        '</div>'+
                    '</li>';
                  li_add.before(h);
                  $('.js_photos_err',productForm).hide();
                  //重置
                  uploader.reset();
              }else{
                  alert("上传失败");
              }
          });
      }
      //删除公司产品照片
      $('ul',productForm).on('click','.js_del',function(){
          $(this).closest('li').remove();
          var len=$('ul li',productForm).length,
            li_add=$('ul li[data-type=add]',productForm);
          if(len==5){
              li_add.show();
          }
      });
      var speakTooMuch =  function(_this, prompt){
          var self = $(this),
            val = self.val();
          if(val.length < 10){
              prompt.err(self, '最少输入10个字');
              return false;
          }
          if(!('maxLength' in document.createElement('textarea'))){
              var ml = self.attr('maxlength');

              if(ml && val.length > ml){
                  prompt.err(self, '内容不要超过'+ ml +'字！');
                  return false;
              }else{
                  prompt.succ(self);
                  return true;
              }
          }
          prompt.succ(self);
          return true;
      };
      productForm.validatorAll({
          elems: '.v',
          prompt: {
              succ: function (target) {
                  target.parent().find('span.err').hide();
              },
              err: function (target, msg) {
                  var prompt = target.parent().find('span.err');
                  prompt.html('<i class="base errormsg"></i> '+(msg || prompt.data('msg'))).show();
              },
              normal: function (target) {
                  target.parent().find('span.err').hide();
              }
          },
          more: {
              description: function(_this, prompt){
                  return speakTooMuch.call(this, _this, prompt);
              }
          },
          ajaxSubmit: {
              elems: 'input:text, input:hidden,textarea',
              success: function (ret) {
                  if (ret.rescode == 1) {
                      $.maskUI.alert('公司产品保存成功');
                  }
              }
          }
      }).init().submit(function(){
          if($('input[name=photos]').length === 0){
              $('.js_photos_err',productForm).show();
              return false;
          }
          return true;
      });

      $('.js_save',productForm).on('click',function(){
          productForm.submit();
      });
      //字数计算
      $('form').on('keyup','textarea[data-type="countNum"]',function(){
          var _this=$(this),
            val=$.trim(_this.val()),
            len=val.length,
            target=_this.parent().find(".ta_hint").find('[node-type="num"]');
          target.html(len);
      });

      //点击编辑
      $('.manageRight .tt').on('click','.js_edit',function(){
          var ttDiv=$(this).closest('.tt');
          ttDiv.hide().siblings('.this_detail').show();
          ttDiv.siblings('.con_detail').show();
          ttDiv.closest('.s_wrap_default').addClass('no_bg');
          intiWebUpload();
      });
      //点击取消
      $('.manageRight .tt').on('click','.js_cancel',function(){
          var ttDiv=$(this).closest('.tt');
          $.maskUI.confirm({
              msg: '确定要取消吗',
              callback: function(){
                  //ttDiv.hide().siblings('.tt').show();
                  //ttDiv.siblings('.con_detail').hide();
                  //ttDiv.closest('.s_wrap_default').removeClass('no_bg');
                  location.reload();
              }
          })
      });
      //收起
      $('.manageRight .tt').on('click','.js_retract',function(){
          var ttDiv=$(this).closest('.tt');
          ttDiv.hide().siblings('.tt').show();
          ttDiv.siblings('.con_detail').hide();
          ttDiv.closest('.s_wrap_default').removeClass('no_bg');
      });

      //发展历程
      var processForm=$('#processForm');
      $('.js_add',processForm).on('click',function(){
          var ul=$('.development:eq(0)',processForm).clone();
          $(this).parent().before(ul).show();
      });
      processForm.validatorAll({
          elems: '.v',
          prompt: {
              succ: function (target) {
                  if (!target.hasClass('select')) {
                      target.parent().find('.err').hide();
                  } else {
                      //select的错误样式
                      target.parent().parent().parent().find('.err').hide();
                  }
              },
              err: function (target, msg) {
                  if (!target.hasClass('select')) {
                      var prompt = target.parent().find(' .err');
                  } else {
                      var prompt = target.parent().parent().parent().find('.err');
                  }
                  prompt.html('<i class="base errormsg"></i> '+(msg || prompt.data('msg'))).show();
              },
              normal: function (target) {
                  if (!target.hasClass('select')) {
                      target.parent().find('.err').hide();
                  } else {
                      target.parent().parent().parent().find('.err').hide();
                  }
              }
          },
          more: {
              description: function(_this, prompt){
                  return speakTooMuch.call(this, _this, prompt);
              }
          },
          ajaxSubmit: {
              elems: 'input:text, input:hidden,textarea',
              success: function (ret) {
                  if(ret.rescode==1){
                      var year=$('[name=timeYear]',processForm).val(),
                        month=$('[name=timeMonth]',processForm).val(),
                        description=$('[name=description]',processForm).val();
                      processForm[0].reset();
                      var h='';
                      h+='<dl class="development_list mb10">'+
                      '<dt>'+year+'年'+month+'月</dt>'+
                      '<dd>'+
                      '<p>'+description+'</p>'+
                      '<a class="links js_del" href="javascript:;" data-process_id="'+ret.processId+'">删除</a>'+
                      '</dd>'+
                      '</dl>';
                      processForm.before(h);
                  }
              }
          }
      }).init().submit();
      //删除发展历程
      $('.js_processSection').on('click','.js_del',function(){
          var _t=$(this);
          var processId=_t.data('process_id');
          $.ajax({
              url:'/company/removeProcess.json',
              type:'post',
              data:{
                  id:processId
              },
              success:function(result){
                  _t.closest('dl').remove();
              }
          });
      });
      //取消（清空）
      $('.js_one_cancel').on('click',function(){
          var form=$(this).closest('form');
          form[0].reset();
          form.find('.err').hide();
          $('[node-type="num"]',form).html('0');
      });

      //添加媒体新闻
      var newsForm=$('#newsForm');
      newsForm.validatorAll({
          elems: '.v',
          prompt: {
              succ: function (target) {
                  target.parent().find('>span.err').hide();
              },
              err: function (target, msg) {
                  var prompt = target.parent().find('span.err');
                  prompt.html('<i class="base errormsg"></i> '+(msg || prompt.data('msg'))).show();
              },
              normal: function (target) {
                  target.parent().find('>span.err').hide();
              }
          },
          more: {
              url: {
                  type: 'isUrl',
                  msg: '链接格式错误'
              }
          },
          ajaxSubmit: {
              elems: 'input:text, input:hidden',
              success: function (ret) {
                  if (ret.rescode == 1) {
                      var title=$('[name=title]',newsForm).val(),
                          url=$('[name=url]',newsForm).val();
                      newsForm[0].reset();
                      var h='';
                      h+='<dl class="news_list">'+
                          '<dt><a href="javascript:;" class="links js_del" data-news_id="'+ret.news_id+'">删除</a></dt>'+
                          '<dd><a href="'+url+'" target="_blank" class="links">'+title+'</a></dd>'+
                      '</dl>';
                      newsForm.before(h);
                  }
              }
          }
      }).init().submit();
      //删除媒体新闻
      $('.js_newsSection').on('click','.js_del',function(){
          var _t=$(this);
          var newId=_t.data('news_id');
          $.ajax({
              url:'/company/removeNews.json',
              type:'post',
              data:{
                  id:newId
              },
              success:function(result){
                  _t.closest('dl').remove();
              }
          });
      });

      //ceo
      $('#uploadCeo').on('click',function(){
          var _t=$(this);
          $.initUploadPortrait({
              title:"上传ceo照片",
              url:"uploadURL=/file/company/upload/ceophoto.json?c=uploadPortrit&amp;jsCallback=uploadOk",
              callback:function(picurls){
                  $('img',_t).attr('src', STATICURL + picurls[1]);
                  $('[name=picture]').val(picurls[0]);
                  $('.dialog_close').trigger('click');
              }
          });
      });

      var ceoForm=$('#ceoForm');
      ceoForm.on('focus', 'input[name=url]', function(){
        $(this).parent().find('.err').hide();
      });

      ceoForm.on('blur', 'input[name=url]', function(){
        var urlVal = $.trim($(this).val());
        if( urlVal == '' ) {
          $(this).parent().find('.err').hide();
        }
      });

      ceoForm.validatorAll({
          elems: '.v',
          prompt: {
              succ: function (target) {
                  target.parent().find('>span.err').hide();
              },
              err: function (target, msg) {
                  var prompt = target.parent().find('span.err');
                  prompt.html('<i class="base errormsg"></i> '+(msg || prompt.data('msg'))).show();
              },
              normal: function (target) {
                  target.parent().find('>span.err').hide();
              }
          },
          ajaxSubmit: {
              elems: 'input:text, input:hidden',
              success: function (ret) {
                  if (ret.rescode == 1) {
                      $.maskUI.alert('ceo信息保存成功');
                  }
              }
          }
      }).init().submit();

      $('.js_save',ceoForm).on('click',function(){
        var urlVal = $.trim($('input.js-url').val());
        if( !(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i).test(urlVal) && urlVal !== '' ) {
          $('span.js-url-err').show();
        }else {
          ceoForm.submit();
        }

      });
	});
});