require.config({
  urlArgs: "v=1.0",
  baseUrl: '/js',
  paths: {
    u: 'utils',
    s: 'site'
  }
});
require(['s/ugc/widgets','s/ugc/ugc_common'],function(){
	$(function(){
  	var publicObj={
  		count:0,
			prompt:{
				succ:function(target){
					if(target.attr('type')=='hidden'){
						var prompt=$('>p.err', target.parent().parent().parent());
						var b=target.parent().parent();
					}else{
						//var prompt=target.siblings(".err");
						var prompt=target.nextAll(".err:first");
						var b=target;
					}
					b.removeClass('err_b');
					prompt.hide();
				},
				err:function(target,msg){
					if(target.attr('type')=='hidden'){
						var prompt=$('>p.err', target.parent().parent().parent());
						var b=target.parent().parent();
					}else{
						var prompt=target.nextAll(".err:first");
						var b=target;
					}
					b.addClass('err_b');
					prompt.html((msg||prompt.data("msg")) ).show();
				},
				normal:function(target){
					if(target.attr('type')=='hidden'){
						var prompt=$('>p.err', target.parent().parent().parent());
						var b=target.parent().parent();
					}else{
						//var prompt=target.siblings(".err");
						var prompt=target.nextAll(".err:first");
						var b=target;
					}
					b.removeClass('err_b');
					prompt.hide();
				}
			},
			maxLenFn:function(_this, prompt, e){	
				var _t=$(this),
						val=_t.val(),
						maxLen=parseInt(_t.data('maxlength')),
						msg='输入的内容不能超过'+maxLen+'个字！';
				if($.getByteLen(val)>maxLen*2){
					prompt.err(_t,msg);
					return false;
				}else{
					prompt.succ(_t);
					return true;
				}	
			},
			initCity:function(){
				//工作地点
	    	var cityName = $('input[name=cityName]'),
	      		cityCode = $('input[name=location]');
		    cityName.autocomplete({
		      serviceUrl: '/qrweb/city.json',
		      paramName: 'query',
		      dataType: 'json',
		      //width: '278',
		      transformResult: function(response) {
		        return {
		          suggestions: $.map(response.suggestions, function(dataItem) {
		            return { value: dataItem.value, data: dataItem.data};
		          })
		        };
		      },
		      onSelect: function (suggestion) {
		        cityCode.val(suggestion.data);
		      },
		      onSearchStart: function(){
		        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
		        cityCode.val('');
		      },
		      onInvalidateSelection: function(){
		        cityCode.val('');
		      },
		      onSearchComplete: function(query, suggestions){
		        if(suggestions.length === 0){
		          cityCode.val('');
		          return;
		        }
		        //auto select when only one result
		        if(suggestions.length === 1){
		          cityCode.val(suggestions[0].data);
		        }
		      },
		      autoSelectFirst: true
		    });	
			},
			initSelect:function(){
				var zIndex;
				$('.select').not('.js_jobMenu').DIYSelect({
					listSelector:'dd a',
					listCallback:function(list, field, target){
						field.parent().parent().parent().find('>.err').hide();
						field.parent().parent().removeClass('err_b');
						target.css({'z-index':zIndex});
					},
					showCallback:function(list, field, target){
						zIndex=target.css('z-index');	
						target.css({'z-index':11});
					},
					hideCallback:function(list, field, target){
						target.css({'z-index':zIndex});
					}
				});
				//职位类型 3级导航
				$('.js_jobMenu').DIYSelect({
				  listSelector: 'div>a',
				  listCallback: function(list, field, target){
				    $(this).parent().css({'visibility':'hidden'}).parent().css('z-index', '');
				    $('input:hidden',field.parent()).val($(this).data('val')).parent().parent().parent().find('>.err').hide();
				    field.parent().parent().removeClass('err_b');
				  },
				  showCallback: function(list, field, target){
				    target.addClass('select_light');

				   	$('.body_r').css({"padding-bottom":250});
				   	zIndex=target.css('z-index');
				   	target.css({'z-index':11});
				  },
				  hideCallback: function(list, field, target){
				    target.removeClass('select_light');

				    $('.body_r').css({"padding-bottom":0});
				    target.css({'z-index':zIndex});
				  }
				});
				var levelOne = $('.js_jobMenu li'),
		      levelTwo = $('.js_jobMenu div');
		    $('body').on('click', '.js_jobMenu dd', function(e){
		      levelTwo.css('visibility', 'hidden');
		      e.preventDefault();
		      e.stopPropagation();
		    }).on('click', 'li>a', function(e){
		      e.stopPropagation();
		      var self = $(this);
		      //visibility & z-index used to fix IE7
		      levelOne.css({'z-index': ''});
		      self.parent().css('z-index', '3');
		      levelTwo.css({'visibility': 'hidden'});
		      self.next('div').css('visibility', 'visible');
		    });
			},
			initAjaxJob:function(form){
				var cityName = $('input[name=cityName]',form),
	      		cityCode = $('input[name=location]',form);
				form.validatorAll({
					elems:".v",
					prompt:publicObj.prompt,
	   			more:{
	   				cityName: function(_this, prompt, e){
	   				  var s = setTimeout(function(){
	   				    clearTimeout(s);
	   				    if(cityCode.val() === ''){
	   				      cityName.val('').trigger('blur');
	   				    }
	   				    return true;
	   				  },300);
	   				  return true;
	   				},
		        lowSalary: {
		          type:  'isIntger',
		          msg: '薪资格式不对！',
		          fn: function(_this, prompt){
		            var high = _this.form.find('input[name=highSalary]'), val = $.trim(high.val());
		            if(val !== '' && parseInt(this.value) > parseInt(val)){
		              prompt.err($(this), '薪资范围不正确！');
		              return false;
		            }else{
		              prompt.succ($(this));
		              if(val !== ''){
		                prompt.succ(high);
		              }
		              return true;
		            }
		          }
		        },
		        highSalary: {
		          type:  'isIntger',
		          msg: '薪资格式不对！',
		          fn: function(_this, prompt){
		            var low = _this.form.find('input[name=lowSalary]'), val = $.trim(low.val());
		            if(val !== '' && parseInt(this.value) < parseInt(val)){
		              prompt.err($(this), '薪资范围不正确！');
		              return false;
		            }else{
		              prompt.succ($(this));

		              if(val !== ''){
		                prompt.succ(low);
		              }
		              return true;
		            }
		          }
		        },
		        positionName:{
							fn: publicObj.maxLenFn
						},
						postDescription: publicObj.maxLenFn,
						questionContent: publicObj.maxLenFn
	   			},
					ajaxSubmit: {
		    	  elems: 'input:text, input:hidden, textarea',
		        beforeSend: function(){},
		     		success: function(result){
		     			var code=result.rescode;
		     			if(code==1){
		     				$.maskUI.alert('职位保存成功');
		     				setNewToEdit(result);
		     			}else if(code==4002){
		     				$.maskUI.alert(result.resmsg);
		     			}
		    		}
		    	}
				}).init().submit(function(){
					var flag=true;
					$.each($('[name^="questionContent-"]'),function(k,v){
						if(!valiEditQuestion($(v))){
							flag=false;
							return false;
						}
					})
					if(flag){
						return true;
					}else{
						return false;
					}
				});
				$('[name^="questionContent-"]',form).on('blur',function(){
					var _t=$(this);
					valiEditQuestion(_t);
				});
				function valiEditQuestion(_t){
					var val=_t.val(),
							maxLen=parseInt(_t.data('maxlength')),
							msg='输入的内容不能超过'+maxLen+'个字！';
					var prompt=_t.nextAll(".err:first");
					if($.getByteLen(val)>maxLen*2){
						_t.addClass('err_b');
						prompt.html(msg).show();
						return false;
					}else {
						_t.removeClass('err_b');
						prompt.hide();
						return true;
					}
				}
				//设置职位的状态
				function setNewToEdit(result){
					var section=form.parent().parent();
							id=section.attr('id'),
							html=result.resmsg,
							jobid=result.jobId,
							count=publicObj.count;
					var jobName=$('[name="positionName"]',section).val();
					$('h2.title',section).html(jobName);
					
					if(id=='addJobSection'){
						var h='<li>'+
					          '<a href="#alreadyAddJob'+count+'">'+
					            '<em><i class="i i_necktie"></i></em> '+jobName+
					            '<i class="i i_right"></i>'+
					          '</a>'+
					        '</li>';
					  $('.body_l ul.nav li:eq(-2)').before(h);
					  section.attr('id','alreadyAddJob'+count);
					  $('form',section).attr('action','/updateJob.json');
					  $('[name="jobId"]',section).val(jobid);
					  $('.sbm .btn_red',section).attr('data-jobid',jobid).show();
					  $('.body_r').append(html);
					  publicObj.initAjaxJob($('#addJobSection form'));
					  publicObj.initCity();
						publicObj.initSelect();
		        publicObj.count++;
						$('.body_l [href="#addJobSection"] .i_redpoint').remove();
					}else{
						$('.body_l [href="#'+id+'"]').html('<em><i class="i i_necktie"></i></em> '+jobName+'<i class="i i_right"></i>');
					}
				}
			},
			init:function(){
				var _this=this;
				_this.initCity();
				_this.initSelect();
			}
		}
   	function initBasicForm(){
   		var form=$('#basicForm');
			form.validatorAll({
				elems:".v",
				prompt:publicObj.prompt,
				focusMore:{
				},
				more:{
					name:{
						fn: publicObj.maxLenFn
					},
					title:{
						fn: publicObj.maxLenFn
					}
				},
				ajaxSubmit: {
	    	  elems: 'input:text, input:hidden, textarea',
	        beforeSend: function(){},
	     		success: function(result){
	     			var code=result.rescode;
	     			if(code==1){
	     				$.maskUI.alert('基本资料保存成功');
	     				var name=$('[name="name"]',form).val(),
	     						title=$('[name="title"]',form).val();
	     				$('.body_l .base .p1').html(name);
	     				$('.body_l .base .p2').html(title);
							$('.body_l [href="#basicSection"] .i_redpoint').remove();
	     			}
	    		}
	    	}
			}).init().submit();
   	}
   	function initIntroForm(){
   		var form=$('#introForm');
 			//工作地点
    	var cityName = $('input[name=cityName]'),
      		cityCode = $('input[name=location]');
   		form.validatorAll({
   			elems:".v",
   			prompt:publicObj.prompt,
   			more:{
   				companyName:{
   					fn: publicObj.maxLenFn
   				},
   				companyFullName:{
   					fn: publicObj.maxLenFn
   				},
   				officeWebsite:{
   					fn: publicObj.maxLenFn
   				},
   				companyAddress:{
   					fn: publicObj.maxLenFn
   				},
   				email:{
   					type:'isMail',
   					msg:'邮箱格式不正确',
   					fn: publicObj.maxLenFn
   				},
   				cityName: function(_this, prompt, e){
   				  var s = setTimeout(function(){
   				    clearTimeout(s);
   				    if(cityCode.val() === ''){
   				      cityName.val('').trigger('blur');
   				    }
   				    return true;
   				  },300);
   				  return true;
   				},
   				officeWebsite: {
						fn: function(_this, prompt, e){
							var _t=$(this),
									val=_t.val(),
									maxLen=parseInt(_t.data('maxlength')),
									msg='输入的内容不能超过'+maxLen+'个字！',
									reg=/(?:^|\s)(["'])?(?:(?:(?:(?:https?|ftp|\w):)?\/\/)|(?:www.))(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?\1/ig;
							var flag=true;	
							if($.getByteLen(val)>maxLen*2){
								prompt.err(_t,msg);
								return false;
							}else{
								if(reg.test(val)){
									prompt.succ(_t);
									return true;
								}else{
									prompt.err(_t,'网址链接格式不正确');
									return false;										
								}
							}
						}	
					}	

   			},
				ajaxSubmit: {
	    	  elems: 'input:text, input:hidden, textarea',
	        beforeSend: function(){},
	     		success: function(result){
	     			var code=result.rescode;
	     			if(code==1){
	     				$.maskUI.alert('公司简介保存成功');
							$('.body_l [href="#introSection"] .i_redpoint').remove();
	     			}
	    		}
	    	}
   		}).init().submit();
   	}
   	function initLureForm(){
   		var form=$('#lureForm');
			form.validatorAll({
				elems:".v",
				prompt:publicObj.prompt,
				more:{
					lureContent:publicObj.maxLenFn,
					lureTitle:{
						fn: publicObj.maxLenFn
					}
				},
				ajaxSubmit: {
	    	  elems: 'input:text, input:hidden, textarea',
	        beforeSend: function(){},
	     		success: function(result){
	     			var code=result.rescode;
	     			if(code==1){
	     				$.maskUI.alert('公司诱惑保存成功');
							$('.body_l [href="#lureSection"] .i_redpoint').remove();
	     			}
	    		}
	    	}
			}).init().submit(function(){
				var len=$('[name=lureKeywords]',form).length,
						kMsg=$('.keyword_msg',form);
				if(len>0){
					kMsg.hide();
					return true;
				}else{
					kMsg.show();
					return false;
				}
			});
   	}
		function initJobForm(){
			var aform=$('.js_jobForm');
			$.each(aform,function(k,v){
				var form=$(v);
				publicObj.initAjaxJob(form);
			});
		}
		function delForm(){
			$('.body_r').on('click','.js_del',function(){
				var _this=$(this),
						url=_this.data('url'),
						id=_this.data('jobid');
				$.maskUI.confirm({
					msg:"确定要删除吗？",
					callback:function(){
						$.ajax({
							url:url,
							data:{
								id:id
							},
							dataType:'json',
							success:function(result){
								_this.closest('section.form').remove();
								var sectionId=_this.closest('section').attr("id");
								$('.body_l .nav [href="#'+sectionId+'"]').parent().remove();
							}
						});
					}
				}) 
			});
		}
		function init(){
			initBasicForm();
			initIntroForm();
			initLureForm();
			initJobForm();
			delForm();
			publicObj.init();
		}
		init();
	});
});