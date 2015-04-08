require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
    }
});
require(['c/auth_dialog', 'c/widgets','c/mini_search','highcharts','u/validator'], function(auth_dialog){
	$(function(){
		//var reportDataJson=[{"item":{"name":"0-2k","count":228,"id":1,"setName":true,"setId":true,"setCount":true},"percent":3.41},{"item":{"name":"2-4k","count":994,"id":2,"setName":true,"setId":true,"setCount":true},"percent":14.85},{"item":{"name":"4-6k","count":1443,"id":3,"setName":true,"setId":true,"setCount":true},"percent":21.56},{"item":{"name":"6-8k","count":1271,"id":4,"setName":true,"setId":true,"setCount":true},"percent":18.99},{"item":{"name":"8-10k","count":1065,"id":5,"setName":true,"setId":true,"setCount":true},"percent":15.91},{"item":{"name":"10-15k","count":1003,"id":6,"setName":true,"setId":true,"setCount":true},"percent":14.98},{"item":{"name":"15-25k","count":537,"id":7,"setName":true,"setId":true,"setCount":true},"percent":8.02},{"item":{"name":"25-50k","count":142,"id":8,"setName":true,"setId":true,"setCount":true},"percent":2.12},{"item":{"name":">50k","count":11,"id":9,"setName":true,"setId":true,"setCount":true},"percent":0.16}];
		//var reportDataJson={"count":6694,"min":600,"max":1000000000,"avg":177023,"salary":15000,"beyondPercent":60,"titleTop":"我在北京互联网行业的职业坐标","titleBeyondPercent":"我在北京互联网行业的职业坐标","selfRange":3,"counterItems":[{"item":{"name":"0-2k","count":228,"id":1,"setId":true,"setCount":true,"setName":true},"percent":3.41},{"item":{"name":"2-4k","count":994,"id":2,"setId":true,"setCount":true,"setName":true},"percent":14.85},{"item":{"name":"4-6k","count":1443,"id":3,"setId":true,"setCount":true,"setName":true},"percent":21.56},{"item":{"name":"6-8k","count":1271,"id":4,"setId":true,"setCount":true,"setName":true},"percent":18.99},{"item":{"name":"8-10k","count":1065,"id":5,"setId":true,"setCount":true,"setName":true},"percent":15.91},{"item":{"name":"10-15k","count":1003,"id":6,"setId":true,"setCount":true,"setName":true},"percent":14.98},{"item":{"name":"15-25k","count":537,"id":7,"setId":true,"setCount":true,"setName":true},"percent":8.02},{"item":{"name":"25-50k","count":142,"id":8,"setId":true,"setCount":true,"setName":true},"percent":2.12},{"item":{"name":">50k","count":11,"id":9,"setId":true,"setCount":true,"setName":true},"percent":0.16}]};
		var citySelect=$("#citySelect"),
				companySelect=$("#companySelect"),
				cityId=$("input[name=cityId]"),
				companyId=$("input[name=companyId]"),
				company=$("input[name=company]"),
				rWarm=$(".r_warm");
		citySelect.DIYSelect({
			listSelector:"dd>div>a",
	    listCallback: function (l, field, select) {
	    	getReportData(cityId.val(),companyId.val());
	    }
	  });
		companySelect.DIYSelect({
			listSelector:"dd>div>a",
	    listCallback: function (l, field, select) {
	    	getReportData(cityId.val(),companyId.val());
	    }
		});
		function createSalaryReport(json){
			var counterItems=json.counterItems,
					aXcategories=[],
					aSeryData=[],
					keyName="", //我所在的工资范围
					titleHtml="",
					lineHtml="";
			$.each(counterItems,function(i,v){
				aXcategories.push(v.item.name);
				aSeryData.push(v.percent);
				if(reportDataJson.selfRange==v.item.id){
					keyName=v.item.name;
				}
			});
			$(".r_chart_c").highcharts({
				chart:{
					type:"column"
				},
				title:{
					text:''
				},
				xAxis:{
					categories:aXcategories,
					lineColor:"#007ead",
		      lineWidth:1
				},
				yAxis:{
					title:{
						text:""
					},	
					tickInterval: 10,//自定义刻度
				  labels: {
						formatter: function() {
							return this.value +'%';
						}
		      },
		      lineColor:"#007ead",
		      lineWidth:1
				},
		    series: [{
		    	color:"#c5dcf2",
		      data:aSeryData
		   	}],
		   	legend: {
		      enabled: false
		    },
		   	credits: {
			    enabled: false //隐藏highcharts标识
			  },
			  /*
		   	tooltip:{	//鼠标经过提示
		   		//enabled: false,
					style: {
						color: '#999',
						fontSize: '14px',
						padding: '8px'
					},
					valueDecimals:1,
					headerFormat:"",
					pointFormat:'<span>我</span> ￥10,000'
		   	},	 
		   	*/	  
			  plotOptions:{
			  	column: { 
			  		dataLabels: { 
			  			enabled: true,
		          formatter: function() {
		          	var key=this.key;
		          	if(keyName==key){
		          		return '<p style="color:#85c15d;text-align:center" text-anchor="middle">我在这</p>￥'+json.salary;
		          	}else{
		          		return;
		          	}
		          },
		          useHTML:true
			  		}, 
			  		enableMouseTracking: false
			  	}		
				}
			});
			
			titleHtml+='<span>平均工资￥ <b>'+json.avg+'</b></span>'+
        				 '<span><i class="rect"></i> 职位平均工资</span>';
      lineHtml+='<div class="line">'+
          				'<div class="inner" style="width:'+json.beyondPercent+'%;">'+
            				'<i style="left:'+json.beyondPercent+'%;">'+json.beyondPercent+'%</i>'+
				          '</div>'+
				        '</div>'+
				        '<p class="intr">'+json.titleBeyondPercent+'</p>';
			$(".r_chart h4").html('<i></i>'+json.titleTop+'');
			$(".r_chart_line").html(lineHtml);
			$(".r_chart_title").html(titleHtml);	        			 
		}
		function getReportData(cityId,companyId){
			$.ajax({
				url:"/xs/reportdata.json",
				data:{
					cityCode:cityId,
					company:companyId
				},
        beforeSend: function(){
          $('div.r_chart_c').html('<p class="loading" style="padding-top: 50px;display: block;"><img src="'+CONTEXTPATH+'/images/loading.gif" /></p>');
        },
				dataType:"json",
				success:function(result){
          if(result && !$.isEmptyObject(result)){
            var companyItems=result.companyItems,
              withCompany=result.withCompany;
            createSalaryReport(result);
            createCompanySelect(companyItems);
            if(withCompany==0){
              company.addClass("red");
              createNoResult(companyItems);
            }else{
              company.removeClass("red");
              rWarm.html("").hide();
            }
          }
				}
			})
		}
		//创建公司下拉列表
		function createCompanySelect(companyJson){
			var h="";
			h+='<div><a href="javascript:;"data-val="0">不限</a></div>';
			h+='<div>';
				h+='推荐公司：';
			$.each(companyJson,function(i,v){
				h+='<a href="javascript:;" data-val="'+v.companyId+'">'+v.companyName+'</a><em>|</em>'
			});
			h+='</div>';
			$("dd",companySelect).html(h);
		}
		//职位样板不足
		function createNoResult(companyJson){
			var h="";
      h+='<i></i>';
      h+='<p>您的公司数据样本不足。</p>';
      h+='<p>为您推荐：'; 
			$.each(companyJson,function(i,v){
				h+='<a class="js_set" href="javascript:;" data-val="'+v.companyId+'">'+v.companyName+'</a>'
			});
      h+='</p>';
      rWarm.html(h).show();
		}
		rWarm.on("click",".js_set",function(){
			//getReportData(cityId.val(),companyId.val());
			var dataVal=$(this).data("val");
			companySelect.find('dd a[data-val='+dataVal+']').trigger("click");
		})
		function initSalaryReport(json){
			createSalaryReport(json);
		}	
		initSalaryReport(reportDataJson);


    $('dd.download_tip img').on('click', function(){
      $(this).parent().remove();
    });

    $('#downloadReport,#downloadReportBot').on('click', function(){
      $.maskUI.open({
        elem: 'reportDialog'
      });
    });

    var reportDialogForm = $('#reportDialogForm'),
      sendReport = $('#sendReport'),
      reportType = $('input[name=type]', reportDialogForm);
    $('dl.select', reportDialogForm).DIYSelect({
      listCallback: function(list, field, target){
        $('>p.err', field.parent().parent().parent()).hide();
      }
    });
    reportDialogForm.validatorAll({
      noSubmiting: true,
      elems: '.v',
      prompt: {
        succ: function (target) {
          var elem;
          if(target.attr('type') === 'hidden'){
            elem = $('>p.err', target.parent().parent().parent());
          }else{
            elem=$('>p', target.parent())
          }
          elem.html('').hide();
        },
        err: function (target, msg) {
          var elem;
          if(target.attr('type') === 'hidden'){
            elem = $('>p.err', target.parent().parent().parent());
          }else{
            elem=$('>p', target.parent());
          }
          elem.html(msg || elem.data('msg')).show();
        },
        normal: function (target) {
          var elem;
          if(target.attr('type') === 'hidden'){
            elem = $('>p.err', target.parent().parent().parent());
          }else{
            elem=$('>p', target.parent())
          }
          $('p', target.parent()).html('').hide();
        }
      },

      more:{
        email: {
          type: 'isMail',
          msg: '邮箱格式不对！',
          fn: function(_this, prompt, e){
            sendReport.attr('class', 'green_btn');
            prompt.succ($(this));
            return true;
          }
        }
      },

      ajaxSubmit:{
        elems: 'input:text, input[type=hidden]',
        type: 'get',
        beforeSend: function(){
          if(reportType.val() == 'email'){
            $.maskUI.alert('发送成功！');
          }
        },
        success: function(data){
          if(data && data.rescode == 1){

            if(data.type == 'download'){
              $.maskUI.close();
              $('#downloadLink').submit();
            }
          }
        }
      }
    }).init().submit();

    sendReport.on('click', function(){
    var email = $('input[name=email]');
      if($.trim(email.val()) == ''){
        var prompt = email.siblings('p.err');
        prompt.html(prompt.data('msg')).show();
        return;
      }

      reportType.val('email');
      reportDialogForm.submit();
    });
    $('input[type=submit]', reportDialogForm).on('click', function(){
      reportType.val('download');
    });

	});
});