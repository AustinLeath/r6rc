var img = $('img[id^="image-"]').hide(),
  a = 0;

(function cycle() {

			 img.eq(a).fadeIn(900)
							  .delay(8000)
			  				.fadeOut(900, cycle);

		a = ++i % img.length;

})();
