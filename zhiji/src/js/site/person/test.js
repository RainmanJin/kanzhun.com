require.config({
  baseUrl: '../js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/widgets'], function () {
	$(function(){
		var current_page = 1; //当前页数
		var total_page=0;  //总页数
		$.ajax({
			url:'?_a=answer_ajax&exam_part_id='+exam_part_id,
			success:function(result){
				$('section.content').html(result);
				total_page=$('.questList').length;
				$('.timeBar').countdown({
					seconds: time_limit,
					callbackEnd: function(){
						$('form').submit();
					}
				});
			}
		});
		$('section.content').on('click','.ql_li ul li',function(){
			var _t=$(this);
			_t.siblings('.current').removeClass('current');
			_t.addClass('current');
			_t.parent().siblings('input:hidden').val(_t.data('val'));

			var count=0;
			var len=$('#page_'+(current_page-1)+' .ql_li').length;
			$('#page_'+(current_page-1)).find('input:hidden').each(function(k,v){
				if($(v).val()!=''){
					count++;
				}
			});
			var sbm_bt=$('[data-type="sbm"]');
			if(count==len){
				sbm_bt.removeClass('disable');
			}
		});
		//倒计时代码
		$.fn.countdown = function(obj) {
			var _t=$(this);
			var _seconds=obj.seconds;
			setTime();
			function setTime(){
				var min=Math.floor(_seconds / 60);
				var sec= _seconds-min*60;
				if(sec<10){
					sec="0"+sec;
				}
				if(min<10){ 
					min="0"+min;
				}
				min=min+'';
				sec=sec+'';
				_t.html('<em>'+min.charAt(0)+'</em>'+'<em>'+min.charAt(1)+'</em>'+':<em>'+sec.charAt(0)+'</em>'+'<em>'+sec.charAt(1)+'</em>');
			}
			var ivId=setInterval(function(){
				if(_seconds>0){
					setTime();
				}else{
					clearInterval(ivId);	
					obj.callbackEnd();
				}
				_seconds--;
			},1000)
		}
		$('section.content').on('click','[data-type=sbm]:not(.disable)',function(){
			if(current_page==total_page){
				$('form').submit();
			}else{
				$('#page_'+(current_page-1)).hide();
				$('#page_'+current_page).fadeIn('slow');
				current_page++;
				$('#sign_page').html(current_page+"/"+total_page+"页");
				$('#sign_bar').width((current_page/total_page)*100+"%");
				if(current_page==total_page){
					$(this).removeClass('green_btn').addClass('orange_btn disable').html('提交');
				}else{
					$(this).addClass('disable');
				}
			}
		});
  });
});