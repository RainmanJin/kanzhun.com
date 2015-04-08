

$(function(){
	$('.search').on('click',function(){
		var origin = $("#origin").val();
		var destination = $("#destination").val();
		if(origin==null||destination==null){
			alert("不要搞笑，你确定你需要地铁么？");
			return;
		}
		if(origin!=destination) {
			if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)){
				$("#formsubway")[0].reset();
			}
			window.location.href="/activity/subway/result/"+origin+"-"+destination;
			
			//$("#formsubway").submit();
		}
		else {
			alert("不要搞笑，你确定你需要地铁么？")
		}
		return false;
	});
	$("#originLine").change(function(){
		$("#origin").empty(); 
		$.ajax({
			url:"/activity/subway/station/"+$("#originLine").val()+".json",
			dataType: 'json',
			success:function(resp){
				var optionList = '';
				for(var i =0;i< resp.data.length;i++){
					var data = resp.data[i];
					optionList+= '<option value="'+ data.id +'">'+ data.name+'</option>'
				}
				$("#origin").html(optionList);  
			}
		});
	});
	
	$("#destinationLine").change(function(){
		$("#destination").empty(); 
		$.ajax({
			url:"/activity/subway/station/"+$("#destinationLine").val()+".json",
			dataType: 'json',
			success:function(resp){
				var optionList = '';
				for(var i =0;i< resp.data.length;i++){
					var data = resp.data[i];
					optionList+= '<option value="'+ data.id +'">'+ data.name+'</option>'
				}
				$("#destination").html(optionList);  
			}
		});
	});
})