require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});
require(['u/autocomplete'], function(){

  $(function(){

    var addCoDialog = $('section.add-co');
    var slideMask= $('div.slide-mask');
    var coSuggest = $('#coSuggest');
    var com1 = $('input[name=com1]');
    var com2 = $('input[name=com2]');

    var showSlideDialog = function(){
      slideMask.show();
      addCoDialog.addClass('open');
    };

    var hideSlideDialog = function(){
      addCoDialog.removeClass('open');
      slideMask.hide();
      coSuggest.val('');
    };

    $('div.slide-mask, a.close').on('click', function(){
      hideSlideDialog();
    });


    $('#addJob').on('click', function(){
      showSlideDialog();

      $.ajax({
        type: 'get',
        url: '/activity/bcompany/job.json',
        data: {
          com1: com1.val(),
          com2: com2.val()
        },
        success: function(ret){
          if(ret && ret.rescode == 1){
            var html = '';
            $.each(ret.jobTitles, function(i, v){
              html += '<li data-val="'+ v +'">'+ i +'</li>'
            });

            $('#jobList').html(html);
          }
        }
      })
    });


  });

});