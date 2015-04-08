require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components'
    }
});

require(['c/auth_dialog', 'u/upload_portrait', 'c/widgets', 'c/mini_search'], function(auth_dialog, upload_portrait) {
			
			// dom ready
			$(function() {
				//upload portrait
				upload_portrait({
					elems: $('#profilePortraitBtn'),
					portrait: $('#portrait'),
					show: $('#profilePortrait, #profilePortraitAlias')
				});

//				$.maskUI.config = {
//						wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
//						alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
//						confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
//					};
				// coding ...
				$('#profileBasicSelect').DIYSelect();
				$('#profileCityProSelect').DIYSelect();
				$('#profileCitySelect').DIYSelect();
				$('#profileWorkYearSelect').DIYSelect();

				// basic profile
				$('#basic')
						.ajaxForm(
								{
									selector : 'input:text, input:hidden, textarea, select, input[type=radio]:checked, input[type=checkbox]:checked',
									validate : function() {			
									
										var edutemp = this.find(
												'input[name=edutemp]').val();
										var f = this[0];
										// alert(edutemp);
										if (edutemp == '初中') {
											f.edu.value = '1';
										} else if (edutemp == '高中') {
											f.edu.value = '2';
										} else if (edutemp == '大专') {
											f.edu.value = '3';
										}else  if (edutemp == '本科') {
											f.edu.value = '4';
										} else if (edutemp == '硕士') {
											f.edu.value = '5';
										} else if (edutemp == '博士') {
											f.edu.value = '6';
										} else if (edutemp == '其它') {
											f.edu.value = '7';
										}
										
										
										//验证字段
										var realname= this.find(
										'input[name=realname]').val();
										if(realname==null || realname==""){
											$.maskUI.alert('真实姓名不能为空');
											return false;
										}
										
										var edu= this.find(
										'input[name=edu]').val();
										if(edu==null || edu=="" || edu=='0'||edu=='undefined'){
											if(edutemp==null || edutemp=="" || edutemp=='0'||edutemp=='undefined'){
											$.maskUI.alert('最高学历不能为空');
											return false;
											}
										}
										
										var gender= this.find(
										'input[name=gender]').val();
										if(gender==null || gender==""){
											$.maskUI.alert('性别不能为空');
											return false;
										}
										
										return true;
									},
									success : function(ret) {
										$.maskUI.alert('保存成功');
									}
								});

				// workyear
				$('#work')
						.ajaxForm(
								{
									selector : 'input:text, input:hidden, textarea, select, input[type=radio]:checked, input[type=checkbox]:checked',
									validate : function() {

										var workYeartemp = this.find(
												'input[name=workYeartemp]')
												.val();
										var f = this[0];
										// workyear

										if (workYeartemp.trim() == '在读学生') {
											f.workyear.value = '1';
										} else if (workYeartemp.trim() == '应届毕业生') {
											f.workyear.value = '2';
										} else if (workYeartemp.trim() == '1年以下') {
											f.workyear.value = '3';
										} else if (workYeartemp.trim() == '1-3年') {
											f.workyear.value = '4';
										} else if (workYeartemp.trim() == '3-5年') {
											f.workyear.value = '5';
										} else if (workYeartemp.trim() == '5-10年') {
											f.workyear.value = '6';
										} else if (workYeartemp.trim() == '10年以上') {
											$('#workyear').attr({value:'7'});
											//f.workyear.value = '7';
										}
										// city
										var citycodetemp = this.find(
												'input[name=citycodetemp]')
												.val();
										//alert(citycodetemp);
										var citycode = $(
												"#" + citycodetemp).val();
										//alert(citycode);
										if(citycode!='undefined'&&citycode!=null&& citycode!=""){
										  f.citycode.value = citycode;
										}
										
										
										//validate
										var citycode= this.find(
										'input[name=citycode]').val();
										//alert(citycode);
										if(citycode==null || citycode=="" ||  citycode=='0'||citycode=='undefined'){
											if(citycodetemp==null||citycodetemp==""||citycodetemp=='0'||citycodetemp=='undefined'){
												$.maskUI.alert('所在城市不能为空');
												return false;
											}
										}
	
										var workyear= this.find(
										'input[name=workyear]').val();
										//alert(workyear);
										if(workyear==null || workyear=="" ||  workyear=='0'||workyear=='undefined'){
											if(workYeartemp==null||workYeartemp==""||workYeartemp=='0'||workYeartemp=='undefined'){
											$.maskUI.alert('工作年限不能为空');
											return false;
											}
										}
										var jobtitle= this.find(
										'input[name=jobtitle]').val();
										if(jobtitle==null || jobtitle==""){
											$.maskUI.alert('职位名称不能为空');
											return false;
										}
										
										
										return true;
									},
									success : function(ret) {
										// this = $('#formid')
										//alert("√保存成功");
										$.maskUI.alert('保存成功');
									}
								});
				$("#citybtn").on('click',function() {
									// alert(0);
									//var _this = $(this);
									var citycodeProName = $("#citycodePro")
											.val();
									var citycodeProCode = $(
											"#" + citycodeProName+"pro").val();
									$.ajax({
												url : "/city/cityByPro.json",
												type : "GET",
												dataType : "json",
												data : "provinceCityCode="
														+ citycodeProCode,
												success : function(result) {
													var myobj = eval(result);
													var html='';
													for (var i = 0; i < myobj.length; i++) {
														html+= '<a href="#">'
																+ myobj[i].name
																+ '</a><input type="hidden" value='
																+ myobj[i].code
																+'  id='+ myobj[i].name
																+' ></input>';
																										
													}
													//alert(html);
													$('#citylist').html(
															html);
												}
											});
								});
				$("#citycodetemp").on('click',function() {
					// alert(0);
					//var _this = $(this);
					var citycodeProName = $("#citycodePro")
							.val();
					var citycodeProCode = $(
							"#" + citycodeProName+"pro").val();
					$.ajax({
								url : "/city/cityByPro.json",
								type : "GET",
								dataType : "json",
								data : "provinceCityCode="
										+ citycodeProCode,
								success : function(result) {
									var myobj = eval(result);
									var html='';
									for (var i = 0; i < myobj.length; i++) {
										html+= '<a href="#">'
												+ myobj[i].name
												+ '</a><input type="hidden"  value='
												+ myobj[i].code
												+'  id='+ myobj[i].name
												+' ></input>';
																						
									}
									//alert(html);
									$('#citylist').html(
											html);
								}
							});
				});
				
			});
		});
