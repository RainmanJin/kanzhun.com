$(function(){
	var companyId = $("#companyId").val();
	var prizeId = $("#prizeId").val();
	var status = $("#status").val();
	
	$("a.btn-orange").on("click",function(){
		if(status == 1){
			alert("您已经投过漂了,想继续投票请等明天再来!");
			return false;
		}
		$.get("/activity/jinpingmei/onlist.json?companyId="+companyId+"&prizeId="+prizeId,
				function(data){
					if(data.rescode == 1){
						window.location.href = "/activity/jinpingmei/success/?from=3&companyId="+companyId+"&prizeId="+prizeId;
					}
					else{
						alert("您已经投过漂了,想继续投票请等明天再来!");
					}
			})
	});
	
	$("a.btn-blue").on("click",function(){
		if(status == 1){
			alert("您已经投过漂了,想继续投票请等明天再来!");
			return false;
		}
		 $.post("/activity/jinpingmei/offlist.json",
			{
			 companyId:companyId,
			 prizeId:prizeId
			},function(data){
					if(data.rescode == 1){
						window.location.href = "/activity/jinpingmei/success/?from=4&companyId="+companyId+"&prizeId="+prizeId;
					}
					else{
						alert("您已经投过漂了,想继续投票请等明天再来!");
					}
		 });
	});
});