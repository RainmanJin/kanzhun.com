define("comp/toggler/toggler",[],function(){return function(e){var t=$.extend({},{el:"",classname:"active",text:["收起","展开"],on:null,off:null},e);t.el.length&&t.el.on("click",function(){var e=$(this);e.hasClass(t.classname)?(e.removeClass(t.classname),t.text&&e.html(t.text[1]+"<i></i>"),t.off&&t.off.call(e)):(e.addClass(t.classname),t.text&&e.html(t.text[0]+"<i></i>"),t.on&&t.on.call(e))})}}),require.config({paths:{u:"js/utils",c:"js/site",comp:"../../components",highcharts:"http://s.kanzhun.com/js/utils/highcharts",v2:"v2/js"}}),require(["c/auth_dialog","u/validator","comp/toggler/toggler"],function(e){$(function(){var e=require("comp/toggler/toggler"),t=$("ul.salary-detail");e({el:$("div.salary-detail-tt div.C-toggler"),text:["添加公司明细","添加公司明细"],on:function(){t.show()},off:function(){t.hide()}}),$("dl.select").DIYSelect({listCallback:function(e,t,n){n.siblings("p.err").hide()}});var n=$("input:text",t),r=$("#sDetailErr"),i=$("#salaryBase"),s=$("#salaryTotal"),o=function(){var e=0,t=parseInt(s.val());n.not("[name=salaryPayBase]").each(function(t,n){var i=parseInt(n.value)||0;if(!/^(([1-9]\d*)|0)$/.test(i))return r.html("请输入正确的数额！").show(),!1;e+=i});var o=t-e;if(o<0){r.html("工资明细不能大于月薪,请重新输入。").show(),i.val("");return}r.hide(),i.val(o||0)};t.on("keyup","input:text",function(){var e=this.value.replace(/^0(?=\d+)|\D/g,"");$(this).val(e),o(e)}),s.on("keyup",function(){var e=this.value.replace(/^0(?=\d+)|\D/g,"");$(this).val(e),o(e)});var u=$("#ugcSalaryForm");u.validatorAll({elems:"input.v",prompt:{succ:function(e){$("p.err",e.removeClass("err active").closest("li")).html("").hide()},err:function(e,t){var n=$("p.err",e.removeClass("active").addClass("err").closest("li"));n.html("<i></i>"+(t||n.data("msg"))).show()},normal:function(e){$("p.err",e.removeClass("err").addClass("active").closest("li")).html("").hide()}}}).init().submit(function(){return $.trim(i.val())===""?!1:!0})})}),define("ugc/ugc-salary",function(){});