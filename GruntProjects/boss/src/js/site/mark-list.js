require.config({
  urlArgs: "v=1.0.1",
  baseUrl: '/js',
  paths: {
    jquery: 'utils/jquery-1.11.0.min',
    u: 'utils',
    s: 'site'
  }
});

require(['jquery', 's/widgets', 's/infoControl'], function($, widgets, infoControl){
  $(function(){
    infoControl.init({
      wrap: 'markList',
      context: 'dl',
      itemSelector: 'dd'
    });
  });
});



