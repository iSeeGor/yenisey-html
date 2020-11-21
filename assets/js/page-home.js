$(function() {

	heroVideoBg();
	complexeSlider();
	videoSlider();
	newsSlider();
	niceSelect();
	filter();
	seoTextToggle();
	
});

const heroVideoBg = () => {

	if(!mobileAndTabletcheck()){
		let video = document.querySelector('.hero__video-bg');
		let deco = document.querySelector('.hero__deco');
		let tmp = `
			<picture>
				<source type="image/webp" srcset="assets/images/theme/home/hero-deco.webp">
				<img srcset="assets/images/theme/home/hero-deco.png" alt="hero deco bg">
			</picture>
		`
		
		video.firstElementChild.src = video.firstElementChild.dataset.src;
		video.poster = video.dataset.poster;
		video.load();

		deco.innerHTML = tmp;

	} else {
		let video = document.querySelector('.hero__video-bg');
		let images = document.querySelector('.hero__image-bg');
		
		
		let tmp = `
			<picture>
				<source  media="(orientation: portrait)" srcset="assets/images/theme/home/yr-hero-540wh.jpg">
				<source  media="(max-width:768px) and (orientation: landscape)" srcset="assets/images/theme/home/yr-hero-768w.jpg">
				<source  media="(max-width:1024px)" srcset="assets/images/theme/home/yr-hero-1024w.jpg">
				<source  media="(max-width:1200px)" srcset="assets/images/theme/home/yr-hero-1200w.jpg">
				<img srcset="assets/images/theme/home/yr-hero-1920w.jpg" alt="">	
			</picture>
			
		`
		video.remove();
		images.innerHTML = tmp;
	}

}


const complexeSlider = () => {
	let slideSpeed = 1000;

	let mainSlider = new Swiper(".js-complexes-slider", {
		loop: false,
		speed: slideSpeed,
		slidesPerView: "auto",
		// autoHeight: true,
		threshold: 10,
		// grabCursor: true,
		spaceBetween: 200,
		allowTouchMove: false,

		navigation: {
			nextEl: ".js-yc-swiper-next",
			prevEl: ".js-yc-swiper-prev"
		}
	});
	
	const coutnSlides = function coutnSlides(){
		$('.swiper-slide-counter__current').html(mainSlider.realIndex + 1);
		$('.swiper-slide-counter__total').html(mainSlider.slides.length);
	};
	coutnSlides();

	mainSlider.on('slideChange', setInterval(() => {
		coutnSlides();
	}, slideSpeed))

	let mediaSliders  = document.querySelectorAll('.js-complex-media');

	for(let i = 0; i < mediaSliders.length; i++){
		
		let nextBtn = mediaSliders[i].parentNode.querySelector('.js-y-media-next');
		let prevBtn = mediaSliders[i].parentNode.querySelector('.js-y-media-prev');
		let pag = mediaSliders[i].parentNode.querySelector('.js-media-pag');

		new Swiper(mediaSliders[i], {
			// loop: true,
			speed: slideSpeed,
			slidesPerView: "auto",
			autoHeight: true,
			threshold: 10,
			grabCursor: true,
			spaceBetween: 40,
			// allowTouchMove: false,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},

			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn
			},
			
			pagination: {
				el: pag,
				type: 'bullets',
			},
		});

	}

};

const videoSlider = () => {

	let mainSlider = new Swiper(".js-y-video-slider", {
		loop: false,
		speed: 1000,
		slidesPerView: "auto",
		autoHeight: true,
		threshold: 10,
		// grabCursor: true,
		spaceBetween: 110,
		// allowTouchMove: false,

		navigation: {
			nextEl: ".js-yv-swiper-next",
			prevEl: ".js-yv-swiper-prev"
		}
	});

	$('.js-y-video-play').on('click', function(){

		$(this).parent().find('.y-video__poster').fadeOut( 500 );
		$(this).fadeOut( 500 );
		let iframe = $(this).parent().find('iframe')
		let src = iframe.attr('data-src');
		iframe.attr('src', src)
		
	});

	function closure(){
		let poster = $('.swiper-slide-active .y-video__poster');
		let button = $('.swiper-slide-active .js-y-video-play');
		let iframe = $('.swiper-slide-active iframe');
		
		return function(){
			poster.fadeIn( 500 );
			button.fadeIn( 500 );
			iframe.attr('src', '');
		}
	}

	mainSlider.on('slideChange', function(){
		let updateSlide = closure();
		setTimeout(updateSlide, 1000);
	})

};

const newsSlider = () => {
	let newsSlider = new Swiper(".js-y-news-slider", {
		loop: false,
		speed: 1000,
		slidesPerView: 1,
		threshold: 10,
		spaceBetween: 30,

		navigation: {
			nextEl: ".js-yn-swiper-next",
			prevEl: ".js-yn-swiper-prev"
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

const niceSelect = () => {
	$("select").niceSelect();
};

const filter = () => {

	selectTransparancy();
	showMoreOptions();
	
	document.querySelectorAll(".choice-form__input").forEach(item => {
		IMask(item, {
			mask: "€ num",
			blocks: {
				num: {
					// nested masks are available!
					mask: Number,
					thousandsSeparator: " "
				}
			}
		});
	});

	function selectTransparancy(){

		$(".choice-form").ready(function(){
			$(".nice-select.select").addClass('_opacity');
		});

		$(".choice-form").on('DOMSubtreeModified', ".nice-select.select", function() {
			$(this).removeClass('_opacity');
		});
	}

	function showMoreOptions(){
		let btn = $('.button._more');
		
		btn.on('click', function(e){
			e.preventDefault();
			$(this).toggleClass('_open')
			
			if($(this).hasClass('_open')){

				$('.choice-tags').removeClass('_closed');
			} else {
				$('.choice-tags').addClass('_closed');
			}
		})	

	}

	$('.choice-tags__checkbox').on('change', function() {
		$('.choice-tags__checkbox').not(this).prop('checked', false);
		
		if($(this).prop('checked')){
			$(this).parent().addClass('_selected').siblings().removeClass('_selected');
		} else {
			$(this).parent().removeClass('_selected')
		}
	});

};

const seoTextToggle = () => {
	let block = $('.property__text-blocks');
	let blockHeight = Math.floor(block.innerHeight());
	
	let height = function(){
		if(window.innerWidth > 1200){
			return '40vh'
		} else {
			return '100px'
		}
	};

	block.css('height', height);

	$('.seo-text__toggle').on('click', function(){
		if(block.hasClass('_hide')){
			block.removeClass('_hide').addClass('_show');
			block.css('height', blockHeight+'px');
			$(this).html('Свернуть');
			console.log(1);
		} else {
			block.removeClass('_show').addClass('_hide');
			block.css('height', height);
			$(this).html('Развернуть');
			console.log(2);
		}
	});

}