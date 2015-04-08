require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components'
    }
});
require(['c/auth_dialog', 'c/widgets','u/easypiechart','u/validator'], function(auth_dialog,widgets,EasyPieChart){
	$(function(){
		$('input:text').placeholder();
		// IE function.bind polyfill
		if (!Function.prototype.bind) {
			Function.prototype.bind = function (oThis) {
				if (typeof this !== "function") {
					// closest thing possible to the ECMAScript 5 internal IsCallable function
					throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
				}

				var aArgs = Array.prototype.slice.call(arguments, 1),
					fToBind = this,
					fNOP = function () {},
					fBound = function () {
						return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
				};

				fNOP.prototype = this.prototype;
				fBound.prototype = new fNOP();

				return fBound;
			};
		}
		var barColor={
			green: "#7cb228",
			orange: "#f38100",
			red: "#eb7676"
		}
		function initChart(){
			var percent=parseInt($("#chart").attr("data-percent"));
			var bC="";
			if(percent>0&&percent<=30){
				bC=barColor.red;
			}else if(percent>30&&percent<=70){
				bC=barColor.orange;
			}else{
				bC=barColor.green;
			}
			var chart = window.chart = new EasyPieChart(document.getElementById('chart'), {
				easing: 'easeOutElastic',
				delay: 2000,
				trackColor: '#fff',
				barColor:bC,
				scaleColor:false,
				lineWidth:13,
				//lineCap:'circle',
				size: 80,
				animate: {
					duration: 1000,
					enabled: true
				},
				onStep: function(from, to, percent) {
					this.el.children[0].innerHTML = Math.round(percent)+"%";
				}
			});
		}
		if($("#chart")[0]){
			initChart();
		}
		//自定义下拉框
		$('.select', '#pkSalaryForm').DIYSelect({
	    listCallback: function (list, field, select) {
	      select.removeClass('s_err').addClass('s_suc');
	      select.find('dt>input:hidden').val($(this).data('val'));
	    }
	  });
	  //只能输入数字
	  $('[name="salary"]').on("keyup",function(){
	    var val = this.value.replace(/^0(?=\d+)|\D/g, '');
	    $(this).val(val);
	  });
	  //职位自动补全
		var company=$('input[name="jobTitle"]');
    company.autocomplete({
      serviceUrl: '/autocomplete/searchkey.json',
      paramName: 'query',
      params: function (query) {
        return {
          query: query,
          type: 3
        };
      },
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            return { value: dataItem.value, type: dataItem.type};
          })
        };
      },
      onSelect: function(suggestion){
      }
    });	

	  $('#pkSalaryForm').validatorAll({
	    elems: '.v',
	    prompt: {
	      succ: function (target) {
	        $('.red', target.parent()).html('').hide();
	      },
	      err: function (target, msg) {
	        var elem = $('.red', target.parent());
	        elem.html(msg || elem.data('msg')).show();
	      },
	      normal: function (target) {
	        $('.red', target.parent()).html('').hide();
	      }
	    },
		  more: {
	      salary: {
					fn:function(_this,prompt){
						if(this.value=="0"){
							prompt.err($(this),"请输入税前月薪");
							return false;
						}else{
							prompt.succ($(this));
							return true;
						}
					}
	      }
	    }
	  }).init().submit();  
	});
});