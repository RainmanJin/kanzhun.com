require.config({
  baseUrl: '../js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});


require(['c/widgets','u/validator'], function () {
	$(function(){
		$('.select').DIYSelect();

		$('form').validatorAll({
			elems:".v",
			prompt:{
				succ:function(target){
					var prompt=target.siblings(".err");
					prompt.hide();
				},
				err:function(target,msg){
					var prompt=target.siblings(".err");
					prompt.html((msg||prompt.data("msg")) ).show();
				},
				normal:function(target) {
					var prompt = target.siblings(".err");
					prompt.hide();
				}
			},
			focusMore:{
			},
			more:{
				age: {
					type: /^[1-9]\d*$/,
					msg: '请输入正确的年龄！'
				},
				email:{
					type: 'isMail',
					msg: '邮箱格式不对！'
				}
			}
		}).init().submit();

  });
});