window.onload = function(){
	
	
	var screenW = document.body.offsetWidth;
	console.log(screenW)
	
	var nav = document.getElementById('nav');
	var points = [];
	
	nav.addEventListener('touchstart',function(e){
		
		var x = e.touches[0].clientX;
		points.push(x);
		
	},false);
	nav.addEventListener('touchmove',function(e){
		var x = e.touches[0].clientX;
		points.push(x);
		if(points.length > 3){
			var x1 = points.pop();
			var x2 = points.pop();
			var dx = x1 - x2;
			
			nav.style.left = nav.offsetLeft + dx + 'px';
			nav.style.left = nav.offsetLeft < -800 + screenW ? -800 + screenW+'px' : nav.offsetLeft+'px';
			nav.style.left = nav.offsetLeft > 0? '0px': nav.offsetLeft+'px';
		}
	},false);
	
	nav.addEventListener('touchend',function(){
		points = [];
	},false)
	
	
	
	
	$("#show_sidebar").click(function(){
		$("#side-bar").animate({'left':'0px'},500)
	});
	
	$("#side-bar").click(function(){
		$(this).animate({'left':'-250px'},500)
	})
	
	
	
}


