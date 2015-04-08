$(function(){
  var phone =$('input[name=phone]');
  var err = $('#p_err');
  var phoneForm= $('#phoneForm');
  phone.on('focus', function(){
    err.hide();
  });
  $('#phone_submit').on('click', function(){
  	var flag=true;
    if(!(/^1\d{10}$/).test(phone.val())){
      err.show();
     	flag=false;
    }
    if(flag){
    	phoneForm.submit();
    }
  });
  $("#bt_help").on("click",function(){
  	var _t=$(this);
  	var url=_t.data("url");
  	$.ajax({
  		url:url,
  		dataType:"json",
  		success:function(result){
  			var rescode=result.rescode;
  			var done=result.rescode;
  			if(rescode==0){
  				_t.css({"background-color":"grey"});
  				_t.html("帮忙成功");
  				if(done){
  					location.reload();
  				}
  			}
  		}
  	});
  })

});