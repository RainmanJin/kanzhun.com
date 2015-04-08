$(function(){
  $('a').each(function(i, v){
    var url = v.getAttribute('href');
    if(url && url !== '#' && url !=='javascript:;'){
      var u = new window.upp(url);
      u.add('i_s_t', 'gzyouths');
      v.setAttribute('href', u.url());
      v.setAttribute('target', '_self');
    }
  });

  $('form').each(function(i, v){
    var hid = document.createElement('input');
    hid.name = 'i_s_t';
    hid.value = 'gzyouths';
    hid.type = 'hidden';
    v.appendChild(hid);
  });
});