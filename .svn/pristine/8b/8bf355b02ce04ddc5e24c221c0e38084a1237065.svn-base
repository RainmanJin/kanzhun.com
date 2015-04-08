define(['comp/toggler/toggler', 'u/jquery-menu-aim'], function(){
  $(function(){
    //左侧行业领域
    //引用jquery-menu-aim
    $('ul.industry_field').menuAim({
      activate: function(row){
        $(row).addClass('current');
      },
      deactivate: function(row){
        $(row).removeClass('current');
      },
      rowSelector: '>li',
      exitMenu: function(){
        return true;
      }
    });

    //左侧二级展开收起
    var toggler = require('comp/toggler/toggler');
    var searchLeftOptions = $('dl.plr_twenty');
    toggler({
      el: $('div.see_more div.C-toggler'),
      on: function(){
        this.parent().siblings('.s-opts-more').show();
      },
      off: function(){
        this.parent().siblings('.s-opts-more').hide();
      }
    });

    //左侧一级展开收起
    toggler({
      el: $('dt div.C-toggler', searchLeftOptions),
      text: false,
      on: function(){
        this.parent().next('dd').removeClass('none');
      },
      off: function(){
        this.parent().next('dd').addClass('none');
      }
    });

    //按字母选城市
    var searchOptsCities = $('ul.search-opts-cities');
    $('ul.first_letter').on('click', 'li', function(){
      searchOptsCities.find('li').eq($(this).addClass('current').siblings('li').removeClass('current').end().index()).show().siblings('li').hide();
    });
  });
});