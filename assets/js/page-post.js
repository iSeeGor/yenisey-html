$(function() {

	futuredSlider();
});


const futuredSlider = () => {

	let slider = new Swiper(".js-yf-news", {
		loop: false,
		speed: 1000,
		slidesPerView: 1,
		threshold: 10,
		// grabCursor: true,
		spaceBetween: 30,
		// allowTouchMove: false,

		navigation: {
			nextEl: ".js-yc-swiper-next",
			prevEl: ".js-yc-swiper-prev"
		},

		pagination: {
			el: '.js-yn-swiper-pag',
			type: 'bullets',
			clickable: true,
		},

		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 30
			},
			// when window width is >= 480px
			767: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		}
	});

}

