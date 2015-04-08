
$.dialog=function(o){
	var _o=o||{};
	var mask='<div class="mask" ></div>';
	var h='<div class="dialog">\
		<h3>提示</h3>\
		<div class="bordertgrey mt10"></div>\
		<p class="mt20">确定要删除吗？</p>\
		<div class="set ml10 mt20">\
			<a class="js_dialogSubmit btn_orange_1">确定</a>\
			<a class="js_dialogCancel btn_grey_1 ml10">取消</a>\
	    </div>\
	</div>';
	$("body").append(mask+h);
	$(".dialog").delegate(".js_dialogSubmit","click",function(){
		if(_o.ok){
			_o.ok();
		}	
		$(".mask").remove();
		$(".dialog").remove();
	})
	$(".dialog").delegate(".js_dialogCancel","click",function(){
		if(_o.cancel){
			_o.cancel();
		}	
		$(".mask").remove();
		$(".dialog").remove();
	})	
};
//校验时间
$.vDate=function(startY,endY,startM,endM){
	var startY=parseInt($('[name='+startY+']').val());
	var endY=parseInt($('[name='+endY+']').val());
	if(startY>endY){
		return false;
	}
	if(!startM){
		return true;
	}
	var startM=parseInt($('[name='+startM+']').val());
	var endM=parseInt($('[name='+endM+']').val());	
	if(startY==endY&&startM>endM){
		return false;
	}else{
		return true;
	}
};
//我的简历
(function(){
	if($("#js_myResume")[0]){
		var oMyResume=$("#js_myResume");
		//画圆
		function drawChart(){
			$('canvas.reviewsDoughnutChart').doughnutChart({
				colors: ['#7cb228', '#ededed'],
				centerColor: '#ffffff',
				borderWidth: 6
			});	
		}
		drawChart();
		oMyResume.delegate(".js_revise","click",function(){
			var _this=$(this);
			var nodeType=_this.attr("node-type");
			if(nodeType=="basic"){
				$(".js_basicInfo").hide();
				$(".js_basicField").show();
			}
		})
		//头像上传
		oMyResume.find(".js_upload").uploadfile({
			url:"/upload/image.json",
			complete:function(result){
			    if(result.rescode==1){
		        	$(".js_headpic").attr("src","http://img.kanzhun.com"+result.imgThumbFileUrl);
		        	$('[name="headsUrl"]').val(result.imgThumbFileUrl);
		        }else if(result.rescode==1011){
		        	location.href="/login/";
		        }
			}
		});
		//删除
		oMyResume.delegate(".js_del","click",function(){
			var _this=$(this);		
			$.dialog({
				ok:function(){
					var url=_this.attr("data-url");
					$.ajax({
						url:url,
						dataType:"json",
						success:function(result){
							if(result.rescode==1){
						
								if((_this.parents(".resumeShow").prev(".resumeShow").length==0)&&(_this.parents(".resumeShow").next(".resumeShow").length==0)){
									_this.parents(".resumeShow").prev().show().prev().find(".js_bt_add").hide();
								}
								_this.parents(".resumeShow").remove();

								$("nav.resume_nav").replaceWith(result.nav);
								drawChart();
							}else{
								alert("删除失败");
							}
						}
					});
				}
			});
		});
		//基本资料提交
		oMyResume.delegate(".js_submit","click",function(){
			var bFlag=true;
			var oName=$('[name="name"]');
			var sNameVal=$.trim(oName.val());
			if(sNameVal==""){
				oName.siblings(".js_error").show();
				oName.parent().addClass("berror");
				bFlag=false;
			}else{
				oName.siblings(".js_error").hide();
				oName.parent().removeClass("berror");
			}
			var oExperience=$('[name="experience"]');
			if(oExperience.val()=="0"){
				oExperience.siblings(".js_error").show();
				oExperience.parent().addClass("berror");
				bFlag=false;
			}else{
				oExperience.siblings(".js_error").hide();
				oExperience.parent().removeClass("berror");
			}	
			var oDegree=$('[name="degree"]');
			if(oDegree.val()=="0"){
				oDegree.siblings(".js_error").show();
				oDegree.parent().addClass("berror");
				bFlag=false;
			}else{
				oDegree.siblings(".js_error").hide();
				oDegree.parent().removeClass("berror");
			}
			var oMobile=$('[name="mobile"]');
			var sMobileVal=$.trim(oMobile.val());
			if(sMobileVal==""){
				oMobile.siblings(".js_error").show();
				oMobile.parent().addClass("berror");
				bFlag=false;
			}else{
				if(common.isPhone(sMobileVal)){
					oMobile.siblings(".js_error").hide();
					oMobile.parent().removeClass("berror");
				}else{
					oMobile.siblings(".js_error").html("手机格式不符");
					oMobile.siblings(".js_error").show();
					oMobile.parent().addClass("berror");
					bFlag=false;					
				}
			}
			var oEmail=$('[name="email"]');
			var sEmailVal=$.trim(oEmail.val());
			if(sEmailVal==""){
				oEmail.siblings(".js_error").show();
				oEmail.parent().addClass("berror");
				bFlag=false;
			}else{
				if(common.isMail(sEmailVal)){
					oEmail.siblings(".js_error").hide();
					oEmail.parent().removeClass("berror");
				}else{
					oEmail.siblings(".js_error").html("邮箱格式不符");
					oEmail.siblings(".js_error").show();
					oEmail.parent().addClass("berror");
					bFlag=false;					
				}
			}		
			var oCurrentStatuse=$('[name="currentStatus"]');
			if(oCurrentStatuse.val()=="0"){
				oCurrentStatuse.siblings(".js_error").show();
				oCurrentStatuse.parent().addClass("berror");
				bFlag=false;
			}else{
				oCurrentStatuse.siblings(".js_error").hide();
				oCurrentStatuse.parent().removeClass("berror");
			}
			if(!bValidateTime()){
				bFlag=false;
			}			
			if(bFlag){
				$('[name="basicForm"]').submit();
			}			
		})
		function bValidateTime(){
			var oYear=$('[name="birthYear"]');
			var oMonth=$('[name="birthMonth"]');
			var oDay=$('[name="birthDate"]');
			if(oYear.val()=="0"){
				oYear.siblings(".js_error").html("请选择年份");
				oYear.siblings(".js_error").show();
				oYear.addClass("berror");
				return false;
			}else{
				oYear.removeClass("berror");
				oYear.siblings(".js_error").hide();				
			}
			if(oMonth.val()=="0"){
				oYear.siblings(".js_error").html("请选择月份");
				oYear.siblings(".js_error").show();
				oMonth.addClass("berror");
				return false;					
			}else{
				oMonth.removeClass("berror");
				oYear.siblings(".js_error").hide();				
			}
			if(oDay.val()=="0"){
				oYear.siblings(".js_error").html("请选择日期");
				oYear.siblings(".js_error").show();
				oDay.addClass("berror");
				return false;
			}else{
				oDay.removeClass("berror");					
				oYear.siblings(".js_error").hide();			
			}
			return true;									
		}
		oMyResume.delegate(".js_cancel","click",function(){
			location.reload();
		})
	}

})();
//$.dialog();

