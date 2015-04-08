require.config({
    urlArgs: "v=1.001"
});

require(['../utils/maskui', '../utils/validator'], function(){
	$(function(){

		var profileDialog = $('#profileDialog');

//		$.maskUI.config = {
//			wrap: '<section class="p_dialog" id="{0}"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{1}</div></section>',
//			alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
//			confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
//		};
		
		//点击弹出 已经存在的dialog
		$('#btn1').on('click', function(e){
			e.preventDefault();
			$.maskUI.open({
				elem: profileDialog,
				overlayClick:  true
			});
		});


		//动态DIALOG

		//这是动态添加的HTML
		var html = '<h3>修改个人信息</h3><p class="center_p"><i class="suc_p"></i>修改密码成功！</p><p class="center_p"><i class="err_p"></i>修改密码成功！</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>'
		
		$('#btn2').on('click', function(e){
			e.preventDefault();
			$.maskUI.open({
				content: html
			});
		});

		//alert
		$('#btn3').on('click', function(){
			//传入alert的内容
			$.maskUI.alert('热烈庆祝中华人民共和国');
		});


		//confirm
		$('#btn4').on('click', function(){
			//传入confirm的内容 和 点击确定后执行的事件 callback里this为jquery对象 指向弹出层
			$.maskUI.confirm({
				msg: 'Are you sure to delete this item!',
				callback: function(){
					alert(this.html())
				}
			})
			
		});

    var html2 = '<h3>修改个人信息</h3><p class="center_p"><i class="suc_p"></i>修改密码成功！</p><p class="center_p"><i class="err_p"></i>修改密码成功！</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>'

    $('#btn5').on('click', function(e){
      e.preventDefault();
      $.maskUI.open({
        content: html2,
        onClose: function(){
          alert('will reload page');
          window.location.reload();
        }
      });
    });







		//表单验证
		$('#modifyEmailForm').validatorAll({
			//需要提交的组件
			//必填项
			elems: '.v',

			//错误信息提示
			//必填项
			prompt: {
				succ: function(target){
					$('p.err', target.parent().parent()).html('').hide();
					target.parent().next('i').attr('class', 'suc_v').css('display','inline-block');
				},
				err: function(target, msg){
					var elem = $('p.err', target.parent().parent());
					elem.html(msg || elem.data('msg')).show();
					target.parent().next('i').attr('class', 'err_v').css('display','inline-block');
				},
				normal: function(target){
					$('p.err', target.parent().parent()).html('').hide();
					target.parent().next('i').hide();
				}
			},

			/*
			非空验证之外的第二步验证，两种传参方式：
			1、 type+msg  正正则校验
			2、 传入function 处理一些自定义的校验 比如校验两次输入的密码一致
			*/
			//可选
			more: {
				mail: {
					type: 'isMail',
					msg: '请输入正确的邮箱！',
					fn: function(_this, prompt){
						$.getJSON('/xxxxx.json', function(ret){
							if(ret.xxxx){
								prompt.err($(this), '此邮箱已被注册！');
								_this.form.find('input[type=submit]').prop('disabled', true);
							}else{
								prompt.succ($(this));
								_this.form.find('input[type=submit]').prop('disabled', false);
							}
						});
						return true;
					}
				},
				phone: {
					type: 'isPhone',
					msg: '请输入正确的手机号！'
				},
				password: function(_this, prompt){
					var re = _this.form.find('input[name=repassword]'), val = re.val();
					if(val != '' && this.value != val){
						prompt.err($(this), '两次输入的密码不一致！');
						prompt.normal(re);
						return false;
					}else{
						prompt.succ($(this));

						if(val != ''){
							prompt.succ(re);
						}
						return true;
					}
				},
				repassword: function(_this, prompt){
					var pwd = _this.form.find('input[name=password]'), val = pwd.val();
					if(val != '' && this.value != val){
						prompt.err($(this), '两次输入的密码不一致！');
						prompt.normal(pwd);
						return false;
					}else{
						prompt.succ($(this));
						
						if(val != ''){
							prompt.succ(pwd);
						}
						return true;
					}
				}
			},


			//第三步校验 发生在提交表单前 传入function
			//可选
			submitMore: function(){
				alert('123')
			},


			//是否改为ajax提交表单
			//可选
			ajaxSubmit: {
				elems: 'input:text',

				//可选
				beforeSend: function(){

				},
				//可选
				//这里的this为 form的jquery对象
				success: function(ret){

					console.log(ret)
				},
				//可选
				error: function(){

				}
			}
		}).init().submit(function(){
			alert('xxx');
			return true;
		});


		$('#loginForm').validatorAll({
			elems: '.v',
			prompt: {
				succ: function(target){
					$('p.err', target.parent().parent()).html('').hide();
					target.parent().next('i').attr('class', 'suc_v').css('display','inline-block');
				},
				err: function(target, msg){
					var elem = $('p.err', target.parent().parent());
					elem.html(msg || elem.data('msg')).show();
				},
				normal: function(target){
					$('p.err', target.parent().parent()).html('').hide();
				}
			},
			ajaxSubmit: {
				elems: 'input:text',
				success: function(ret){
					console.log(ret)
				}
			},
			more: {
				password: {
					type: 'isPwd',
					msg: '密码格式不对！'
				}
			}
		}).init().submit();

	});
});