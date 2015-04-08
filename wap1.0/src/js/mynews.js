$('a.delete_all').click(function(){
    $.maskUI.config = {
        wrap: '<section class="maskui_dialog" id="{0}"><div class="dialog_con"><a href="javascript:;" class="dialog_close"></a>{1}</div></section>',
        confirm: '<h1>提示</h1><div class="dialog_ac">确定要清空消息吗?</div><ul class="news_btn"><li><a href="javascript:;" class="confirm_ok green">确定</a></li><li><a href="javascript:;" class="maskui_close">取消</a></li></ul></div>'
    }

	$.maskUI.confirm({
        id: 'news_pop',
        callback: function(){
            $.ajax({
                url : "/usercenter/message/clear.json",
                type : "get",
                dataType : "json",
                data : {},
                success : function(result) {
                    if (result.rescode == 0) {
                        window.location.href = "/usercenter/message/"
                    }
                    else {
                        return false;
                    }
                }
            });
        }
	});
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

$('#hotmore').click(function(){
    var $page = $(this);

    $.ajax({
        url : "/usercenter/message/more.json",
        type : "get",
        dataType : "json",
        data : {page: $page.data('page')},
        success : function(result) {
            $page.data('page', result.page + 1)
           $('div.news_wrap').append(result.html);
        }
    });
});

$(function(){
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
})