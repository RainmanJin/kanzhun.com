$(function(){
    //关注的公司
    $('#more_result').on('click', 'a.btn_hasfocus, a.btn_focus', function(e){
        var self = $(this), cid = self.data('cid');
        if(cid){
            if(self.hasClass('btn_hasfocus')){
                $.getJSON('/company/unfocus.json?companyId='+ cid, function(ret){
                    if(ret && ret.rescode == 1){
                        self.attr('class', 'btn_focus').html('+关注');
                    }else{
                        alert('取消关注失败！');
                    }
                });
            }else if(self.hasClass('btn_focus')){
                $.getJSON('/company/dofocus.json?companyId='+ cid, function(ret){
                    if(ret && ret.rescode == 1){
                        self.attr('class', 'btn_hasfocus').html('已关注');
                        //self.attr('class', 'btn_hasfocus').html('<i class="i i_focus"></i>已关注');//去掉对勾
                    }else{
                        alert('关注失败！');
                    }
                });
            }
            
        }
    });

    //收藏的职位
    $('#more_result').on('click', 'a.btn_hasfocus, a.btn_focus', function(e){
        var self = $(this), jid = self.data('jid');
        if(jid){
            if(self.hasClass('btn_hasfocus')){
                $.getJSON('/jobtitle/unfocus.json?jobId='+ jid, function(ret){
                    if(ret && ret.rescode == 1){
                        self.attr('class', 'btn_focus').html('<i class="i i_hascollection"></i>+收藏');
                    }else{
                        alert('取消关注失败！');
                    }
                });
            }else if(self.hasClass('btn_focus')){
                $.getJSON('/jobtitle/dofocus.json?jobId='+ jid, function(ret){
                    if(ret && ret.rescode == 1){
                        self.attr('class', 'btn_hasfocus').html('<i class="i i_collection"></i>已收藏');
                    }else{
                        alert('关注失败！');
                    }
                });
            }
            
        }
    });

    //我发布的内容
    //delete
    var token = $('input[name=tl_token]').val();
    $('dl.timeline').on('click', 'a.subs_del', function(e){
        e.preventDefault();
        var self = $(this);
        $.getJSON('/usercenter/content/delete.json?token='+ token +'&id=' + self.data('indexid'), function(ret){
            if(ret){
                if(ret.rescode == 1){
                    var wrap = self.parents('dd').eq(0);
                    wrap.prev('dt').remove();
                    wrap.remove();
                }else{
                    alert(ret.resmsg);
                }
            }else{
                alert('删除失败！');
            }
        });

    //不再显示
    }).on('click', 'a.nomore', function(e){
        e.preventDefault();
        var self = $(this);
        $.getJSON('/usercenter/content/index/delete.json?token='+ token +'&id=' + self.data('indexid'), function(ret){
            if(ret){
                if(ret.rescode == 1){
                    var wrap = self.parents('dd').eq(0);
                    wrap.prev('dt').remove();
                    wrap.remove();
                }else{
                    alert(ret.resmsg);
                }
            }else{
                alert('设置失败！');
            }
        });
    });

    //订阅删除
    $('#mySubscriptions').on('click', 'a.del_sbs', function(){
        var self = $(this);
        $.post('/usercenter/jobsearcher/delete.json?token='+ $('input[name=token]').val() +'&id='+ self.data('searcher-id'), function(ret){
            if(ret && ret.rescode == 1){
                self.parents('div.fb_list').eq(0).remove();
            }else{
                alert('删除失败！');
            }
        });
    });
    

});













