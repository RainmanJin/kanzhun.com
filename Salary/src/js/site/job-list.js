require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});
require([''], function(){
  $(function(){
    var cid;
    var list = $('ul.search-ret');
    list.on('click', '.more-ret', function(){
      var $this = $(this);
      var id = $this.data('cid');

      if(id){
        cid = id;
      }

      $.ajax({
        url: '/activity/bsalary/joblist/more.json',
        type: 'get',
        data: {
          page: $this.data('page'),
          id: cid
        },
        beforeSend: function(){
          $this.hide();
        },
        dataType: 'json',
        success: function(ret){
          if(ret && ret.rescode == 1){
            $this.remove();
            list.append(ret.html);
          }else{
            $this.show();
          }
        },
        error: function(){
          $this.show();
        }
      });
    });
  });
});