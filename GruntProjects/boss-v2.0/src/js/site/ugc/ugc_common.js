require.config({
  urlArgs: "v=1.0",
  baseUrl: '/js',
  paths: {
    u: 'utils',
    s: 'site'
  }
});
//boss和牛人公用的js
require(['s/ugc/widgets','u/uploadPortrait_dialog'],function(){
	$(function(){
		function initLeftNav(){
			var h=$('.body_l .header').height(),
					nav=$('.body_l ul.nav'),
					t=$(document).scrollTop();
			setFix(t,h);
			$(document).on('scroll',function(){
				var t=$(this).scrollTop();
				setFix(t,h);
			});
			function setFix(t,h){
				if(t>h){
					nav.addClass('fixed');
				}else{
					nav.removeClass('fixed');
				}
			}
		}		
		function initLure(){
			//添加职位诱惑
			$(".js_addJobLures").on("click",function(){
			  var _this=$(this);
			  var sInput=$.trim(_this.prev("input").val());
			  var oSelf=_this.siblings(".self");
			  var arr=oSelf.find("input:hidden");
			  if(sInput==""){
			  	return;
			  }
			  if(isRepeat(sInput,arr)){
			    $.maskUI.alert("该关键词已添加！");
			    return;
			  }
			  if(oSelf.find("li").length>=8){
			    $.maskUI.alert("最多添加8个");
			    return;
			  }
		  	var h='<li>'+
                sInput+
                '<a href="javascript:;" class="close"><i class="i i_sclose"></i></a>'+
                '<input type="hidden" name="lureKeywords" value="'+sInput+'">'+
              '</li>';
			  oSelf.append(h);
			  _this.prev("input").val('');
			});

			$('[action-type="addLures"]').on("click","li",function(){
			  var _this=$(this);
			  var oSelf=_this.parent().siblings(".self");
			  var arr=oSelf.find("input:hidden");
			  if(isRepeat(_this.html(),arr)){
			    $.maskUI.alert("该标签已添加！");
			    return;
			  }
			  if(oSelf.find("li").length>=8){
			    $.maskUI.alert("最多添加8个");
			    return;
			  }
			  var h='<li>'+
                _this.html()+
                '<a href="javascript:;" class="close"><i class="i i_sclose"></i></a>'+
                '<input type="hidden" name="lureKeywords" value="'+_this.html()+'">'+
              '</li>';
			  oSelf.append(h);
			  _this.prev("input").val('');
			});
			//删除职位诱惑
			$('ul.self').on("click",'.close',function(){
			  $(this).parent().fadeOut(300,function(){
			    $(this).remove();
			  });
			})
			$(".js_addJobLures").prev("input").on("focus",function(){
			  $(this).siblings(".red").hide();
			});
			//判断是否重复
		  function isRepeat(str,arr){
		    var len=arr.length;
		    for(var i=0;i<len;i++){
		      if(str==arr[i].value){
		        return true;
		      }
		    }
		    return false;
		  }
		}

		$('.js_uploadPortrait_bt').on('click',function(){
			$.initUploadPortrait({
				url:'uploadURL=/user/updateAvatar.json?c=uploadPortrit&amp;jsCallback=uploadOk',
				callback:function(result){
					var result=eval('('+result+')');
		      if (result.rescode==1) {
		        var picurls = result.picurls || [];		        
		        var dialog=$('.p_dialog.uploadPortrait');
		        $('.dialog_close',dialog).trigger('click');
		        $('div.protrait img').attr('src',picurls[1]);
		      }else{
		      	alert("图片上传失败");
		      }
				}
			});
		});
		$('[action-type="logout"]').on('click',function(){
			var _t=$(this),
					url=_t.data('url');
			$.maskUI.confirm({
				msg:'确定要退出吗',
				callback:function(){
					location.href=url;
				}
			});		

		});
		function init(){
			initLeftNav();
			initLure();
		}
		init();
	});	
});