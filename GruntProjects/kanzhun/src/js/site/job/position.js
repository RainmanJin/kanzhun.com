require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
    }
});

require(['c/user_response', 'c/auth_dialog', 'c/job/po_common', 'company/salary_desc'],function(user_response, auth_dialog){
  $(function(){

    /*代码开始的地方*/

    //有用没用
    $('#reviewPage').upOrDown({
      url: CONTEXTPATH + '/interview/',
      delegate: 'a.mark',
      data: function () {
        return {
          interviewId: this.data('sid')
        };
      }
    });

    //分享
    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share',
      config: function(){
        $('#shareTextHid').val('有人点评了【'+ $('#companyName').html() +'】，说这里“'+ $(this).data('desc') +'”，快来看看吧！http://'+ window.location.host + $(this).data('url') +' #看准网#@看准 ');
      }
    });
/*
    $('#interviewPage').upOrDown({
      url: CONTEXTPATH + '/interview/',
      delegate: 'a.mark',
      data: function () {
        return {
          interviewId: this.data('sid')
        };
      }
    });*/

    //编辑岗位弹窗
    var pid = $('#pid').val(),
        positionDutyHid = $('#positionDutyHid').val();
    $('#js-edit, #js-upload').click(function(){
      $.maskUI.open({
        id: 'j_responsibily',
        content: '<h1>编辑岗位职责</h1><div><textarea class="js-duty" name="" placeholder="请输入#' + jobTitle + '#的岗位职责">' + positionDutyHid + '</textarea></div><p class="t-center"><a class="btn_o_s mr25" id="revision" href="javascript:;">提交修改</a><a class="btn_grey_s maskui_close" href="javascript:;">取消</a></p>'
      });

      $('#revision').click(function(){
        var duty = $('textarea.js-duty').val();
        if(duty == ""){
          $('textarea.js-duty').addClass('err');
         // console.log(1);
        }else {
          $.ajax({
            url: CONTEXTPATH + '/jobs/' + pid + '/dutysave.json?duty=' + duty,
            type: 'post',
            dataType: 'json',
            success:function(data){
              if(data.rescode == 1){
                $.maskUI.open({
                  id: 'succ_responsibily',
                  content: '<h1>编辑岗位职责</h1><div><h3 class="t-center f_16"><i class="suc_p middle"></i>提交成功！感谢您的参与</h3><p class="mt15">您发布的信息正在审核中，只有审核通过后才能被选用。</p></div><p class="t-center"><a class="btn_o_s maskui_close" href="">确定</a></p>'
                });
              }
            }
          })
        }
      });
    });

      //展开收起
      $('span.more').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        var details = $(this).prev('span.more_details');
        if(details.length){
          if(details.is(':hidden')) {
            $(this).html('[<i>收起</i>]');
            details.show();
          } else {
            $(this).html('... [<i>展开</i>]');
            details.hide();
          }
        }
      });

      //添加技能
      $('a.addskill').on('click', function(){
        if($(this).next('p').is(':hidden')) {
          $(this).next('p').show();
        }
      })

      $('#js-submitskill').on('click', 'a.btn_o_l', function(){
        var addipt = $(this).prev('input'),
            skillcon = addipt.val(),
            skills = $('span.skill'),
            submitskill=$('#js-submitskill'),
            flag = true;
        if(skillcon == '') {
          $('p.js-err').text('请输入职位专长');
          flag = false;
          return;
        };

        var reg=/^([\u4E00-\u9FA5]|[0-9a-zA-Z])+$/g;
        if(!reg.test(skillcon)){
          $('p.js-err').text('不能包含特殊字符');
          return;
        }
        if((10 - skillcon.length) < 0 ) {
          $('p.js-err').text('最多输入10个字');
          addipt.val('');
          flag = false;
          return;
        }

        $.each(skills, function(index, val) {
           if(val.innerText == skillcon) {
              $('p.js-err').text('该专长已存在，请重新输入。');
              addipt.val('');
              flag = false;
           }
        });

        if(flag) {
          $.ajax({
            url: CONTEXTPATH + '/jobs/' + pid + '/skillsave.json?skillName=' + skillcon,
            type: 'get',
            dataType: 'json',
            success:function(data){
              if(data.rescode == 1){
                $('dd.expertise').prepend('<span class="skill" data-id=' + data.id + '><b></b><em class="hasclose">'+ skillcon +'</em><i></i></span>');
                var onewidth = $('span.skill:eq(0)').width();
                $('span.skill:eq(0)').width(0);
                $('span.skill:eq(0)').css('opacity','0');

                $('span.skill:eq(0)').animate({
                  width: onewidth
                }, 300);
                $('span.skill:eq(0)').animate({
                  opacity: 1
                }, 300);
                addipt.val('');
                submitskill.hide();
              }else{
                $('p.js-err').text(data.resmsg);
              }
            }
          })
        }
      }).on('focus','input',function(){
         $('p.js-err').text('');
      });

      $('dd.expertise').on('click', 'span.skill i', function(){
        var ob_delete = $(this).parent('span.skill');
        $.ajax({
          url: CONTEXTPATH + '/jobs/' + pid + '/skilldelete.json?skillId=' + ob_delete.data('id'),
          type: 'get',
          dataType: 'json',
          success:function(data){
            if(data.rescode == 1){
              ob_delete.animate({
                opacity: 0
              }, 300, function() {
                $(this).remove();
              })
            }
          }
        })
      })

      //工资图标
      var salaryDesc = require('company/salary_desc');
      salaryDesc({
        table: $('#salaryDescTable')
      });

      //饼图-学历
      var dSeryData = [];
      $.each(jobDegree,function(i,v){
        dSeryData.push([v.counterItem.name, v.percentage]);
      });

      $('#js-c-pie').highcharts({
        chart: {
//          plotBackgroundColor: null,
//          plotBorderWidth: null,
          plotShadow: false
        },
        colors:[
          '#93d640',//第一个颜色
          '#9dce41',//第二个颜色
          '#bae25e',//第三个颜色
          '#9ed544', //。。。。
          '#c3f079',
          '#aee15e',   
          '#75bc32', 
          '#89c53b'
        ],
        title:{
          text:''
        },
        tooltip: {
          formatter: function(index) {      
               return  this.point.name + '<br>占' + this.point.y + '%';  
          }  
        },
        plotOptions: {
          pie: {
            size: '80%',
            center: [null, 65],
            borderWidth: 1,
            borderColor: '#fff',
            dataLabels: {
              enabled: false 
            },
            /*allowPointSelect: true,*/
            showInLegend: true,
            states: {
                hover: {
                    halo: {
                      size: 10,
                      opacity: 0.5
                    }
                }
            }
          }
        },
        legend: {
          floating: true,
          padding: 0,
          margin: 0,
          symbolHeight: 10,
          symbolWidth: 10,
          symbolRadius: 10,
          maxHeight: 110,
          itemStyle: {
            color: '#343434',
            fontWeight: 'normal'
          },
          align: 'center',
          //itemWidth: 100,
          labelFormatter: function () {
            return this.name/* + '-' + this.y + '%'*/;//在名称后面追加百分比数据
          },
          y:-20 //饼图距离说明文字的距离
        },
        series: [{
            type: 'pie',
            name: null,
            data: dSeryData 
        }],
        credits: {
          enabled: false //隐藏highcharts标识
        }
      })

      //工作经历
      var jSeryData = [];
      $.each(jobExperience,function(i,v){
        jSeryData.push([v.counterItem.name, v.percentage]);
      });

      $('#js-c-piejob').highcharts({
        chart: {
//          plotBackgroundColor: null,
//          plotBorderWidth: null,
          plotShadow: false
        },
        colors:[
          '#147cde',//第一个颜色
          '#0870c9',//第二个颜色
          '#16b6cc',//第三个颜色
          '#0ca6f0', //。。。。
          '#05c1f1',
          '#4c98c2',   
          '#a7dbff'
        ],
        title:{
          text:''
        },
        tooltip: {
          formatter: function(index) {      
               return  this.point.name + '<br>占' + this.point.y + '%';  
          }  
        },
        plotOptions: {
          pie: {
            size: '80%',
            center: [null, 65],
            borderWidth: 1,
            borderColor: '#fff',
            dataLabels: {
              enabled: false 
            },
            /*allowPointSelect: true,*/
            showInLegend: true,
            states: {
                hover: {
                    halo: {
                      size: 10,
                      opacity: 0.5
                    }
                }
            }
          }
        },
        legend: {
          floating: true,
          padding: 0,
          margin: 0,
          symbolHeight: 10,
          symbolWidth: 10,
          symbolRadius: 10,
          maxHeight: 110,
          itemStyle: {
            color: '#343434',
            fontWeight: 'normal'
          },
          itemWidth: 100,
          align: 'center',
          labelFormatter: function () {
            return this.name/* + '-' + this.y + '%'*/;//在名称后面追加百分比数据
          },
          y: -2 //饼图距离说明文字的距离
        },
        series: [{
            type: 'pie',
            name: null,
            data: jSeryData 
        }],
        credits: {
          enabled: false //隐藏highcharts标识
        }
      })

      //工资
      var sSeryData = [];
      $.each(jobSalary,function(i,v){
        sSeryData.push([v.counterItem.name, v.percentage]);
      });

      $('#js-c-piesalary').highcharts({
        chart: {
//          plotBackgroundColor: null,
//          plotBorderWidth: null,
          plotShadow: false
        },
        colors:[
         '#f16822',//第一个颜色
         '#f68121',//第二个颜色
         '#f6981a',//第三个颜色
         '#f8ae1b', //。。。。
         '#f7dd17',
         '#f7dd17',   
         '#f55727'
       ],
        title:{
          text:''
        },
        tooltip: {
          formatter: function(index) {      
               return  this.point.name + '<br>占' + this.point.y + '%';  
          }  
        },
        plotOptions: {
          pie: {
            size: '80%',
            center: [null, 65],
            borderWidth: 1,
            borderColor: '#fff',
            dataLabels: {
              enabled: false 
            },
            /*allowPointSelect: true,*/
            showInLegend: true,
            states: {
                hover: {
                    halo: {
                      size: 10,
                      opacity: 0.5
                    }
                }
            }
          }
        },
        legend: {
          floating: true,
          padding: 0,
          margin: 0,
          symbolHeight: 10,
          symbolWidth: 10,
          symbolRadius: 10,
          maxHeight: 110,
          itemStyle: {
            color: '#343434',
            fontWeight: 'normal'
          },
          //itemWidth: 100,
          align: 'center',
          labelFormatter: function () {
            return this.name/* + '-' + this.y + '%'*/;//在名称后面追加百分比数据
          },
          y:-20
        },
        series: [{
            type: 'pie',
            name: null,
            data: sSeryData 
        }],
        credits: {
          enabled: false //隐藏highcharts标识
        }
      })

    /*代码结束的地方*/

  })
})


