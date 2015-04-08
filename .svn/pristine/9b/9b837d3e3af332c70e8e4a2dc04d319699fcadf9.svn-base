define(function(auth_dialog){
    $(function(){
        //融资信息
        $('a.financing_img').click(function(){
          $.ajax({
            url: CONTEXTPATH + '/company/publicview.json?companyId=' + $('#companyId').val(),
            type: 'get',
            dataType: 'json'
          })
          
          $(this).slideUp('fast').next('div').slideDown('slow');
        })
    });
});