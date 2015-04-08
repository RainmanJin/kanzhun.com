require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator','u/uploadPortrait_dialog'],function(){
	$(function(){
      var picUl=$('.P_picture');
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
                  var len=$('li',picUl).length,
                    li_add=$('li[data-type=add]',picUl);
                  if(len==20){
                      li_add.hide();
                  }
                  $.ajax({
                    url:'/company/addPhoto.json',
                    type:'post',
                    data:{
                      photo:response.imgFileUrl, thumbPath: response.imgThumbFileUrl
                    },
                    success:function(result){
                      if(result.rescode){
                        loading.hide();
                        filebtn.show();
                        var h='<li>'+
                          '<div>'+
                          '<input type="hidden" name="photos" value="'+response.imgFileUrl+'" />'+
                          '<input type="hidden" name="photosId" value="0" />'+
                          '<img src="'+STATICURL+response.imgThumbFileUrl+'">'+
                          '<div class="masking none"><a href="javascript:;" class="js_del" data-photo_id= "' + result.imgId + '"><i class="base close_one"></i></a></div>'+
                          '</div>'+
                          '</li>';
                        li_add.before(h);
                        //重置
                        uploader.reset();
                      }
                    }
                  });
              }else{
                  alert("上传失败");
              }
          });
      }
      intiWebUpload();
      //删除照片
      $('ul').on('click','.js_del',function(){
        var _t=$(this);
        var photoId=_t.data('photo_id');
        $.ajax({
          url:'/company/removePhoto.json',
          type:'post',
          data:{
            pid:photoId
          },
          success:function(result){
            _t.closest('li').remove();
            var len=$('li',picUl).length,
              li_add=$('li[data-type=add]',picUl);
            if(len==20){
              li_add.show();
            }
          }
        });
      });
	});
});