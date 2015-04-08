//this config just be used for r.js
requirejs.config({
  baseUrl: 'site',
  paths: {
      //jquery使用的是线上路径 这里就设置为
      jquery: 'empty:',

      //alias 这里和页面js的paths对应
      u: '../utils',
      c: '.'
  },
  urlArgs: "v=1.0.1",

  //absolute urls
  absUrl:{
      // 'jquery':'http://js.youxi.bdimg.com/js/jquery.min.js'
  }
});
