require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator'],function(){
 $(function(){

    //choose city autocomplete
    var searchSuggestCity = $('#js-expectCity'),
        hid = $('input[name="encryptCityCode"]');
    searchSuggestCity.autocomplete({
      serviceUrl: CONTEXTPATH + '/autocomplete/city.json',
      paramName: 'query',
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            return { value: dataItem.value, data: dataItem.data};
          })
        };
      },
      onSelect: function (suggestion) {
        hid.val(suggestion.data);
      },
      onSearchStart: function () {
        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
        hid.val('');
      },
      onInvalidateSelection: function () {
        hid.val('');
      },
      onSearchComplete: function (query, suggestions) {
        if (suggestions.length === 0) {
          hid.val('');
          return;
        }
        //auto select when only one result
        if (suggestions.length === 1) {
          hid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true
    });

    //下拉框
    var minVal, maxVal;
    $('dl.js-po_select').DIYSelect({
        listCallback: function(list, field, target){
            var hids = $('input:hidden', target);
            hids.val($(this).data('content-id'));
        }
    });

    $('dl.js-e_select').DIYSelect({
        listCallback: function(list, field, target){
          $(this).parent('dd').parent('dl').find('dt>input').val($(this).text());
          var hidss = $('input:hidden', target);
          minVal = $(this).data('content-id');
          hidss.val(minVal);

          if($(this).data('content-id') >= maxVal) {
            $('#eerr').show();
          }else {
            $('#eerr').hide();
          }
        }
    });

    $('dl.js-em_select').DIYSelect({
        listCallback: function(list, field, target){
          $(this).parent('dd').parent('dl').find('dt>input').val($(this).text());
            var hidsss = $('input:hidden', target);
            maxVal = $(this).data('content-id');
            hidsss.val(maxVal);
          
            if($(this).data('content-id') <= minVal) {
              $('#eerr').show();
            }else {
              $('#eerr').hide();
            }
        }
    });

    $('#js-searchfrm').validatorAll({
      elems: '#js-keyword',
      prompt: {
        succ: function(target, e){
            var err;
            if(target.attr('type') === 'hidden'){
                err = $('>span.err', target.parent().parent().parent());
              target.parent().parent().parent().removeClass('focus error');
            }else{
                err = $('>span.err', target.parent());
              target.removeClass('focus error');
            }
            err.hide();
        },
        err: function(target, msg, e){
            var err;
            if(target.attr('type') === 'hidden'){
                err = $('>span.err', target.parent().parent().parent());
              target.parent().parent().parent().removeClass('focus').addClass('error');
            }else{
                err = $('>span.err', target.parent());
              target.removeClass('focus').addClass('error');
            }
            err.html('<i class="base errormsg"></i> ' + (msg || err.data('msg'))).show();
        },
        normal: function(target, e){
            var err;
            if(target.attr('type') === 'hidden'){
                err = $('>span.err', target.parent().parent().parent());
              target.parent().parent().parent().removeClass('error').addClass('focus');
            }else{
                err = $('>span.err', target.parent());
              target.removeClass('error').addClass('focus');
            }
            err.hide();
        }
      }
    }).init().submit();

 })
});