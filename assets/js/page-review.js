$(function() {

	showHideBtn();
});

// const showHideBtn = () => {
// 	let block = $('.js-rcard-msg');
// 	let btn = $('.js-rcard-btn');
// 	let height = $('.js-rcard-msg').innerHeight;
	
// 	block.addClass('_hide');
// 	btn.on('click', function(){
		
		
// 		if(block.hasClass('_hide')){
// 			block.removeClass('_hide').addClass('_show');
// 			block.css('height', height+'px');
// 		} else {
// 			block.removeClass('_show').addClass('_hide');
// 		}
// 	});

// }

const showHideBtn = () => {
	// $('.r-card__message-inner').each(function(item, r){
	// 	let block = $(this);
	// 	let blockHeight = Math.floor(block.innerHeight());
	// 	console.log(blockHeight);
		
	// 	block.css('height', '200px');
	
	// 	$('.js-rcard-btn').on('click', function(){
	// 		let _thisCard = $(this).parent().parent().parent();
	// 		let block = $(this).prev();
	// 		console.log(blockHeight);
			
	// 		if(block.hasClass('_hide')){
	// 			block.removeClass('_hide').addClass('_show');
	// 			block.css('height', blockHeight+'px');
	// 			$(this).html('Свернуть');
	
	// 			$([document.documentElement, document.body]).animate({
	// 				scrollTop: $(_thisCard).offset().top - 100
	// 			}, 600);
	
	// 		} else {
	// 			block.removeClass('_show').addClass('_hide');
	// 			block.css('height', '200px');
	// 			$(this).html('Читать полностью');
	// 		}
	// 	});
	// })

	$('.r-card__message-inner').each(function(i, item){
		let _this = $(this);
		let btn = _this.parent().find('.js-rcard-btn');
		let height = Math.floor(_this.innerHeight())

		
		if(_this.innerHeight() < 200){
			_this.parent().find('.js-rcard-btn').remove();
			_this.removeClass('_hide').addClass('_show');
		}
		_this.css('height', '200px');

		function toggle(){
			
			if(_this.hasClass('_hide')){
				_this.removeClass('_hide').addClass('_show');
				_this.css('height', height+'px');
				$(this).html('Свернуть');
	
				$([document.documentElement, document.body]).animate({
					scrollTop: $(_this).parent().offset().top - 100
				}, 600);
	
			} else {
				_this.removeClass('_show').addClass('_hide');
				_this.css('height', '200px');
				$(this).html('Читать полностью');
			}
		}
		
		btn.on('click', toggle);
	})

}