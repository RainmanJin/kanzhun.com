require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});


require(['c/widgets', 'c/auth_dialog', 'c/job_searcher', 'c/mini_search'], function(widget, auth_dialog, jobSearcher){
    $(function(){

        var jobSerDialog = $('#jobSerDialog');
        $('#createJobSer').on('click', function(e){
            e.preventDefault();

            //is logged
            if(auth_dialog.isLogged()){
                if(jobSerDialog.length){
                    $.maskUI.open({
                        elem: jobSerDialog,
                        pos: 'absolute'
                    });

                    $('input:text.v', jobSerDialog).placeholderS();
                }else{

                }

            }else{
                auth_dialog.open('#login');
            }

        });
        jobSearcher.init();


      $('#miniSearchSlTile').DIYSelect({
        listSelector: 'dd a',
        listCallback: function (list, field, target) {
          $('#minisearchForm').attr('action', $(this).attr('href'));
        }
      });

    });

});