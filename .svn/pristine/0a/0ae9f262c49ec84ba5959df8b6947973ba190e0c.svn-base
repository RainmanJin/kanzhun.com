require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    v2: 'v2/js',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});


require(['c/auth_dialog','c/widgets','u/validator'], function(auth_dialog){
  $(function(){
    var ugcForm=$('#ugcForm');
    function intiWebUpload(){
      // 初始化Web Uploader
      var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '/images/Uploader.swf',
        // 文件接收服务端。
        server: CONTEXTPATH + '/photougc/upload.json',
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
          var len=$('ul li',ugcForm).length,
            li_add=$('ul li[data-type=add]',ugcForm);
          if(len==3){
            li_add.hide();
          }
          loading.hide();
          filebtn.show();
          var h='<li>'+
            '<div class="photo_show">'+
              '<div class="ps_img">'+
                '<div class="bg"></div>'+
                '<img src="'+STATICURL+response.imgThumbFileUrl+'">'+
                '<a class="bt_close" title="删除"><i></i></a>'+
              '</div>'+
              '<textarea class="v" name="imgdesc" maxlength="128" data-unnecessary="1" placeholder="点击输入照片描述..."></textarea>'+
              '<input type="hidden" name="imgurl" value="'+response.imgFileUrl+'" />'+
              '<input type="hidden" name="imgthumburl" value="'+response.imgThumbFileUrl+'" />'+
            '</div>'+
          '</li>';
          li_add.before(h);
          //v.init($(h).find('.v'));
          $('p.err',ugcForm).hide();
          //重置
          uploader.reset();
        }else{
          alert("上传失败");
        }
      });

      //删除照片
      $('ul',ugcForm).on('click','.bt_close',function(){
        $(this).closest('li').remove();
        var len=$('ul li',ugcForm).length,
          li_add=$('ul li[data-type=add]',ugcForm);
        if(len==3){
          li_add.show();
        }
      });
    }
    try{
      intiWebUpload();
    }catch(e){

    }
    //表单验证
    var v = ugcForm.validatorAll({
      elems: '.v',
      prompt: {
        succ: function (target) {
        },
        err: function (target, msg) {
          console.log(123);
        },
        normal: function (target) {

        }
      }
    });
    v.init().submit(function(){
      if($('input[name=imgurl]').length === 0){
        $('p.err',ugcForm).show();
        return false;
      }
      return true;
    });
  });
});