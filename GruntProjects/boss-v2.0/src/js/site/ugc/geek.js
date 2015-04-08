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
			prompt:{
				succ:function(target){
					if(target.attr('type')=='hidden'){
						var prompt=$('>p.err', target.parent().parent().parent());
						var b=target.parent().parent();
					}else{
						var prompt=target.siblings(".err");
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
						var prompt=target.siblings(".err");
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
						var prompt=target.siblings(".err");
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
			checkDate:function(by, ey, bm, em){
        ey = parseInt($('input[name=' + ey +']').val(), 10);
        if(ey === 0){
            return true;
        }
        var year = ey - parseInt($('input[name=' + by +']').val(), 10);
        bm = parseInt($('input[name=' + bm +']').val(), 10);
        em = parseInt($('input[name=' + em +']').val(), 10);

        if(year < 0){
            return false;
        }else if(year === 0 && bm && em && em - bm < 0){
            return false;
        }else{
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
			initProductionForm:function(form,type){
				form.validatorAll({
					elems:".v",
					prompt:publicObj.prompt,
					more:{
						proName:{
							fn: publicObj.maxLenFn
						},
						proLink:{
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
						},
						proDescription:	publicObj.maxLenFn
					},
					ajaxSubmit: {
		    	  elems: 'input:text, input:hidden, textarea',
		        beforeSend: function(){},
		     		success: function(result){
		     			var code=result.rescode;
		     			if(code==1){
		     				if(type=="new"){
		     					form.closest('.show').siblings('.add').show();
		     					var li=form.closest('.list');
		     					li.before(result.resmsg);
		     					li.remove();	     					
		     				}else{
		     					form.closest('.list').prev().remove();
			     				form.closest('.list').before(result.resmsg);
			     				form.closest('.list').remove();
		     				}
		     			}
		    		}
		    	}
				}).init().submit();
			},
			initJobForm:function(form,type){
				publicObj.initSelect();
				form.validatorAll({
					elems:".v",
					prompt:publicObj.prompt,
					more:{
						company:{
							fn: publicObj.maxLenFn
						},
						positonName:{
							fn: publicObj.maxLenFn
						},
						department:{
							fn: publicObj.maxLenFn
						},
						responsibility:	publicObj.maxLenFn
					},
					ajaxSubmit: {
		    	  elems: 'input:text, input:hidden, textarea',
		        beforeSend: function(){},
		     		success: function(result){
		     			var code=result.rescode;
		     			if(code==1){
		     				if(type=="new"){
		     					form.closest('.show').siblings('.add').show();
		     					var li=form.closest('.list');
		     					li.before(result.resmsg);
		     					li.remove();
									$('.body_l [href="#jobSection"] .i_redpoint').remove();
		     				}else{
		     					form.closest('.list').prev().remove();
			     				form.closest('.list').before(result.resmsg);
			     				form.closest('.list').remove();
		     				}
		     			}
		    		}
		    	}
				}).init().submit(function(){
	        if(!publicObj.checkDate('workStartDateYear', 'workEndDateYear', 'workStartDateMon', 'workEndDateMon')){
	          $('.date p.err',form).html('请选择正确的日期范围！').show();
	          return false;
	        }else{
	          return true;
	        }
				});
			},
			initEduForm:function(form,type){
				publicObj.initSelect();
				form.validatorAll({
					elems:".v",
					prompt:publicObj.prompt,
					more:{
						school:{
							fn: publicObj.maxLenFn
						},
						major:{
							fn: publicObj.maxLenFn
						}
					},
					ajaxSubmit: {
		    	  elems: 'input:text, input:hidden, textarea',
		        beforeSend: function(){},
		     		success: function(result){
		     			var code=result.rescode;
		     			if(code==1){
		     				if(type=="new"){
		     					form.closest('.show').siblings('.add').show();
		     					var li=form.closest('.list');
		     					li.before(result.resmsg);
		     					li.remove();
									$('.body_l [href="#eduSection"] .i_redpoint').remove();
		     				}else{
		     					form.closest('.list').prev().remove();
			     				form.closest('.list').before(result.resmsg);
			     				form.closest('.list').remove();
		     				}
		     			}
		    		}
		    	}
				}).init().submit(function(){
					if(!publicObj.checkDate('eduStartDateYear', 'eduEndDateYear', 'eduStartDateMon', 'eduEndDateMon')){
					  $('.date p.err',form).html('请选择正确的日期范围！').show();
					  return false;
					}else{
					  return true;
					}					
				});
			},			
			init:function(){
				var _this=this;
				_this.initCity();
				_this.initSelect();
				_this.initProductionForm($('#productionSection form'),'new');
				_this.initJobForm($('#jobSection form'),'new');
				_this.initEduForm($('#eduSection form'),'new');				
			}
		}
		function initBaseForm(){
   		var form=$('#baseForm');
   		var cityName = $('input[name=cityName]',form),
   		    cityCode = $('input[name=location]',form);
			form.validatorAll({
				elems:".v",
				prompt:publicObj.prompt,
   			more:{
					email:{
						fn: publicObj.maxLenFn
					},
					workYears:{
						type:  /^[1-9]\d*$/,
		        msg: '工作年限格式不对！'
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
   				}
   			},				
				ajaxSubmit: {
	    	  elems: 'input:text, input:hidden, textarea',
	        beforeSend: function(){},
	     		success: function(result){
	     			var code=result.rescode;
	     			if(code==1){
	     				$.maskUI.alert('基本资料保存成功');
	     				var name=$('[name="name"]',form).val();
	     				$('.body_l .base .p1').html(name);
							$('.body_l [href="#basicSection"] .i_redpoint').remove();
	     			}	
	    		}
	    	}
			}).init().submit();
		}
		function initExpJobForm(){
   		var form=$('#expJobForm');
   		var cityName = $('input[name=cityName]',form),
   		    cityCode = $('input[name=location]',form);
			form.validatorAll({
				elems:".v",
				prompt:publicObj.prompt,
   			more:{
					positionName:{
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
   				}
   			},				
				ajaxSubmit: {
	    	  elems: 'input:text, input:hidden, textarea',
	        beforeSend: function(){},
	     		success: function(result){
	     			var code=result.rescode;
	     			if(code==1){
	     				$.maskUI.alert('期望工作保存成功');
							$('.body_l [href="#expJobSection"] .i_redpoint').remove();
	     			}
	    		}
	    	}
			}).init().submit(function(){
				var salaryRadio=$('[action-type=salaryRadio]',form),
						salaryInput=$('[name="lowSalary"]',form),
						salaryVal=$.trim(salaryInput.val());
				if(salaryRadio.hasClass('current')){
					return true;
				}else{
					if(/^[1-9]\d*$/.test(salaryVal)){
						salaryInput.removeClass('err_b');
						salaryInput.siblings('.err').hide();
						return true;
					}else{
						salaryInput.addClass('err_b');
						salaryInput.siblings('.err').html('请输入正确的薪资！').show();
						return false;
					}
				}
			});

			$('[action-type=salaryRadio]',form).on('click',function(){
				var _t=$(this),
						ipt=_t.prev('input'),
						btn=form.find('[data-type="lowSalary"]');
				if(_t.hasClass('current')){
					ipt.removeAttr('readonly').focus();
					ipt.val('');
					ipt.show();
					btn.hide();
				}else{
					ipt.attr('readonly','readonly');
					ipt.hide();
					btn.show();
				}
				ipt.removeClass('err_b');
				ipt.siblings('.err').hide();
				_t.toggleClass('current');
			});
		}
   	function initLureForm(){
   		var form=$('#lureForm');
			form.validatorAll({
				elems:".v",
				prompt:publicObj.prompt,
				more:{
					lureContent: publicObj.maxLenFn,
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
	     				$.maskUI.alert('我的亮点保存成功');
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
   	function editForm(){
   		$('.form').on('click','[action-type="edit_bt"]',function(){
   			var _this=$(this),
   					url=_this.data('url'),
   					fn=_this.data('fn');
   			$.ajax({
   				url:url,
   				success:function(result){
   					var liObj=_this.closest('.list');
   					liObj.hide();
   					liObj.after(result.html);
   					publicObj[fn](liObj.next().find('form'))
   				}
   			});
   		});
   	}
   	function cancelForm(){
   		$('.form').on('click','[action-type="cancel_bt"]',function(){
   			var _this=$(this),
						liObj=_this.closest('.list');
				if(liObj.data('type')=='new'){
					liObj.parent().siblings('div.add').show();
					liObj.remove();
				}else{
					liObj.prev().show();
					liObj.remove();
				}
   		});
   	}
   	function addNewForm(){
   		$('.form').on('click','[action-type="addNew_bt"]',function(){
   			var _this=$(this),
   					fn=_this.data('fn');
   			_this.parent().hide();
   			var newObj=_this.parent().siblings('ul').find('[data-type="new"]');
   			var cloneNew=newObj.clone();
   			newObj.after(cloneNew);
   			newObj.show();
   			publicObj[fn](cloneNew.find('form'),'new');
   		});
   	}
   	function delForm(){
   		$('.form').on('click','[action-type="del_bt"]',function(){
   			var _this=$(this),
   					url=_this.data('url');
   					id=_this.data('val'),
   					typeid=_this.data('typeid');
   			$.maskUI.confirm({
					msg:"确定要删除吗？",
					callback:function(){
						$.ajax({
							url:url,
							type:'post',
							data:{
								id:id,
								type:typeid
							},
							dataType:'json',
							success:function(result){
								_this.closest('.list').remove();
							}
						});
					}
				}) 
   		});
   	}
		function init(){
			initBaseForm();
			initExpJobForm();
			initLureForm();
			publicObj.init();
			editForm();
			cancelForm();
			addNewForm();
			delForm();
		}
		init();
	});
});