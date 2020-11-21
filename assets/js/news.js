$(function () {
    // let url = '';
    // $('.archive-tab').click(function (e) {
    //     e.preventDefault();
    //     $('.archive-tab').removeClass('archive-tab_active');
    //     $(this).addClass('archive-tab_active');
    //     let cat = $(this).attr('data-category');
    //     let url = '/blog/' + cat;
    //     // console.log(url);
    //     ajaxQuery(url)
    // });
    //
    // $(document).on('click', '.pagination__item a', function (e) {
    //     e.preventDefault();
    //     $('html,body').animate({
    //         scrollTop: $(".page-header").offset().top
    //     }, 'slow');
    //     $('.pagination__item').removeClass('active');
    //     $(this).parent('li').addClass('active');
    //     // var page = $(this).attr('href').split('page=')[1];
    //     // console.log(page);
    //     let url = $(this).attr('href');
    //     // console.log(url);
    //     ajaxQuery(url);
    // })
})

function ajaxQuery(url) {
    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //     }
    // });
    // $('.tab-content').fadeOut("fast");
    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        success: function (response) {
            history.pushState('', '', url);
            // console.log(response);
            $('.tab-content').html(response['news']);
            $('.archive-list__pagination').html(response['pagination']);
            $(document).prop('title', response['seo']['seo_title']);
            $("meta[name='description']").attr('content', response['seo']['seo_description']);

            //from intersectionObserver.js
            lazyLoadImage();
        },
    });
}
