/*!
	Autosize 1.18.17
	license: MIT
	http://www.jacklmoore.com/autosize
*/

(function(e){typeof define=="function"&&define.amd?define("comp/textarea/jquery.autosize",e):e()})(function(){(function(e){var t={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},n='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',r=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent","whiteSpace"],i,s=e(n).data("autosize",!0)[0];s.style.lineHeight="99px",e(s).css("lineHeight")==="99px"&&r.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(n){return this.length?(n=e.extend({},t,n||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function v(){var n,r=window.getComputedStyle?window.getComputedStyle(t,null):null;r?(n=parseFloat(r.width),(r.boxSizing==="border-box"||r.webkitBoxSizing==="border-box"||r.mozBoxSizing==="border-box")&&e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,t){n-=parseFloat(r[t])})):n=o.width(),s.style.width=Math.max(n,0)+"px"}function m(){var a={};i=t,s.className=n.className,s.id=n.id,u=parseFloat(o.css("maxHeight")),e.each(r,function(e,t){a[t]=o.css(t)}),e(s).css(a).attr("wrap",o.attr("wrap")),v();if(window.chrome){var f=t.style.width;t.style.width="0px";var l=t.offsetWidth;t.style.width=f}}function g(){var e,r;i!==t?m():v(),!t.value&&n.placeholder?s.value=o.attr("placeholder")||"":s.value=t.value,s.value+=n.append||"",s.style.overflowY=t.style.overflowY,r=parseFloat(t.style.height)||0,s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,u&&e>u?(t.style.overflowY="scroll",e=u):(t.style.overflowY="hidden",e<a&&(e=a)),e+=f,Math.abs(r-e)>.01&&(t.style.height=e+"px",s.className=s.className,l&&n.callback.call(t,t),o.trigger("autosize.resized"))}function y(){clearTimeout(h),h=setTimeout(function(){var e=o.width();e!==p&&(p=e,g())},parseInt(n.resizeDelay,10))}var t=this,o=e(t),u,a,f=0,l=e.isFunction(n.callback),c={height:t.style.height,overflow:t.style.overflow,overflowY:t.style.overflowY,wordWrap:t.style.wordWrap,resize:t.style.resize},h,p=o.width(),d=o.css("resize");if(o.data("autosize"))return;o.data("autosize",!0);if(o.css("box-sizing")==="border-box"||o.css("-moz-box-sizing")==="border-box"||o.css("-webkit-box-sizing")==="border-box")f=o.outerHeight()-o.height();a=Math.max(parseFloat(o.css("minHeight"))-f||0,o.height()),o.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),d==="vertical"?o.css("resize","none"):d==="both"&&o.css("resize","horizontal"),"onpropertychange"in t?"oninput"in t?o.on("input.autosize keyup.autosize",g):o.on("propertychange.autosize",function(){event.propertyName==="value"&&g()}):o.on("input.autosize",g),n.resizeDelay!==!1&&e(window).on("resize.autosize",y),o.on("autosize.resize",g),o.on("autosize.resizeIncludeStyle",function(){i=null,g()}),o.on("autosize.destroy",function(){i=null,clearTimeout(h),e(window).off("resize",y),o.off("autosize").off(".autosize").css(c).removeData("autosize")}),g()})):this}})(jQuery||$)}),define("v2/ugc/ugc_common",["c/widgets","u/validator","comp/textarea/jquery.autosize"],function(){$.fn.extend({rating:function(e,t,n,r){this.each(function(i,s){var o=$(s);o.on("mouseenter","a",function(){var t=parseInt(o.find("a").index(this)+1,10),r="";o.hasClass("done")&&(r="done "),o.attr("class",r+e+t),n&&n(this)}).on("mouseleave",function(){var t=o.data("ind");o.hasClass("done")?(o.attr("class","done "+e+t),n&&n(o.find("a").eq(t-1))):(o.removeClass(function(){return $(this).attr("class",e.split(" ")[0])}),r&&r(this))}).on("click","a",function(){var e=parseInt(o.find("a").index(this)+1,10);o.addClass("done").data("ind",e),t&&t.call(this,e)})})}})}),define("comp/toggler/toggler",[],function(){return function(e){var t=$.extend({},{el:"",classname:"active",text:["收起","展开"],on:null,off:null},e);t.el.length&&t.el.on("click",function(){var e=$(this);e.hasClass(t.classname)?(e.removeClass(t.classname),t.text&&e.html(t.text[1]+"<i></i>"),t.off&&t.off.call(e)):(e.addClass(t.classname),t.text&&e.html(t.text[0]+"<i></i>"),t.on&&t.on.call(e))})}}),require.config({paths:{u:"js/utils",c:"js/site",comp:"../../components",v2:"v2/js",highcharts:"http://s.kanzhun.com/js/utils/highcharts"}}),require(["c/auth_dialog","c/widgets","v2/ugc/ugc_common","comp/toggler/toggler"],function(e){$(function(){$("textarea.autosizejs").autosize();var e=require("comp/toggler/toggler");e({el:$("#showCoTagFilter"),on:function(){this.closest("dd").find("ul.tag").addClass("show-all")},off:function(){this.closest("dd").find("ul.tag").removeClass("show-all")}});var t=$("#step_1"),n=$("#step_2");$("#totalRating").rating("rating_star rating_s_",function(e){var n=$(this),r=n.parent().parent(),i=r.find("input[name=rating]");i.val(e),r.find("p.err").remove(),n.data("rated")||n.data("rated",!0),$(".detail_rating").removeClass("none"),$("#step_1_2").removeClass("none"),e>=3?$.each($('[node-type="init_radio"]',t),function(e,t){$(t).find("a:eq(0)").trigger("click")}):$.each($('[node-type="init_radio"]',t),function(e,t){$(t).find("a:eq(1)").trigger("click")})},function(e){$("#totalRating").next("em").html($(e).attr("title"))},function(e){$(e).next("em").html("")}),$("#moreRating span.rating_rect").rating("rating_rect rating_r_",function(){var e=$(this),t=e.parent().find("input:hidden");e.data("rated")||e.data("rated",!0),t.val(e.index())},function(e){$(e).parent("span").next("em").html($(e).attr("title"))},function(e){$(e).next("em").html("")}),$("#chooses").on("click","a",function(e){e.preventDefault();var t=$(this),n=t.parent().find("input:hidden");t.addClass("current").siblings().removeClass("current"),n.val(t.data("vl"))}),$("#ugcForm").on("click",".retract .ugc_h3",function(){$(this).parent().removeClass("retract").find(".step_content").show()});var r=function(e,t){var n=$(this),r=n.val();if(r.length<10)return t.err(n,"最少输入10个字！"),!1;if("maxLength"in document.createElement("textarea"))return t.succ(n),!0;var i=n.attr("maxlength");return i&&r.length>i?(t.err(n,"内容不要超过"+i+"字！"),!1):(t.succ(n),!0)};$("#ugcForm").validatorAll({elems:".v",prompt:{succ:function(e){e.parent().find("p.err").hide()},err:function(e,t){var n=e.parent().find("p.err");n.find("span").html(t||n.data("msg")).end().show()},normal:function(e){e.parent().find("p.err").hide()}},more:{title:function(e,t){return r.call(this,e,t)},pros:function(e,t){return r.call(this,e,t)},cons:function(e,t){return r.call(this,e,t)},advice:function(e,t){return r.call(this,e,t)}}}).init().submit(),$('textarea[data-type="countNum"]').on("keyup",function(){var e=$(this),t=$.trim(e.val()),n=t.length,r=e.parent().find(".ta_hint").find('[node-type="num"]');r.html(n)}),$(".js_radio").on("click","a",function(e){e.preventDefault();var r=$(this),i=r.parent().find("input:hidden");r.addClass("current").siblings().removeClass("current"),i.val(r.data("vl")),r.parent().hasClass("step_1_last")&&setTimeout(function(){$(".step_content",t).slideToggle(function(){t.addClass("retract"),n.removeClass("none"),$(".arrow_down").hide(),$(".arrow_end").show()})},300)})})}),define("ugc/ugc_review",function(){});