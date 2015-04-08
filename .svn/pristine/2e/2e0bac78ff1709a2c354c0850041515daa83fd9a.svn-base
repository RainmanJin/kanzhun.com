require.config({
//  baseUrl: '/js',
  baseUrl: '/js',
  paths: {
    u: 'utils',
    c: 'site'
  }
});

require(['c/auth_dialog', 'u/doT.min', 'u/questionnaire', 'u/share'], function(undefined, doT){
  $(function(){

    if($('#quesListFlag').length) {
      //render
      $('#quesListFlag').after(doT.template(document.getElementById('template').text)(questionnaireJSON));


      $('#questionnaireFrom').questionnaire({
        items: 'dl',
        unchecked: function () {
          this.addClass('err');
          $(window).scrollTop(this.offset().top - 30);
        }
      });

    }

    if($('#retFlag').length){
      $('#retFlag').after(doT.template(document.getElementById('retTemplate').text)(investigationInfo));

      //share
      var share = require('u/share');
      share({
        shareText: $('#bdText').val(),
        sharePic: $('#bdPic').val()
      });
    }
  });
});