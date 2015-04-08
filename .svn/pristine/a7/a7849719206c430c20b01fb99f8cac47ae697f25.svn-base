require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});
require(['c/auth_dialog', 'c/widgets', 'u/upload_portrait', 'c/mini_search'], function(auth_dialog, widget, upload_portrait) {
	$(function() {
		//upload portrait
    upload_portrait({
        elems: $('#profilePortraitBtn'),
        portrait: $('#portrait'),
        show: $('#profilePortrait, #profilePortraitAlias')
    });

    //您的新消息
    $.ajax({
        url : "/usercenter/message/read.json",
        type : "get",
        dataType : "json",
        data : {},
        success : function(result) {
            /*if (result.rescode == 1) {
                window.location.href = "/usercenter/message/"
            }
            else {
                var html = '<h3>删除失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
                $.maskUI.open({
                    content: html
                });
            }*/
        }
    });

    $('a.delete_all').click(function(){
    	$.maskUI.confirm({
    		msg: '确定要清空消息吗?',
    		callback: function(){
    			$.ajax({
    				url : "/usercenter/message/clear.json",
    				type : "get",
    				dataType : "json",
    				data : {},
    				success : function(result) {
    					if (result.rescode == 1) {
    						window.location.href = "/usercenter/message/"
    					}
    					else {
    						var html = '<h3>删除失败</h3><p class="center_p"><i class="err_p"></i>'+ result.resmsg +'</p><p class="t-center"><a href="javascript:;" class="btn_grey_s maskuiclose">确定</a></p><p>&nbsp;</p>';
    						$.maskUI.open({
    							content: html
    						});
    					}
    				}
    			});
    		}
    	})
    });

    $('div.news_wrap').on('click', 'i.n_closenews', function(){
        var $messageId = $(this).data('mid'),
            $messageType = $(this).data('mtype'),
            $removeTarget = $(this).parent().parent();

        $.ajax({
            url : "/usercenter/message/remove.json",
            type : "get",
            dataType : "json",
            data : {removeId: $messageId, messageType: $messageType},
            success : function(result) {
                if (result.rescode == 1) {
                    $removeTarget.remove();
                }
                else {
                    return false;
                }
            }
        });
    });

	});
});