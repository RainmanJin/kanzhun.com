require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator','c/autosearch'],function(){
	$(function(){
    $('input:text, input:password').placeholder();
		//查找
		$(".js_search").on("click",function(){
      var thisParent = $(".js_search").parent();
			var url=$(this).attr("data-url");
			var cn=$('[name="searchWord"]').val();
      if($.trim(cn) !== '' ) {
        $.ajax({
          url:url,
          data:{
            cn:cn, uid: $('input[name=uid]').val()
          },
          dataType:"json",
          success:function(result){
            $("#searchResult").html(result.html);
            thisParent.hide();
          }
        });
      }
		});
		//回车搜索
		$('[name="searchWord"]').on("keyup",function(e){
			if(e.keyCode==13){
				$(".js_search").click();
			}
		});

    //公司注册
    var userRegisterForm = $('#userRegisterForm'), uFlag = false;
    userRegisterForm.validatorAll({
      elems: 'input.v',
      prompt: {
        succ: function (target) {
          $('.red', target.parent()).html('').hide();
          target.removeClass('error focus');
        },
        err: function (target, msg) {
          var elem = $('.red', target.parent());
          elem.html('<i class="base errormsg"></i> ' + (msg || elem.data('msg'))).show();
          target.removeClass('focus').addClass('error');
        },
        normal: function (target) {
          $('.red', target.parent()).html('').hide();
          target.removeClass('error').addClass('focus');
        }
      },
      focusMore: function(prompt){
        $(this).removeClass('error').addClass('focus');
        $(this).parent().find('.red').hide();
        return true;
      },
      more: {
        mobile: {
          type: 'isPhone',
          msg: '请输入格式正确的手机号',
          fn: function (_this, prompt) {
            /*if (!e) {
             //return true;
             }*/
            var self = $(this),
              val = $(this).val();

            /*if(phoneAccountCheck.val() == val){
             prompt.err(self, '此手机号已被绑定');
             $("#phone_code_btn").prop('disabled', true);
             return false;
             }*/

            $.ajax({
              url: '/setting/checkMobile.json',
              type: "post",
              dataType: "json",
              data: {
                m: val
              },
              success: function (ret) {
                if (ret.rescode == 0) {
                  //$("#btn_phone_code", person_info_ipt).prop('disabled', true);
                  prompt.err(self, '此手机号已被绑定');
                  return false;
                }else {
                  prompt.succ(self);
                  uFlag = true;
                }
              }
            });
            //$("#btn_phone_code", person_info_ipt).prop('disabled', false);
            return true;
          }
        },
        officePhone1: {
          fn:function(_this, prompt){
            if($(this).val().length<3){
              prompt.err($(this),'请输入3~4位区号');
              return false;
            }else{
              prompt.succ($(this));
              return true;
            }
          }
        },
          officePhone2: {
            fn:function(_this, prompt){
              if($(this).val().length<6){
                prompt.err($(this),'请输入6~8位座机号');
                return false;
              }else{
                prompt.succ($(this));
                return true;
              }
            }
          }
      }
    }).init().submit(function(){
      if( !uFlag ) {
        return false;
      }
    //联系方式校验
    var $officePhone1 = $('input[name=officePhone1]'),
      $officePhone2 = $('input[name=officePhone2]'),
      $officePhone3 = $('input[name=officePhone3]');
    var officePhone1=$.trim($officePhone1.val()),
      officePhone2=$.trim($officePhone2.val()),
      officePhone3=$.trim($officePhone3.val());
    var oElem=$officePhone1.siblings('.red');

    if(officePhone1 !=='' || officePhone2 !==''){
      if( officePhone1 !=='' && officePhone2 !==''){
        return true;
      }else {
        oElem.html('<i class="base errormsg"></i>' + oElem.data('msg')).show();
        return false;
      }
    }else {
      if( officePhone3 !== '' ) {
        oElem.html('<i class="base errormsg"></i>' + oElem.data('msg')).show();
        return false;
      }else {
        return true;
      }
    }
  });

		//小公司注册
    /*var accountCheck = $('input[name=accountCheck]');
    $('#userRegisterForm[data-type=small]').validatorAll({
      elems: 'input',
      prompt: {
        succ: function (target, e) {
          var parent = target.parent();
          $('span.red', parent).hide();
          parent.removeClass('error focus');
        },
        err: function (target, msg, e) {
          var parent = target.parent();
          var elem = $('span.red', parent);
          elem.html('<i class="base errormsg"></i>' + (msg || elem.data('msg'))).show();
          parent.removeClass('focus').addClass('error');
        },
        normal: function (target, e) {
          var parent = target.parent();
          $('span.red', target.parent()).hide();
          parent.removeClass('error').addClass('focus');
        }
      },

      focusMore: function(prompt){
        $(this).parent().removeClass('error').addClass('focus');
        return true;
      },

      more: {
        account: {
          type: 'isMail',
          msg: '邮箱格式不正确！',
          fn: function (_this, prompt, e) {
            var self = $(this),
                val = this.value;

            if(accountCheck.val() == val){
              prompt.err(self, '此邮箱已被注册！');
              return false;
            }
            $.getJSON('/checkRegister.json?email=' + encodeURIComponent(val), function (ret) {
              ret = ret || {};
              if (ret.rescode == 1) {
                if (!ret.register) {
                  prompt.succ(self);

                  accountCheck.val('');
                } else {
                  prompt.err(self, '此邮箱已被注册！');
                  accountCheck.val(val);
                }
              } else {
                prompt.err(self, ret.resmsg || '服务器异常！');
                accountCheck.val('');
              }

            });
            return true;
          }
        },

        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=confirmPassword]'), val = $.trim(re.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
              prompt.normal(re);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(re);
              }
              return true;
            }
          }
        },
        confirmPassword: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var pwd = _this.form.find('input[name=password]'), val = $.trim(pwd.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
              prompt.normal(pwd);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(pwd);
              }
              return true;
            }
          }
        },
        mobile: {
          type: "isPhone",
          msg: "请输入11位有效手机号"
        },
        officePhone1: {
          fn:function(_this, prompt){
            if($(this).val().length<3){
              prompt.err($(this),'请输入正确的区号');
              return false;
            }else{
              prompt.succ($(this));
              return true;
            }
          }
        },
        officePhone2: {
          fn:function(_this, prompt){
            if($(this).val().length<7){
              prompt.err($(this),'请输入正确的座机号');
              return false;
            }else{
              prompt.succ($(this));
              return true;
            }
          }
        }
      }
    }).init().submit(function () {
      if (accountCheck.val() !== '') {
        return false;
      } else {
        //联系方式校验
        var $officePhone1 = $('input[name=officePhone1]'),
          $officePhone2 = $('input[name=officePhone2]'),
          $mobile = $('input[name=mobile]');
        var officePhone1=$.trim($officePhone1.val()),
          officePhone2=$.trim($officePhone2.val()),
          mobile=$.trim($mobile.val());
        var oElem=$officePhone1.siblings('.red'),
            mElem=$mobile.siblings('.red');
        if(officePhone1==''&&officePhone2==''&&mobile==''){
          mElem.html('<i class="base errormsg"></i>' + '座机或手机必填一项').show();
          return false;
        }else{
          if(officePhone1==''||officePhone2==''){
            oElem.html('<i class="base errormsg"></i>' + oElem.data('msg')).show();
            return false;
          }else{
            return true;
          }
        }
      }
    });*/

    //大公司注册
    $('#userRegisterForm[data-type=big]').validatorAll({
      elems: 'input',
      prompt: {
        succ: function (target, e) {
          var parent = target.parent();
          $('span.red', parent).hide();
          parent.removeClass('error focus');
        },
        err: function (target, msg, e) {
          var parent = target.parent();
          var elem = $('span.red', parent);
          elem.html('<i class="base errormsg"></i>' + (msg || elem.data('msg'))).show();
          parent.removeClass('focus').addClass('error');
        },
        normal: function (target, e) {
          var parent = target.parent();
          $('span.red', target.parent()).hide();
          parent.removeClass('error').addClass('focus');
        }
      },

      focusMore: function(prompt){
        $(this).parent().removeClass('error').addClass('focus');
        return true;
      },
      more: {
        account: {
          fn: function (_this, prompt, e) {
            var self = $(this),
                emVal=self.siblings("em").html(),
                val = this.value+emVal;

            if(accountCheck.val() == val){
              prompt.err(self, '此邮箱已被注册！');
              return false;
            }
            $.getJSON('/checkRegister.json?email=' + encodeURIComponent(val), function (ret) {
              ret = ret || {};
              if (ret.rescode == 1) {
                if (!ret.register) {
                  prompt.succ(self);

                  accountCheck.val('');
                } else {
                  prompt.err(self, '此邮箱已被注册！');
                  accountCheck.val(val);
                }
              } else {
                prompt.err(self, ret.resmsg || '服务器异常！');
                accountCheck.val('');
              }

            });
            return true;
          }
        },        
        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=confirmPassword]'), val = $.trim(re.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
              prompt.normal(re);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(re);
              }
              return true;
            }
          }
        },
        confirmPassword: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var pwd = _this.form.find('input[name=password]'), val = $.trim(pwd.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
              prompt.normal(pwd);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(pwd);
              }
              return true;
            }
          }
        },
        mobile: {
          type: "isPhone",
          msg: "请输入11位有效手机号"
        },
        officePhone1: {
          fn:function(_this, prompt){
            if($(this).val().length<3){
              prompt.err($(this),'请输入正确的区号');
              return false;
            }else{
              prompt.succ($(this));
              return true;
            }
          }
        },
        officePhone2: {
          fn:function(_this, prompt){
            if($(this).val().length<7){
              prompt.err($(this),'请输入正确的座机号');
              return false;
            }else{
              prompt.succ($(this));
              return true;
            }
          }
        }
      }
    }).init().submit(function(){
      if (accountCheck.val() !== '') {
        return false;
      } else {
        //联系方式校验
        var $officePhone1 = $('input[name=officePhone1]'),
          $officePhone2 = $('input[name=officePhone2]'),
          $mobile = $('input[name=mobile]');
        var officePhone1=$.trim($officePhone1.val()),
          officePhone2=$.trim($officePhone2.val()),
          mobile=$.trim($mobile.val());
        var oElem=$officePhone1.siblings('.red'),
          mElem=$mobile.siblings('.red');
        if(officePhone1==''&&officePhone2==''&&mobile==''){
          mElem.html('<i class="base errormsg"></i>' + '座机或手机必填一项').show();
          return false;
        }else{
          if(officePhone1==''||officePhone2==''){
            oElem.html('<i class="base errormsg"></i>' + oElem.data('msg')).show();
            return false;
          }else{
            //邮箱拼接
            var emVal=$("[name=account]").siblings("em").html();
            var emailVal=$("[name=account]").val();
            $("[name=account]").val(emailVal+emVal);
            return true;
          }
        }
      }
    });

     //大公司注册其他
    var oOther= $('#userRegisterForm[data-type=other]');
  	oOther.validatorAll({
      elems: '.v,input:hidden',
      prompt: {
        succ: function (target, e) {
          var parent = target.parent();
          $('span.red', parent).hide();
          parent.removeClass('error focus');
        },
        err: function (target, msg, e) {
          var parent = target.parent();
          var elem = $('span.red', parent);
          elem.html('<i class="base errormsg"></i>' + (msg || elem.data('msg'))).show();
          parent.removeClass('focus').addClass('error');
        },
        normal: function (target, e) {
          var parent = target.parent();
          $('span.red', target.parent()).hide();
          parent.removeClass('error').addClass('focus');
        }
      },

      focusMore: function(prompt){
        $(this).parent().removeClass('error').addClass('focus');
        return true;
      },
      more: {
        account: {
          type: 'isMail',
          msg: '邮箱格式不正确！',
          /*
          fn: function(_this, prompt){
            var self = $(this),
                val = this.value,
                flag=true;
            $.ajax({
              url:"/checkBigCompanyEmail.json",
              async:false,
              data:{
                email:val
              },
              dataType:"json",
              success:function(result){
                if(result.rescode.code==1){
                  prompt.succ(self);
                }else{
                  prompt.err(self, result.resmsg);
                  flag=false;
                }
              }
            });
            return flag;
          }
          */
          fn: function(_this, prompt){
            var self = $(this),
                val = this.value,
                flag=true;
            $.ajax({
              url:"/checkBigCompanyEmail.json",
              async:false,
              data:{
                email:val
              },
              dataType:"json",
              success:function(result){
                if(result.rescode.code==1){
                  prompt.succ(self);

                  //检测邮箱是否注册
                  $.ajax({
                    url:"/checkRegister.json",
                    async:false,
                    data:{
                      email:val
                    },
                    dataType:"json",
                    success:function(result){
                      if(result.register){
                        prompt.err(self, '此邮箱已被注册');
                        flag=false;
                      }else{
                        prompt.succ(self);
                      }
                    }
                  });

                }else{
                  prompt.err(self, result.resmsg);
                  flag=false;
                }
              }
            });
            return flag;
          }        
        
        },  
        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=confirmPassword]'), val = $.trim(re.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
              prompt.normal(re);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(re);
              }
              return true;
            }
          }
        },
        confirmPassword: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var pwd = _this.form.find('input[name=password]'), val = $.trim(pwd.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
              prompt.normal(pwd);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(pwd);
              }
              return true;
            }
          }
        },
        license:{
          fn:function(_this, prompt){
            if($(this).val()==""){
              prompt.err($(this)); 
              return false; 
            }else{
              prompt.succ($(this)); 
              return true;           
            }
          }
        },      
        mobile: {
        	type: "isPhone",
        	msg: "请输入11位有效手机号"
        },
        officePhone1: {
          fn:function(_this, prompt){
            if($(this).val().length<3){
              prompt.err($(this),'请输入正确的公司座机'); 
              return false; 
            }else{
              prompt.succ($(this)); 
              return true;           
            }                      
          }
        },
        officePhone2: {
          fn:function(_this, prompt){
            if($(this).val().length<7){
              prompt.err($(this),'请输入正确的公司座机'); 
              return false; 
            }else{
              prompt.succ($(this)); 
              return true;           
            }                      
          }
        }
      }
    }).init().submit();

    //只能输入数字
    $('[data-type="onlyNum"]').on("keyup",function(){
      var val = this.value.replace(/^(?=\d+)|\D/g, '');
      $(this).val(val);
    });

    // 上传方法
    /*
    oOther.find("#filebtn").on("click",function(){
      $.upload({
        // 上传地址
        url: '/file/upload.json', 
        // 文件域名字
        fileName: 'file', 
        // 其他表单数据
        params: {

        },
        // 上传完成后, 返回json, text
        dataType: 'json',
        // 上传之前回调,return true表示可继续上传
        onSend: function() {
          return true;
        },
        // 上传之后回调
        onComplate: function(result) {
          //alert(data);
          $("#uploadform").remove();
          $(".uploadsuss").show();
          if(result.rescode){
            $("#license").val(result.imgFileUrl);
          }else{
            alert("上传失败");
          }
        }
      });
    });
    */
    
    function intiWebUpload(){
      // 初始化Web Uploader
      var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '/js/Uploader.swf',
        // 文件接收服务端。
        server: '/file/upload.json',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
          id: '#filebtn',
          label: '上传'
        },
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
      });
      // 文件上传成功，给item添加成功class, 用样式标记上传成功。
      uploader.on( 'uploadSuccess', function( file , response ) {
          $(".uploadsuss").show();
          if(response.rescode){
            $("#license").val(response.imgFileUrl);
            $("#license").siblings(".red").hide();
          }else{
            alert("上传失败");
          }
      });
    }
    try{
      intiWebUpload();
    }catch(e){
      
    }    


		//审核结果短信复选框
		oOther.find("#isMsg").on("click",function(){
			if($(this).is(":checked")){
				oOther.find("#mobile").addClass("v");
			}else{
				oOther.find("#mobile").removeClass("v");
			}
		})

		//重新发送验证邮件
		$(".js_sendMail").on("click",function(){
			var url=$(this).attr("data-url");
			$.ajax({
				url:url,
				dataType:"json",
				success:function(result){
					if(result.rescode){
						alert("发送成功");
					}
				}
			});
		});
	});
});