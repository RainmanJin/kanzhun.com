require.config({
    urlArgs: "v=1.001"
});

require(['../utils/maskui', '../utils/validator'], function(){
	$(function(){

		//弹出层
		var profileDialog = $('#profileDialog');
		


		//点击a弹出
		$('img').on('click', function(e){
			e.preventDefault();
			$.maskUI.open({
				elem: profileDialog,
				overlayClick:  true
			});
		});

		//点击弹出
		$('p').on('click', function(){
			$.maskUI.alert('热烈庆祝中华人民共和国');
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
					msg: '请输入正确的邮箱！'
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