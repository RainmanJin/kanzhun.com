$(function(){function a(a,b,c){$("body").append('<div class="mask" id="wxMask"><div class="transmitDialog" id="transmitDialog"><p>'+b+'</p><i class="arrows"></i></div></div>');var d=$("#wxMask"),e=$("#transmitDialog");return a&&a.on("click",function(a){a.preventDefault(),d.show(),e.show()}),d.on("click",function(){d.hide(),e.hide()}),c&&c(),{open:function(a){$("#transmitDialog>p").html(a),d.show(),e.show()},close:function(){d.hide(),e.hide()}}}!function(){return function(a){var b=$.extend({},{cfw:"",color:"#2582cf"},a),c=$('<b style="color:'+b.color+'">+1</b>');b.cfw.append(c),c.animate({top:-50,opacity:0,"font-size":"40px"},400,function(){c.remove()})}}(),function(){return function(a){var b=$.extend({},{cfw:"",color:"#e77200"},a),c=$('<b style="color:'+b.color+'">-1</b>');b.cfw.append(c),c.animate({top:-50,opacity:0,"font-size":"40px"},400,function(){c.remove()})}}();a($("#shareWx"),"分享出去");var b=$("#curPrizeId").val();$("#companyNameSuggest").autocomplete({containerClass:"autocomplete-suggestions cmp_select",serviceUrl:"/activity/jinpingmei/company.json?prizeId="+b,paramName:"q",dataType:"json",transformResult:function(a){return{suggestions:$.map(a.suggestions,function(a){var b=a.data.split("|");return{value:b[0],data:b[1],num:b[2],logo:a.logo,industry:a.industry,city:a.city}})}},onSelect:function(a){$("#encryptCompId").val(a.data),window.location.href="/activity/jinpingmei/company/"+a.data+"/?prizedId="+b}})});