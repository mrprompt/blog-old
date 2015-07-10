jQuery(document).ready(function($){
	/* ------------------ Back To Top ------------------- */
	jQuery('#footer-menu-back-to-top a').click(function(){
		jQuery('html, body').animate({scrollTop:0}, 300); 
		return false; 
	});
});