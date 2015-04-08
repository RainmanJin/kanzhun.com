var myScroll;
(function(){

	//iscroll
	if(document.querySelector('section.menu')){
		myScroll= new IScroll('#companyMenu', {
			scrollX: true, 
			scrollY: false,
			mouseWheel: false,
			preventDefault: false
		});

		document.querySelector('.menu i.arrow_green').addEventListener('click', function(e){
			e.preventDefault();
			myScroll.scrollTo( myScroll.x - 50 ,0, 600, IScroll.utils.ease.quadratic);
		}, false);
	}

	//page index
	if(document.querySelector('section.channel')){
		document.querySelector('section.channel').addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			var target = e.target;
			if(target.nodeName === 'A'){
				var form = document.querySelector('#searchForm');
				form.setAttribute('action', target.getAttribute('href'));
				form.querySelector('input[type=text]').setAttribute('placeholder', target.getAttribute('data-pd'));
				
				target.parentNode.querySelector('a.current').classList.remove('current');
				target.classList.add('current');
			}
		}, false);
	}


	window.getJSON = function(o){
		var codeXHR = new XMLHttpRequest();
		codeXHR.onreadystatechange = function(){
			if(this.readyState === 4 && this.status === 200 ){
				var data = JSON.parse(this.responseText);

				if(o.success){
					o.success.call(this, data);
				}

				if(o.error){
					o.error.call(this, this.responseText);
				}
			}
		};
		codeXHR.open('GET', o.url, true);
		codeXHR.send();
	}
	


	//choose city
	if(document.querySelector('#filterCities')){
		document.querySelector('#filterCities').addEventListener('click', function(e){
			e.stopPropagation();

			var target = e.target;
			if(target.nodeName === 'SPAN'){
				target.parentNode.querySelector('span.current').classList.remove('current');
				target.classList.add('current');

				getJSON({
					url: '/xxx.json?city='+ $(this).html().toLowerCase(),
					success: function(ret){
						if(ret){
							var html = [];
							ret.forEach(function(v){
								html.push('<a href="'+ v.url +'">'+ v.name +'</a>');
							});
							document.querySelector('#citiesSort').innterHTML = html.join('');
						}
					},
					error: function(err){
						if(err){
							document.querySelector('#citiesSort').innterHTML = err;
						}
					}
				});
			}			
		}, false);
	}

	//加载更多
	// document.querySelector('.more_details').addEventListener('click', function(e){
	// 	getJSON({
	// 		url: '',
	// 		success: function(ret){

	// 		},

	// 		error: function(err){

	// 		}
	// 	});
	// } ,false);
})();












