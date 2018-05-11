var h5 = $('h5[id^="cycletxt-"]').hide(),
 i = 0;

(function cycletxt() {

			 h5.eq(i).fadeIn(1500)
							  .delay(6500)
			  				.fadeOut(1500, cycletxt);

		 i = ++i % h5.length;

})();
