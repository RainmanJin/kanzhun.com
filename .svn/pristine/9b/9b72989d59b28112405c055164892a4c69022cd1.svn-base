$(function(){
  //auto complete
  $('input[name=q]').autocomplete({
    serviceUrl: '/autocomplete/searchkey.json',
    paramName: 'query',
    dataType: 'json',
    maxHeight: 'auto',
    params: function (query) {
      return {
        query: query,
        type: 1
      };
    },
    autoSelectFirst: true,
    onSelect: function (suggestion) {
      setTimeout(function(){
        $('#mapSearchQuery').trigger('click');
      }, 300);
    }
  });


  // 百度地图API功能
  var map = new BMap.Map("allmap");

  //缩放
  var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角仅包含平移和缩放按钮
  map.addControl(top_right_navigation);

  var err = $('div.map-err'),
    errTimer,
    me, //我的位置
    older, //保存我的位置
    newPointerMarker; //新中心点的marker

  function showMapErr(msg){
    window.clearTimeout(errTimer);
    err.html('<p>' + msg + '</p>').show();

    errTimer = setTimeout(function(){
      err.hide();
    },3000)
  }

  err.html('正在获取您的当前位置...').show();

//  function showPosition(position){
//    err.hide();
//    myLng = position.coords.longitude;
//    myLat = position.coords.latitude;
//
//    var pt = new BMap.Point(myLng, myLat);
//    var myIcon = new BMap.Icon("/images/weixin/me.png", new BMap.Size(90,100));
//    var marker = new BMap.Marker(pt, {icon:myIcon});  // 创建标注
//    map.centerAndZoom(pt, 18);
//    map.addOverlay(marker);
//
////    $('#mapSearchQuery').trigger('click');
//  }

//  function showError(error){
//    switch(error.code){
//      case error.PERMISSION_DENIED:
//        showMapErr('请允许浏览器访问您的位置！');
//        break;
//      case error.POSITION_UNAVAILABLE:
//        showMapErr('当前位置不可用！');
//        break;
//      case error.TIMEOUT:
//        showMapErr('请求超时！');
//        break;
//      case error.UNKNOWN_ERROR:
//        showMapErr('未知错误！');
//        break;
//    }
//  }
//  if (navigator.geolocation){
//    navigator.geolocation.getCurrentPosition(showPosition,showError);
//  }else{
//    showMapErr('当前浏览器不支持访问您的位置！');
//  }

  //获取用户当前位置
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      err.hide();

      older = me = r.point;
//      myLng = me.lng;
//      myLat = me.lat;


      var myIcon = new BMap.Icon("/images/weixin/me.png",  new BMap.Size(90,100));
      myIcon.setImageSize({width:90, height:100});
      var marker = new BMap.Marker(me, {icon:myIcon});  // 创建标注
      map.centerAndZoom(me, 14);
      map.panTo(me);
      map.addOverlay(marker);


      $('#mapSearchQuery').trigger('click');
    }
    else {
      showMapErr('请求当前位置失败，请刷新页面重试！');
    }
  },{enableHighAccuracy: true})


  //显示气泡详情
  var currentSearchRet = [],
    currentSearchMarkers = [],
    currentSearchStore = {},
    showDeatailTip = function(){
      //展开气泡详情时 不发请求
//      map.isPlainMoving = false;

      var id = this.cid;
      if(id){
        var data = currentSearchStore[this.cid];
        if($.isEmptyObject(data)){
          return false;
        }
        var rating = data.ratingAverage || 0;
        var sContent =
          '<a href="/job/'+ id +'.html"  target="_blank"><dl class="map-dialog"><dt><span>'+ data.title +'</span> '+ data.salary +'</dt>' +
          '<dd><figure><img src="http://img.kanzhun.com'+ data.logo +'"><p>'+ Math.floor(data.distance) +'m</p></figure>' +
          '<div><strong>'+ data.companyName +'</strong>' +
          '<p><span class="grade_star"><i class="s_'+ Math.floor(rating) +'"></i></span>'+ rating  +'分</p>' +
          '<p>'+ (data.reviewCount || 0) +'条点评 | '+ (data.jobCount || 0) +'个职位</p>' +
          '<p>'+ (data.addr || '') +'</p></div></dd></dl></a>';
        var infoWindow = new BMap.InfoWindow(sContent, {enableMessage:false, width: 270});
        this.openInfoWindow(infoWindow);
      }
    };


  //加载气泡

  var showMarkers = function(newCenter, initCenter){
    var q = $('input[name=q]').val();
    var data = $.extend({
      ulng: me.lng,
      ulat: me.lat,
      q: q,
      limit: 200
    }, newCenter);

    $.each(currentSearchMarkers, function(i, v){
      map.removeOverlay(v);
      v = null;
    });
    currentSearchRet = [];
    currentSearchMarkers = [];
    currentSearchStore = {};

    $.ajax({
      url: '/wx/loadJob.json',
      type: 'get',
      data: data,
      dataType: 'json',
      success: function(data){
        if(data && data.result){
          if(data.result.length === 0){
            showMapErr('在附近没有找到匹配的职位');
            return;
          }
          $.each(data.result||[], function(i, v){

            //去重
            var pt = new BMap.Point(v.lng, v.lat);
            var myIcon = new BMap.Icon("/images/weixin/m_point.png", new BMap.Size(22,33));
            myIcon.setImageSize({width:22, height:33});
            var marker = new BMap.Marker(pt, {icon:myIcon});  // 创建标注
            map.addOverlay(marker);
            currentSearchRet.push(pt);
            currentSearchMarkers.push(marker);

            marker.cid = v.id;
            currentSearchStore[v.id] = v;

            marker.addEventListener("click", function(){
              showDeatailTip.call(this);
            });
          });


          if(initCenter){
            map.setViewport(currentSearchRet);
          }
        }else{
          showMapErr('在附近没有找到匹配的职位');
        }
      }
    });
  }


  //搜索
  $('#mapSearchQuery').click(function(){

    showMarkers({
      lng: me.lng,
      lat: me.lat
    }, true);
  });

  var dragged = function(){
    var ll = map.getCenter();

    showMarkers({
      lng: ll.lng,
      lat: ll.lat
    });

    map.removeEventListener('moveend', dragged);
  }


  map.addEventListener('dragstart', function(){
    map.addEventListener('moveend', dragged);
  });

  //回到我的位置
  $('aside.origin').on('click', function(){
    me = older;
    map.panTo(me);
    map.removeOverlay(newPointerMarker);
    showMarkers({
      lng: me.lng,
      lat: me.lat
    });
  });

  //设置新的中心点
  $('aside.new-pointer').on('click', function(){
    map.removeOverlay(newPointerMarker);
    var v = map.getCenter();
    var pt = new BMap.Point(v.lng, v.lat);
    var myIcon = new BMap.Icon("/images/weixin/center.png", new BMap.Size(110,105));
    myIcon.setImageSize({width:110, height:105});
    newPointerMarker = new BMap.Marker(pt, {icon:myIcon});  // 创建标注
    map.addOverlay(newPointerMarker);

    me = pt;
  });

  setTimeout(function(){
    $('aside.new-pointer>p').hide();
  },4000);


  document.querySelector('header.page_hd a.top_back').onclick = function(e){
    e.stopPropagation();
    if(document.referrer.indexOf("/city")>0) {
      history.go(-3);
    }
    else {
      if(document.referrer.length>0){
        history.back();
      }else{
        location.href="/";
      }
    }
  };
});