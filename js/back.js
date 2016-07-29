/**
 *返回顶部 
 */
//$(function() {
//	$(window).scroll(function() {
//		if($(this).scrollTop() != 0) {
//			$('#back2top').fadeIn();
//		} else {
//			$('#back2top').fadeOut();
//		}
//	});
//	 
//	$('#back2top').click(function() {
//		$('body,html').animate({scrollTop:0},500);
//	});
//});


var Back = (function($){
	
	
	var Back = function(id){
		$(window).scroll(function() {
			if($(this).scrollTop() != 0) {
				$(id).fadeIn();
			} else {
				$(id).fadeOut();
			}
		});
		 
		$(id).click(function() {
			$('body,html').animate({scrollTop:0},500);
		});
	}
	
	return Back;
	
})(jQuery)
