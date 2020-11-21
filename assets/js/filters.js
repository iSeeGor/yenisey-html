$(function () {
    var filter = [];
    // $('.choice-form__item').on('change', '.select', function () {
    //     filters();
    // });

    $('.order-by__select').change(function () {
        let url = document.location.pathname;
        if (url.split('/')[3] === 'complex' || url.split('/')[1] === 'catalog_custom') {
            url = orderByField();
            ajaxQuery(url);
        }
        else {
            filters();
        }
    });

    $('.choice-form').submit(function (e) {
        e.preventDefault();
        filters();
    });

    $(document).on('click', '.pagination__item a', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $(".content-title").offset().top
        }, 'slow');
        $('.pagination__item').removeClass('active');
        $(this).parent('li').addClass('active');
        var page = $(this).attr('href').split('page=')[1];
        if(page == undefined) page=1;
        let url = document.location.pathname;
        url = priceFromField(url);
        url = priceToField(url);
        url = orderByField(url);
        url = idField(url);
        url = residentialComplex(url);
        url = catalog(url);

        if(page != 1) url = urlGetParameter(url, 'page', page);
        console.log(url);

        ajaxQuery(url);
    });


    $(window).on('popstate', function (event) {
        event.preventDefault();
        document.location.href = window.location.href;
        // $.ajax({
        //     type: 'GET',
        //     url: window.location.href,
        //     cache: false,
        //     success: function (response) {
        //         successQuery(response);
        //     },
        // })
    });


    $(".search-form__button").click(function() {
        $('html,body').animate({
            scrollTop: $("#filter-scroll-to").offset().top},
            'slow');
    });

});

function filters() {
    let url = '/' + document.location.pathname.split('/')[1];

    if(url === '/catalog_custom' || url === '/catalog_complex_apartments'){
        url = document.location.pathname;
    }

    $('.objects-list').fadeOut('fast');

    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //     }
    // });
    var filterData = $(".choice-form .select:not([name='complex'])").serializeArray();
    let filter = $(".choice-form .select").serializeArray();

    filterData.forEach(function (item) {
        var param = findUrlParameterValue(filter);

        if (item['value'] != 'all') {
            url += '/' + item['value'];
        }
        else if (param) {
            url += '/all';
        }
    });
    $(".choice-form .select").serializeArray()
    url = priceFromField(url);
    url = priceToField(url);
    url = orderByField(url);
    url = residentialComplex(url);
    url = catalog(url);

    if(url.split('/')[1] === 'catalog_custom' || url.split('/')[1] == 'catalog_complex_apartments' || url.split('/')[1] === '' || url.split('/')[1].charAt() === "?"){
        let newUrl = url.split('/');
        newUrl[1] = 'catalog';
        if(url.split('/')[1] != ''){
            newUrl.splice(2, 1);
        }
        newUrl = newUrl.join('/');
        newUrl = priceFromField(newUrl);
        newUrl = priceToField(newUrl);
        newUrl = residentialComplex(newUrl);
        history.pushState('', '', newUrl);
        document.location.replace(newUrl);
    }

    ajaxQuery(url);
}

function urlGetParameter(url, param, value) {
    if (url.split('?').length <= 1) {
        return url + '?' + param + '=' + value;
    }
    return url + '&' + param + '=' + value;
}


function findUrlParameterValue(filter) {

    filter.shift();

    return filter.find(function (element) {
        return element['value'] != 'all';
    });
}

function orderByField(url = window.location.pathname) {
    let orderBy = $('.order-by__select').val();
    if (orderBy != '' && orderBy != undefined) {
        return urlGetParameter(url, 'order_by', orderBy);
    }
    return url;
}

function priceFromField(url = window.location.pathname){
    var price_from = $('.choice-form input[name="price_from"]').val();
    if (price_from != undefined && price_from != '') {
        return urlGetParameter(url, 'price_from', parseInt(price_from.replace('€', '').replace(/\s/g, '')));
    }
    return url;
}

function priceToField(url = window.location.pathname){
    var price_to = $('.choice-form input[name="price_to"]').val();
    if (price_to != undefined && price_to != '') {
        return urlGetParameter(url, 'price_to', parseInt(price_to.replace('€', '').replace(/\s/g, '')));
    }
    return url;
}

function idField(url = window.location.pathname){
    var id = $('.choice-form input[name="id"]').val();
    if (id != undefined && id != '') {
        return urlGetParameter(url, 'id', id);
    }
    return url;
}

function residentialComplex(url = window.location.pathname){
    let complex = $(".choice-form .select[name='complex']").val();
    if (complex !== undefined && complex !== 'all') {
        return urlGetParameter(url, 'residential_complex', complex);
    }
    return url;
}

function catalog(url = window.location.pathname){
    let catalog = $(".choice-tags__item._selected input").val();
    if (catalog !== undefined && catalog !== '') {
        return urlGetParameter(url, 'catalog', catalog);
    }
    return url;
}


function ajaxQuery(url) {
    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        success: function (response) {
            if(response.url){
                history.pushState('', '', response.url);
            }
            else {
                history.pushState('', '', url);
            }
            successQuery(response);
            gtag('config', 'UA-100134173-1', {'page_path': url});
            ym(56091337, 'hit', url);
        },
    })
}

function successQuery(response) {
    $('.js-article-t').empty().html(response['seo']['seo_text']);
    $(document).prop('title', response['seo']['seo_title']);
    $("meta[name='description']").attr('content', response['seo']['seo_description']);
    $('.y-property-grid__content').html(response['objects']).fadeIn("fast");
    $('.product-list__pagination').html(response['pagination']);
    $('.search-result__count').html(response['count']);
    $('.content-title').html(response['seo']['seo_page_title'] ? response['seo']['seo_page_title'] : response['title']);
    let typeFilter = $('.choice-form__select_type').val();
    $('.breadcrumb__item_active').html(typeBreadcrumbs(typeFilter));



    //from intersectionObserver.js
    lazyLoadImage();

    seoTextToggle();

    iframeFix();
    cardFavorits();
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }

function typeBreadcrumbs($name){
    switch ($name) {
        case 'apartment':
            return 'Квартиры';
            break;
        case 'penthouse':
            return 'Пентхаусы';
            break;
        case 'commercial':
            return 'Коммерческая недвижимость';
            break;

        default:
            return 'Все объекты';
            break;
    }
}
