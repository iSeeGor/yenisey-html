$(function() {

	niceSelect();
	filter();
	seoTextToggle();

});

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

	let block = $('.js-article-t');
	block.css('height', 'auto');
	let blockHeight = Math.floor(block.innerHeight());

	if(block.children().length > 0){
		block.css('height', '40vh');
		$(".article__toggle").show();
	} else {
		block.css('height', '0px');
		$(".article__toggle").hide();
	}


	if(!block.hasClass('_hide')){
		block.removeClass('_show').addClass('_hide');
		$(this).html('Читать все');
	}

	$( ".article__toggle").unbind( "click" )
	$('.article__toggle').on('click', function(){
		if(block.hasClass('_hide')){
			block.removeClass('_hide').addClass('_show');
			block.css('height', blockHeight+'px');
			$(this).html('Свернуть');

			$([document.documentElement, document.body]).animate({
				scrollTop: $(".article__content").offset().top - 100
			}, 1000);

		} else {
			block.removeClass('_show').addClass('_hide');
			block.css('height', '40vh');
			$(this).html('Читать все');
		}
	});
}
