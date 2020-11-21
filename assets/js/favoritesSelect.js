$(function(){
    $('.order-by__select').change(function(){
        let val = $(this).val();
        $('.favorites-form').attr('action', window.location.pathname+'?order_by='+val).submit();
    })
})