//期望工作
(function(){
	if($("#js_qwgz")[0]){
		var oQwgz=$("#js_qwgz");
		oQwgz.delegate(".js_submit","click",function(){
			var bFlag=true;
			var oCityName=$('[name="cityName"]');
			var sCityNameVal=$.trim(oCityName.val());
			if(sCityNameVal==""){
				oCityName.siblings(".js_error").show();
				oCityName.parent().addClass("berror");
				bFlag=false;
			}else{
				oCityName.siblings(".js_error").hide();
				oCityName.parent().removeClass("berror");
			}
			var oJobTitle=$('[name="jobTitle"]');
			var sJobTitleVal=$.trim(oJobTitle.val());
			if(sJobTitleVal==""){
				oJobTitle.siblings(".js_error").show();
				oJobTitle.parent().addClass("berror");
				bFlag=false;
			}else{
				oJobTitle.siblings(".js_error").hide();
				oJobTitle.parent().removeClass("berror");
			}
			var oSalary=$('[name="salary"]');
			if(oSalary.val()=="0"){
				oSalary.siblings(".js_error").show();
				oSalary.parent().addClass("berror");
				bFlag=false;
			}else{
				oSalary.siblings(".js_error").hide();
				oSalary.parent().removeClass("berror");
			}
			if(bFlag){
				$('[name="qwgzForm"]').submit();
			}	
		})
	}
})();

