$(function () {
    favorites();
})

function favorites() {
    $(document).on('click', '.to-favorits__icon', function (e) {
        e.preventDefault();

        let cookie = Cookies.getJSON('favorites');
        if (!cookie) {
            cookie = [];
        }

        let id = $(this).attr('data-id');
        let find = cookie.find(function (e) {
            return e === id;
        })
        console.log($(this));
        if (!find) {
            cookie.push(id);
            $(this).addClass('to-favorits__icon_active');
        } else {
            cookie = $.grep(cookie, function (value) {
                return value != id;
            });
            $(this).removeClass('to-favorits__icon_active');
        }

        cookie = $.grep(cookie, function (value) {
            return value != null;
        });

        $('.favorits-counter__num').html(cookie.length);
        if(cookie.length > 0){
            $('.header__favorits-count').html(cookie.length);
            $('.header__favorits').css('display','block');
        }
        else{
            $('.header__favorits').css('display','none');
        }

        Cookies.set('favorites', cookie, { expires: 365, path: '/' });
    })
}
