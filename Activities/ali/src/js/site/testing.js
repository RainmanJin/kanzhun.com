require.config({
  paths: {
    u: '../utils'
  }
});

require(['module/answer'], function(){
  var answer = require('module/answer');
  answer({
    questions: $('#testing'),
    prev: $('a.prev'),
    answers: 'button',
    //ul为500%的宽度，相对ul每个li为16%宽度,左右margin为1%，得出每次移动距离为17%
    ratio: 0.17,
    items: 'li',
    selectCallback: function(index){
      $('div.test-tip em').html(index + '/5');
    },
    submit: function(){
      $('#testForm').submit();
    }
  });
});