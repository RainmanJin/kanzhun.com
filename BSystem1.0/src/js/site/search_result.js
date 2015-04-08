require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets', 'u/paging'],function(){
 $(function(){
  $('div.np_pager').paging({
    staticUrl: true
  });
 })
});