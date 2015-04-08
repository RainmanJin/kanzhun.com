define(function(){
  //share
    return function(o){
      window._bd_share_config = {
        "common": {
          "bdSnsKey": {},
          "bdMini": "2",
          "bdMiniList": false,
          "bdStyle": "1",
          "bdSize": "16",

          //设置分享的内容
          "onBeforeClick": function(cmd,config){
            return {
              "bdSnsKey": {},
              "bdText": o.shareText,
              "bdMini": "2",
              "bdMiniList": false,
              "bdPic": o.sharePic,
              "bdStyle": "1",
              "bdSize": "16"
            };
          }
        },
        "share": {
          "viewList": ["qzone", "tsina", "tqq", "renren", "weixin"],
          "viewText": "分享到：",
          "viewSize": "16"
        }
      };
      with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
    }
});