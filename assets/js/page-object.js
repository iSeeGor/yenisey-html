$(function() {

	objectSlider();
	metaIconsToggle();
	objectTabs();
	objectVideo();
	googleMap();
	
});

const objectSlider = () => {

    let mainSliderSelector = ".image-slider__main",
        navSliderSelector = ".image-slider__thumb";

    let mainSliderOptions = {
        loop: true,
		speed: 600,
		spaceBetween: 40,
        loopAdditionalSlides: 100,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".js-is-swiper-next",
            prevEl: ".js-is-swiper-prev"
        },

        lazy: {
            loadPrevNext: true,
        },

	};
	
    let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions); // Navigation Slider

    let navSliderOptions = {
        loop: true,
        loopAdditionalSlides: 100,
        speed: 600,
        spaceBetween: 16,
        slidesPerView: 2,
        centeredSlides: false,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        direction: "horizontal",
        watchSlidesVisibility: true,

        lazy: {
            loadPrevNext: false,
        },

        breakpoints: {
            420: {
                slidesPerView: 3,
                spaceBetween: 16,
                centeredSlides: true,
            },
            767: {
                slidesPerView: 4,
                spaceBetween: 16,
                centeredSlides: false,
            },
            991: {
                spaceBetween: 30,
                slidesPerView: 5,
                centeredSlides: true,
            }
        },

	};
	
    let navSlider = new Swiper(navSliderSelector, navSliderOptions); // Matching sliders

    if (document.querySelector(".image-slider__main")) {
        mainSlider.controller.control = navSlider;
        navSlider.controller.control = mainSlider;
    }
}; 

const metaIconsToggle = () => {
    // Meta Favorits
    let metaFavorit = document.querySelector(".meta-favorits");
    let metaFavoritIcon = document.querySelector(".to-favorits__icon");
    let tooltipFavorit = document.querySelector(".meta-favorits__tooltip");

    if (metaFavorit) {
        metaFavorit.addEventListener("click", function() {
            if (
                metaFavoritIcon.classList.contains("to-favorits__icon_active")
            ) {
                metaFavoritIcon.classList.remove("to-favorits__icon_active");
                tooltipFavorit.innerHTML =
                    tooltipFavorit.dataset.tooltipDelMassege;
            } else {
                metaFavoritIcon.classList.add("to-favorits__icon_active");
                tooltipFavorit.innerHTML =
                    tooltipFavorit.dataset.tooltipAddMassege;
            }
        });
    }
}; 

const objectTabs = () => {

	$(document).on('click', '.single-tabs__button', function(){
		let _this = $(this);
		let content = $('.single-tabs__content');

		_this.addClass('_current').siblings().removeClass('_current');
		content.eq(_this.index()).addClass('_current').siblings().removeClass('_current');
	})
}

const objectVideo = () => {
	let mainSlider = new Swiper(".js-ov-slider", {
		init: false,
		loop: false,
		speed: 600,
		slidesPerView: "auto",
		autoHeight: true,
		threshold: 10,
		// grabCursor: true,
		spaceBetween: 30,
		// allowTouchMove: false,

		navigation: {
			nextEl: ".js-ov-swiper-next",
			prevEl: ".js-ov-swiper-prev"
		}
	});

	$('.js-ot-video').on('click', function(){
		
		setTimeout(() => {
			mainSlider.init();
		}, 100);
		
	});

	$('.js-ov-play').on('click', function(){

		$(this).parent().find('._image').fadeOut( 500 );
		$(this).fadeOut( 500 );
		let iframe = $(this).parent().find('._iframe');
		let src = iframe.attr('data-src');
		iframe.attr('src', src)
		
	});

	function closure(){
		let poster = $('.swiper-slide-active ._image');
		let button = $('.swiper-slide-active .js-ov-play');
		let iframe = $('.swiper-slide-active ._iframe');
		
		return function(){
			poster.fadeIn( 500 );
			button.fadeIn( 500 );
			iframe.attr('src', '');
		}
	}

	mainSlider.on('slideChange', function(){
		let updateSlide = closure();
		setTimeout(updateSlide, 600);
	})

	$('.single-tabs__button').on('click', function(){
		let updateSlide = closure();
		setTimeout(updateSlide, 600);
	});

}

const googleMap = () => {
    let coor =
        typeof coordinates !== "undefined"
            ? coordinates
			: { lat: 36.544452, lng: 31.995427 };

	$('.js-ot-gmap').on('click', function(){
		initMap();
	});
	
	function initMap() {
        let popupContent = '<p class="marker_content">Address</p>',
            image = {
                url: "assets/images/icons/map_marker.svg" // size: new google.maps.Size(126, 40),
            },
            coordinates = coor,
            map = new google.maps.Map(document.querySelector(".map-holder"), {
                center: coordinates,
                zoom: 15,
                // disableDefaultUI: true,
                styles: [
                    {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    },
                    {
                        featureType: "transit",
                        elementType: "labels.text",
                        stylers: [
                            {
                                visibility: "off"
                            }
                        ]
                    }
                ]
            }),
            marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: image,
                animation: google.maps.Animation.DROP
            }),
            infowindow = new google.maps.InfoWindow({
                content: popupContent
            });
        marker.addListener("click", function() {
            infowindow.open(map, marker);
        });
    }

}; 