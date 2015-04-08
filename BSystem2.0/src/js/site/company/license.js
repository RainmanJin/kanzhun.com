require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator'],function(){
	$(function(){
      $('input:text, input:password').placeholder();
      function intiWebUpload(){
          // 初始化Web Uploader
          var uploader = WebUploader.create({
              // 选完文件后，是否自动上传。
              auto: true,
              // swf文件路径
              swf: '/js/Uploader.swf',
              // 文件接收服务端。
              server: '/file/upload.json',
              // 选择文件的按钮。可选。
              // 内部根据当前运行是创建，可能是input元素，也可能是flash.
              pick: {
                  id: '.filebtn'
                  //label: '上传'
              },
              fileSingleSizeLimit: 1024*1024*4, //最大限制4M
              // 只允许选择图片文件。
              accept: {
                  title: 'Images',
                  extensions: 'gif,jpg,jpeg,bmp,png',
                  mimeTypes: 'image/*'
              }
          });
          var loading=$('.uploading'),
            filebtn=$('.filebtn'),
            hearUpload=$('.hear_upload');
          uploader.on( 'uploadStart', function(file) {
              //filebtn.hide();
              $('p.red',hearUpload).hide();
              hearUpload.find('>div').show();
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
                  loading.hide();
                  $('.img',hearUpload).html('<img width=207 height=300 src="'+STATICURL+response.imgFileUrl+'">');
                  $('[name="licensePath"]').val(response.imgFileUrl).siblings('.err').hide();
                  uploader.reset();
              }else{
                  alert("上传失败");
              }
          });
      }
      try{
          intiWebUpload();
      }catch(e){
          //console.log(e);
      }
      $('#licenseForm').validatorAll({
          elems: '.v',
          prompt: {
              succ: function (target) {
                  if (target.attr('name').indexOf('selectflag') === -1) {
                      target.parent().find('>.err').hide();
                  } else {
                      //select的错误样式
                      target.parent().parent().parent().find('.red').hide();
                  }
              },
              err: function (target, msg) {
                  if (target.attr('name').indexOf('selectflag') === -1) {
                      var prompt = target.parent().find('.err');
                  } else {
                      var prompt = target.parent().parent().parent().find('.err');
                  }
                  prompt.html('<i class="base errormsg"></i> '+(msg || prompt.data('msg'))).show();
              },
              normal: function (target) {
                  if (target.attr('name').indexOf('selectflag') === -1) {
                      target.parent().find('>.err').hide();
                  } else {
                      //target.parent().parent().removeClass('s_err s_suc');
                      target.parent().parent().parent().find('.err').hide();
                  }
              }
          },
          more: {

          },
      }).init().submit();

      $('span.has_poptt').on('click','.close_two',function(){
          $(this).parent().hide();
      });

    $('span.has_poptt').on('mouseover', function(){
      $(this).find('div').show();
    });

	});
});