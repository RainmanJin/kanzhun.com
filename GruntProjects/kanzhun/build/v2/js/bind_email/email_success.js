require.config({baseUrl:"/js/site",paths:{u:"../utils",c:".",comp:"../../components"}}),require(["c/widgets"],function(){$(function(){var e=$("#countdown"),t=5;setInterval(function(){t==1?$("body").data("isopener")=="1"?(window.opener.thirdpartyCallback(),window.opener=null,window.close()):window.location.href=e.data("redirect"):(t--,e.html(t))},1e3)})});