//工作经历
(function(){
	if($("#js_gzjl")[0]){
		var oGzjl=$("#js_gzjl");
		oGzjl.delegate(".js_submit","click",function(){
			var bFlag=true;
			var oCompanyName=$('[name="companyName"]');
			var sCompanyNameVal=$.trim(oCompanyName.val());
			if(sCompanyNameVal==""){
				oCompanyName.siblings(".js_error").show();
				oCompanyName.parent().addClass("berror");
				bFlag=false;
			}else{
				oCompanyName.siblings(".js_error").hide();
				oCompanyName.parent().removeClass("berror");
			}
			var oJobTitle=$('[name="jobTitle"]');
			var sJobTitleVal=$.trim(oJobTitle.val());
			if(sJobTitleVal==""){
				oJobTitle.siblings(".js_error").show();
				oJobTitle.parent().addClass("berror");
				bFlag=false;
			}else{
				oJobTitle.siblings(".js_error").hide();
				oJobTitle.parent().removeClass("berror");
			}
			var oIndustryCode=$('[name="industryCode"]');
			if(oIndustryCode.val()=="0"){
				oIndustryCode.siblings(".js_error").show();
				oIndustryCode.parent().addClass("berror");
				bFlag=false;
			}else{
				oIndustryCode.siblings(".js_error").hide();
				oIndustryCode.parent().removeClass("berror");
			}
			if(!bValidateTime()){
				bFlag=false;
			}else{
				if($.vDate("startYear","endYear","startMonth","endMonth")){
					oGzjl.find('[name=endYear]').siblings(".js_error").html("").hide();
				}else{
					oGzjl.find('[name=endYear]').siblings(".js_error").html("请选择正确的日期范围").show();
					bFlag=false;
				}
			}
			
			if(bFlag){
				$('[name="gzjlForm"]').submit();
			}	
		});
		function bValidateTime(){
			var oStartYear=$('[name="startYear"]');
			var oStartMonth=$('[name="startMonth"]');
			var oEndYear=$('[name="endYear"]');
			var oEndMonth=$('[name="endMonth"]');			
			if(oStartYear.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择开始年份");
				oEndMonth.siblings(".js_error").show();
				oStartYear.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oStartYear.removeClass("berror");
			}
			if(oStartMonth.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择开始月份");
				oEndMonth.siblings(".js_error").show();
				oStartMonth.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oStartMonth.removeClass("berror");
			}
			if(oEndYear.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择结束年份");
				oEndMonth.siblings(".js_error").show();
				oEndYear.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oEndYear.removeClass("berror");
			}
			if(oEndMonth.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择结束月份");
				oEndMonth.siblings(".js_error").show();
				oEndMonth.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oEndMonth.removeClass("berror");
			}
			return true;
		}
	}
})();

//项目经验
(function(){
	if($("#js_xmjy")[0]){
		var oXmjy=$("#js_xmjy");
		oXmjy.delegate(".js_submit","click",function(){
			var bFlag=true;
			var oProjectName=$('[name="projectName"]');
			var sProjectNameVal=$.trim(oProjectName.val());
			if(sProjectNameVal==""){
				oProjectName.siblings(".js_error").show();
				oProjectName.parent().addClass("berror");
				bFlag=false;
			}else{
				oProjectName.siblings(".js_error").hide();
				oProjectName.parent().removeClass("berror");
			}
			var oDuty=$('[name="duty"]');
			var sDutyVal=$.trim(oDuty.val());
			if(sDutyVal==""){
				oDuty.siblings(".js_error").show();
				oDuty.parent().addClass("berror");
				bFlag=false;
			}else{
				oDuty.siblings(".js_error").hide();
				oDuty.parent().removeClass("berror");
			}
			if(!bValidateTime()){
				bFlag=false;
			}else{
				if($.vDate("startYear","endYear","startMonth","endMonth")){
					oXmjy.find('[name=endYear]').siblings(".js_error").html("").hide();
				}else{
					oXmjy.find('[name=endYear]').siblings(".js_error").html("请选择正确的日期范围").show();
					bFlag=false;
				}
			}			
			if(bFlag){
				$('[name="xmjyForm"]').submit();
			}								
		});
		function bValidateTime(){
			var oStartYear=$('[name="startYear"]');
			var oStartMonth=$('[name="startMonth"]');
			var oEndYear=$('[name="endYear"]');
			var oEndMonth=$('[name="endMonth"]');			
			if(oStartYear.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择开始年份");
				oEndMonth.siblings(".js_error").show();
				oStartYear.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oStartYear.removeClass("berror");
			}
			if(oStartMonth.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择开始月份");
				oEndMonth.siblings(".js_error").show();
				oStartMonth.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oStartMonth.removeClass("berror");
			}
			if(oEndYear.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择结束年份");
				oEndMonth.siblings(".js_error").show();
				oEndYear.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oEndYear.removeClass("berror");
			}
			if(oEndMonth.val()=="0"){
				oEndMonth.siblings(".js_error").html("请选择结束月份");
				oEndMonth.siblings(".js_error").show();
				oEndMonth.addClass("berror");
				return false;
			}else{
				oEndMonth.siblings(".js_error").hide();
				oEndMonth.removeClass("berror");
			}
			return true;
		}
	}		
})();

