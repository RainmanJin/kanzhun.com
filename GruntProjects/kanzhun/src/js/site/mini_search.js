define(['c/widgets'], function () {
  $(function () {
    var MSSFloor = $('#MSSFloor'),
      MSSFloorFixed = $('#MSSFloorFixed'),
      MSSQType = $('#MSSQType'),
      autocompleteParams = {
        serviceUrl: CONTEXTPATH + '/autocomplete/searchkey.json',
        paramName: 'query',
        width: 463,
        params: function (query) {
          return {
            query: query,
            type: MSSQType.val()
          };
        },
        dataType: 'json',
        transformResult: function (response) {
          return {
            suggestions: $.map(response.suggestions, function (dataItem) {
              return { value: dataItem.value, type: dataItem.type};
            })
          };
        },

        customHTML: function (suggestions, className, formatResult, value) {
          var html = [],
            co = [],
            job = [],
            type;
          $.each(suggestions || [], function (i, suggestion) {
            if(i === 0){type = suggestion.type;}
            if (suggestion.type == '1') {
              co.push('<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>');
            } else {
              job.push('<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value) + '</div>');
            }
          });

          if (job.length) {
            /*if (co.length) {
             html.push('<dt>公司</dt><dd>' + co.join('') + '</dd>');
             }*/

            var op = type == 0 ? 'unshift' : 'push';
            if(op == 'unshift') {
              html[op]('<dt>职位</dt><dd>' + job.join('') + '</dd>');

              if (co.length) {
                html.push('<dt class="bd">公司</dt><dd class="bd">' + co.join('') + '</dd>');
              }
            }else {
              html[op]('<dt class="bd">职位</dt><dd class="bd">' + job.join('') + '</dd>');

              if (co.length) {
                html.unshift('<dt>公司</dt><dd>' + co.join('') + '</dd>');
              }
            }

          }else{
            //搜索公司时 不需要分类显示
            if (co.length) {
              html = [];
              html.push(co.join(''));

              return html.join('');
            }
          }

          if (html.length === 0) {
            return ''
          } else {
            return '<dl>'+ html.join('') +'</dl>';
          }

        },
//        autoSelectFirst: true,
        onSelect: function (suggestion) {
          var form = $(this).closest('form');
          $('input[name=stype]', form).val(suggestion.type);
          form.submit();
        }
      };

    MSSFloor.placeholderS();
    MSSFloorFixed.placeholderS();

    MSSFloor.autocomplete(autocompleteParams);
    MSSFloorFixed.autocomplete($.extend({}, autocompleteParams, {
      appendTo: MSSFloorFixed.parent(),
      width: 462
    }));

    //固定公司导航
    var topSearchFixed = $('#topSearchFixed');
    if(topSearchFixed.length){
      var f_n_s = setTimeout(function(){
        var navPos = $('#topSearchOriginal').offset().top + 300;
        $(window).on('scroll', function(){
          var st = $(document).scrollTop();
          if(st > navPos){
            topSearchFixed.fadeIn();
          }else{
            topSearchFixed.fadeOut();
          }
        });
      }, 200);
    }

    //老式placeholder
    $('input').placeholderFocus();
  });
});