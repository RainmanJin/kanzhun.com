require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components'
    }
});

require(['c/general', 'c/user_response', 'c/auth_dialog', 'c/widgets', 'c/mini_search', 'c/company_common'], function(gg, user_response){
	$(function(){
//		$.maskUI.config = {
//			wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
//			alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>'
//		};


   /* function showWbDialog(self){
      var html = '';
      var eid;
      if(typeof self === 'string'){
        eid = self;
      }else{
        $('a.wb span').removeClass('current');
        self.find("span").addClass("current");
        eid = self.data('eid');
      }


      $.ajax({
        type: 'GET',
        url: CONTEXTPATH + '/employee/'+ eid +'.json',
        data: {
          companyId: $('input[name=companyIdHid]').val()
        },
        dataType: 'json',
        beforeSend: function(){
          $.maskUI.open({
            content:  '<p class="loading"><img src="'+CONTEXTPATH+'/images/loading.gif" />加载中...</p>',
            overlayClick: true
          });
        },
        success: function(ret){
          if(ret){

            var p = ret.employeeWeiboProfile, b1 = ret.companyPlace1, b2 = ret.companyPlace2, a1 = ret.companyPlace4, a2= ret.companyPlace5, c = ret.companyPlace3,
              defImg = CONTEXTPATH+'/images/way_def.jpg';
            var pInfo="";
            $.each(p.companyInfoList, function(index, val) {
              if (val.id == c.id) {
                pInfo+='<span class="currentcmp">'+c.name+'</span>';
              }else{
                pInfo+='<span>'+val.name+'</span>';
              }
            });

            var links = function(o){
              var id = o.id;
              return ('target="'+ (id?'_blank':'_self') +'" href="' + (id ? '/gso'+ id + '.html' : 'javascript:;') + '" class="'+ (id?'':'prevent') +'" ');
            };

            html = '<dl class="d_share"><dt><p class="wb_protriat"><img src="'+p.headUrl+'" /><span></span></p><p class="micro_blog"><a href="'+p.weiboUrl+'" target="_blank" ka="div1-sina">访问微博</a></p></dt>'+
              '<dd><h4>'+p.nickname+(p.vCard?' <i class="vip"></i>':'')+'</h4><p><em class="'+ (p.gender=='男'?'male':'female') +'"></em>'+p.area+'</p>'+
              '<p>关注 <span>'+p.followCount+'</span> 粉丝 <span>'+p.fansCount+'</span>微博 <span>'+p.weiboCount+'</span></p>'+
              '<p>简介：<span>'+ (p.introduction || '暂无') +'</span></p>'+
              '<p>标签： <span class="blue">'+ (p.tags || '暂无') +'</span></p>'+
              (p.edus ? ('<p>教育信息：<span class="blue">'+p.edus +'</span></p>') : '') +
              '<p>职业信息：'+pInfo+
              '</p></dd></dl>'+

              '<div class="way_h"><table cellspacing="0"  cellpadding="0"><tr class="co">'+
              '<td class="first '+(b1?'':'nobg')+'">'+(b1?'<a '+links(b1)+' ka="div1-com1"><img src="'+STATICURL+(b1.logo||defImg)+'" /></a>':'&nbsp;')+'</td>'+
              '<td class="'+(b2?'':'nobg')+'">'+(b2?'<a '+links(b2)+'  ka="div1-com2"><img src="'+STATICURL+(b2.logo||defImg)+'" /></a>':'&nbsp;')+'</td>'+
              '<td class="mid"><a '+links(c)+'  ka="div1-com3"><img src="'+STATICURL+(c.logo||defImg)+'" /></a></td>'+
              '<td class="'+(a1?'':'nobg')+'"  ka="div1-com4">'+(a1?'<a '+links(a1)+'><img src="'+STATICURL+(a1.logo||defImg)+'" /></a>':'&nbsp;')+'</td>'+
              '<td class="last '+(a2?'':'nobg')+'"  ka="div1-com5">'+(a2?'<a '+links(a2)+'><img src="'+STATICURL+(a2.logo||defImg)+'" /></a>':'&nbsp;')+'</td></tr><tr class="pic">'+

              '<td class="first">'+ (b1?'<p><a '+links(b1)+' ka="div1-com1-comname">'+b1.name+'</a><br>'+(b1.companyStatInfo?(b1.companyStatInfo.ratingAverage+'分<em>|</em>'+b1.companyStatInfo.totalCommentCount+'点评'):'暂无点评信息')+'</p>':'&nbsp;')+'</td>'+
              '<td>'+ (b2?'<p><a '+links(b2)+' ka="div1-com2-comname">'+b2.name+'</a><br>'+(b2.companyStatInfo?(b2.companyStatInfo.ratingAverage+'分<em>|</em>'+b2.companyStatInfo.totalCommentCount+'点评'):'暂无点评信息')+'</p>':'&nbsp;')+'</td>'+
              '<td>'+ (c?'<p><a '+links(c)+' ka="div1-com3-comname">'+c.name+'</a><br>'+(c.companyStatInfo?(c.companyStatInfo.ratingAverage+'分<em>|</em>'+c.companyStatInfo.totalCommentCount+'点评'):'暂无点评信息')+'</p>':'&nbsp;')+'</td>'+
              '<td>'+ (a1?'<p><a '+links(a1)+' ka="div1-com4-comname">'+a1.name+'</a><br>'+(a1.companyStatInfo?(a1.companyStatInfo.ratingAverage+'分<em>|</em>'+a1.companyStatInfo.totalCommentCount+'点评'):'暂无点评信息')+'</p>':'&nbsp;')+'</td>'+
              '<td class="last">'+ (a2?'<p><a '+links(a2)+' ka="div1-com5-comname">'+a2.name+'</a><br>'+(a2.companyStatInfo?(a2.companyStatInfo.ratingAverage+'分<em>|</em>'+a2.companyStatInfo.totalCommentCount+'点评'):'暂无点评信息')+'</p>':'&nbsp;')+'</td></tr></table></div>';
            $.maskUI.open({
              content: html,
              overlayClick: true
            });
          }
        }
      });
    }*/

   /* //从公司页面点击员工进来的 直接弹出dialog
    var initWbVal = $('#initEDialog').val();
    if(parseInt(initWbVal) > 0){
      showWbDialog(initWbVal)
    }

		$('#employeeWbShow').on('click', 'a.wb', function(e){
			e.preventDefault();
      showWbDialog($(this));

		}).on('click', 'a.wbname', function(){
			var wb = $(this).parent().parent().find('a.wb');
			if(wb.length === 0){
				wb = $(this).parent().parent().parent().find('a.wb');
			}
			wb.trigger('click');
		});*/

		$('#employeeWbMore').on('click', function(){
			var self = $(this),
				page = parseInt(self.data('page'), 10);
			$.ajax({
				type: 'get',
				url: CONTEXTPATH + self.data('url') + page,
				dataType: 'json',
				beforeSend: function(){
					self.hide().prev('p').show();
				},
				success: function(ret){
					if(ret && ret.html){
						self.parent().before(ret.html);
						self.prev('p').hide();
						if(ret.more){
							self.show().data('page', ret.nextPage);
						}else{
							self.hide();
						}
					}
				},
				error: function(){
					self.show();
				}
			});
		});

    if($('ul.way').length > 0) {
      var obj = $('ul.way');
      var toplength = obj.offset().top;
      window.onscroll = function(){
        var scroH = $(this).scrollTop(); 
        //var toplength = document.documentElement.scrollTop || document.body.scrollTop; 
        if(scroH > toplength){
          obj.addClass('fixed');
        }else{
          obj.removeClass('fixed');
        }   
      };
    }

    //分享公司
    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share_co'
    });
	});
});