//教育背景
(function(){
	if($("#js_jybj")[0]){
		var oJybj=$("#js_jybj");
		oJybj.delegate(".js_submit","click",function(){
			var bFlag=true;
			var oUniversity=$('[name="university"]');
			var sUniversity=$.trim(oUniversity.val());
			if(sUniversity==""){
				oUniversity.siblings(".js_error").show();
				oUniversity.parent().addClass("berror");
				bFlag=false;
			}else{
				oUniversity.siblings(".js_error").hide();
				oUniversity.parent().removeClass("berror");
			}
			var oMajor=$('[name="major"]');
			var sMajor=$.trim(oMajor.val());
			if(sMajor==""){
				oMajor.siblings(".js_error").show();
				oMajor.parent().addClass("berror");
				bFlag=false;
			}else{
				oMajor.siblings(".js_error").hide();
				oMajor.parent().removeClass("berror");
			}
			var oDegree=$('[name="degree"]');
			if(oDegree.val()=="0"){
				oDegree.siblings(".js_error").show();
				oDegree.parent().addClass("berror");
				bFlag=false;
			}else{
				oDegree.siblings(".js_error").hide();
				oDegree.parent().removeClass("berror");
			}
			if(!bValidateTime()){
				bFlag=false;
			}else{
				if($.vDate("startYear","endYear")){
					oJybj.find('[name=endYear]').siblings(".js_error").html("").hide();
				}else{
					oJybj.find('[name=endYear]').siblings(".js_error").html("请选择正确的日期范围").show();
					bFlag=false;
				}
			}				
			if(bFlag){
				$('[name="jybjForm"]').submit();
			}															
		});
		function bValidateTime(){
			var oStartYear=$('[name="startYear"]');
			var oEndYear=$('[name="endYear"]');			
			if(oStartYear.val()=="0"){
				oEndYear.siblings(".js_error").html("请选择开始年份");
				oEndYear.siblings(".js_error").show();
				oStartYear.addClass("berror");
				return false;
			}else{
				oStartYear.siblings(".js_error").hide();
				oStartYear.removeClass("berror");
			}
			if(oEndYear.val()=="0"){
				oEndYear.siblings(".js_error").html("请选择结束年份");
				oEndYear.siblings(".js_error").show();
				oEndYear.addClass("berror");
				return false;
			}else{
				oEndYear.siblings(".js_error").hide();
				oEndYear.removeClass("berror");
			}
			return true;
		}		
	}
})();

//自我描述
(function(){
	if($("#js_zwms")[0]){
		var oJybj=$("#js_zwms");
		oJybj.delegate(".js_submit","click",function(){
			var bFlag=true;
			var oEvaluation=$('[name="evaluation"]');
			var sEvaluation=$.trim(oEvaluation.val());
			if(sEvaluation==""){
				oEvaluation.siblings(".js_error").show();
				oEvaluation.parent().addClass("berror");
				bFlag=false;
			}else{
				oEvaluation.siblings(".js_error").hide();
				oEvaluation.parent().removeClass("berror");
			}
			if(bFlag){
				$('[name="zwmsForm"]').submit();
			}															
		});
	}
})();

//作品展示
(function(){
	if($("#js_zpzs")[0]){
		var oJybj=$("#js_zpzs");
		oJybj.delegate(".js_submit","click",function(){
			var bFlag=true;
			var oDescription=$('[name="description"]');
			var sDescription=$.trim(oDescription.val());
			if(sDescription==""){
				oDescription.siblings(".js_error").show();
				oDescription.parent().addClass("berror");
				bFlag=false;
			}else{
				oDescription.siblings(".js_error").hide();
				oDescription.parent().removeClass("berror");
			}			
			if(bFlag){
				$('[name="zpzsForm"]').submit();
			}															
		});
	}
})();

