(function(){
  //index page
  var wrapper = document.querySelector('div.wrapper');
  if(wrapper){
    var img = new Image();
    img.src = '/images/activity/tt/index.png';
    img.onload = img.onerror = function(){
      wrapper.appendChild(img);
      setTimeout(function(){
        if(recursionArr && Object.prototype.toString.call(recursionArr) === '[object Array]'){
          for(var i = 0; i < recursionArr.length; i++){
            alert(recursionArr[i]);
          }
          window.location.href = '/activity/tt/result/';
        }
      }, 600);
    }
  }

  //resut page
  var shareToWx = document.querySelectorAll('a.sharetowx-btn');
  if(shareToWx.length){
    for(var j = 0; j < shareToWx.length; j ++){
      shareToWx[j].addEventListener('click', function () {
        document.querySelector('div.share-to-wx').style.display = 'block';
      }, false)
    }

    document.querySelector('div.share-to-wx').addEventListener('click', function(){
      this.style.display = 'none';
    }, false)
  }
})();